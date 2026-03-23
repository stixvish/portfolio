const VANITY_URL = 'stixvish';

let cachedSteamId: string | null = null;

async function getSteamId(apiKey: string): Promise<string> {
  if (cachedSteamId) return cachedSteamId;

  const res = await fetch(
    `https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=${apiKey}&vanityurl=${VANITY_URL}`,
    { signal: AbortSignal.timeout(5000) }
  );

  const data = await res.json();
  cachedSteamId = data.response.steamid;
  return cachedSteamId!;
}

export async function GET() {
  try {
    const apiKey = process.env.STEAM_API_KEY;
    if (!apiKey) return Response.json({ found: false });

    const steamId = await getSteamId(apiKey);

    const res = await fetch(
      `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${apiKey}&steamid=${steamId}&include_appinfo=1&include_played_free_games=1`,
      { next: { revalidate: 300 }, signal: AbortSignal.timeout(5000) }
    );

    const data = await res.json();
    const games: { appid: number; name: string; img_icon_url: string; rtime_last_played: number }[] =
      data.response?.games ?? [];

    if (!games.length) return Response.json({ found: false });

    const last = games.sort((a, b) => b.rtime_last_played - a.rtime_last_played)[0];
    const icon = `https://media.steampowered.com/steamcommunity/public/images/apps/${last.appid}/${last.img_icon_url}.jpg`;
    const url = `https://store.steampowered.com/app/${last.appid}`;

    return Response.json({ found: true, name: last.name, icon, url });
  } catch {
    return Response.json({ found: false });
  }
}
