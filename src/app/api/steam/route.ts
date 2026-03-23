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

    const [ownedRes, summaryRes] = await Promise.all([
      fetch(
        `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${apiKey}&steamid=${steamId}&include_appinfo=1&include_played_free_games=1`,
        { next: { revalidate: 300 }, signal: AbortSignal.timeout(5000) }
      ),
      fetch(
        `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${apiKey}&steamids=${steamId}`,
        { next: { revalidate: 60 }, signal: AbortSignal.timeout(5000) }
      ),
    ]);

    const ownedData = await ownedRes.json();
    const summaryData = await summaryRes.json();

    const games: { appid: number; name: string; img_icon_url: string; rtime_last_played: number; playtime_forever: number }[] =
      ownedData.response?.games ?? [];

    const player = summaryData.response?.players?.[0];
    if (player?.gameid) {
      const appid = parseInt(player.gameid);
      const name: string = player.gameextrainfo;
      const gameInfo = games.find((g) => g.appid === appid);
      const icon = gameInfo
        ? `https://media.steampowered.com/steamcommunity/public/images/apps/${appid}/${gameInfo.img_icon_url}.jpg`
        : `https://cdn.cloudflare.steamstatic.com/steam/apps/${appid}/capsule_sm_120.jpg`;
      const url = `https://store.steampowered.com/app/${appid}`;
      const playtime = gameInfo ? Math.round(gameInfo.playtime_forever / 60) : undefined;
      return Response.json({ found: true, active: true, name, icon, url, playtime });
    }

    if (!games.length) return Response.json({ found: false });

    const last = games.sort((a, b) => b.rtime_last_played - a.rtime_last_played)[0];
    const icon = `https://media.steampowered.com/steamcommunity/public/images/apps/${last.appid}/${last.img_icon_url}.jpg`;
    const url = `https://store.steampowered.com/app/${last.appid}`;

    return Response.json({ found: true, active: false, name: last.name, icon, url });
  } catch {
    return Response.json({ found: false });
  }
}
