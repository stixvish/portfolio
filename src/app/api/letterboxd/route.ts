const RSS_URL = 'https://letterboxd.com/stixvish/rss/';

function extractTag(xml: string, tag: string): string {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([^<]*)<\/${tag}>`));
  return match?.[1]?.trim() ?? '';
}

function extractCDATA(xml: string, tag: string): string {
  const match = xml.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`));
  return match?.[1]?.trim() ?? '';
}

export async function GET() {
  try {
    const res = await fetch(RSS_URL, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(5000),
    });

    const xml = await res.text();

    const itemMatch = xml.match(/<item>([\s\S]*?)<\/item>/);
    if (!itemMatch) return Response.json({ found: false });

    const item = itemMatch[1];

    const title = extractTag(item, 'letterboxd:filmTitle') || extractTag(item, 'title');
    const year = extractTag(item, 'letterboxd:filmYear');
    const ratingRaw = extractTag(item, 'letterboxd:memberRating');
    const rating = ratingRaw ? parseFloat(ratingRaw) : null;

    const description = extractCDATA(item, 'description');
    const posterMatch = description.match(/<img src="([^"]+)"/);
    const poster = posterMatch?.[1] ?? '';

    const linkMatch = item.match(/<link>([^<]+)<\/link>/);
    const url = linkMatch?.[1]?.trim() ?? '';

    return Response.json({ found: true, title, year, rating, poster, url });
  } catch {
    return Response.json({ found: false });
  }
}
