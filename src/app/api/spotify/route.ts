const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played?limit=1';

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

function trackPayload(track: { name: string; artists: { name: string }[]; album: { images: { url: string }[] }; external_urls: { spotify: string } }) {
  return {
    track: track.name,
    artist: track.artists.map((a) => a.name).join(', '),
    albumArt: track.album.images[2]?.url ?? track.album.images[0]?.url,
    url: track.external_urls.spotify,
  };
}

export async function GET() {
  try {
    const accessToken = await getAccessToken();

    const res = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: { Authorization: `Bearer ${accessToken}` },
      signal: AbortSignal.timeout(3000),
    });

    if (res.status !== 204 && res.status < 400) {
      const data = await res.json();
      if (data.is_playing && data.currently_playing_type === 'track') {
        return Response.json({ playing: true, ...trackPayload(data.item) });
      }
    }

    // Fall back to recently played
    const recentRes = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: { Authorization: `Bearer ${accessToken}` },
      signal: AbortSignal.timeout(3000),
    });

    if (recentRes.ok) {
      const recentData = await recentRes.json();
      const lastTrack = recentData.items?.[0]?.track;
      if (lastTrack) {
        return Response.json({ playing: false, lastPlayed: trackPayload(lastTrack) });
      }
    }

    return Response.json({ playing: false });
  } catch {
    return Response.json({ playing: false });
  }
}
