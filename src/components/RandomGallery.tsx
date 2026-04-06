import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';
import path from 'path';
import Image from 'next/image';

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

const PUBLIC_URL = 'https://images.stixvish.com';

export default async function RandomGallery() {
  const BUCKET = 'portfolio-gallery';
  const supported = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);
  const excluded = new Set(['recess.jpeg']);

  const res = await r2.send(new ListObjectsV2Command({ Bucket: BUCKET }));
  const files = (res.Contents ?? [])
    .map((obj) => obj.Key!)
    .filter((key) => supported.has(path.extname(key).toLowerCase()) && !excluded.has(key));

  const picked = pickRandom(files, 3);

  return (
    <div className="fixed inset-0 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 opacity-50 select-none">
      {picked.map((file, i) => (
        <div
          key={file}
          className={`relative ${i === 1 ? 'hidden md:block' : ''} ${i === 2 ? 'hidden lg:block' : ''}`}
        >
          <Image
            src={`${PUBLIC_URL}/${file}`}
            alt=""
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
            className="object-cover"
            draggable={false}
            loading="eager"
          />
        </div>
      ))}
    </div>
  );
}
