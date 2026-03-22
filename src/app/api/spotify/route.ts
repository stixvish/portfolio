const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';

let cachedToken: string | null = null;
let tokenExpiresAt = 0;

async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExpiresAt) {
    return cachedToken;
  }

  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env;

  const res = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: SPOTIFY_REFRESH_TOKEN!,
    }),
  });

  const data = await res.json();
  cachedToken = data.access_token;
  tokenExpiresAt = Date.now() + (data.expires_in - 60) * 1000; // refresh 60s early
  return cachedToken!;
}

export async function GET() {
  try {
    const accessToken = await getAccessToken();

    const res = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: { Authorization: `Bearer ${accessToken}` },
      signal: AbortSignal.timeout(3000),
    });

    if (res.status === 204 || res.status >= 400) {
      return Response.json({ playing: false });
    }

    const data = await res.json();

    if (!data.is_playing || data.currently_playing_type !== 'track') {
      return Response.json({ playing: false });
    }

    return Response.json({
      playing: true,
      track: data.item.name,
      artist: data.item.artists.map((a: { name: string }) => a.name).join(', '),
      albumArt: data.item.album.images[2]?.url ?? data.item.album.images[0]?.url,
      url: data.item.external_urls.spotify,
    });
  } catch {
    return Response.json({ playing: false });
  }
}
