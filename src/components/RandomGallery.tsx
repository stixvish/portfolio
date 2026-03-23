import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';
import path from 'path';
import Image from 'next/image';
import { getPlaiceholder } from 'plaiceholder';

const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

function pickRandom<T>(arr: T[], n: number): T[] {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, n);
}

export default async function RandomGallery() {
  const PUBLIC_URL = process.env.R2_PUBLIC_URL!;
  const BUCKET = process.env.R2_BUCKET_NAME!;
  const supported = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);
  const excluded = new Set(['recess.jpeg']);

  const res = await r2.send(new ListObjectsV2Command({ Bucket: BUCKET }));
  const files = (res.Contents ?? [])
    .map((obj) => obj.Key!)
    .filter((key) => supported.has(path.extname(key).toLowerCase()) && !excluded.has(key));

  const picked = pickRandom(files, 3);

  const images = await Promise.all(
    picked.map(async (file) => {
      const url = `${PUBLIC_URL}/${file}`;
      const buffer = await fetch(url).then((r) => r.arrayBuffer()).then((b) => Buffer.from(b));
      const { base64 } = await getPlaiceholder(buffer);
      return { file, url, base64 };
    })
  );

  return (
    <div className="fixed inset-0 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 opacity-50 select-none">
      {images.map(({ file, url, base64 }, i) => (
        <div
          key={file}
          className={`relative ${i === 1 ? 'hidden md:block' : ''} ${i === 2 ? 'hidden lg:block' : ''}`}
        >
          <Image
            src={url}
            alt=""
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
            className="object-cover"
            draggable={false}
            placeholder="blur"
            blurDataURL={base64}
          />
        </div>
      ))}
    </div>
  );
}
