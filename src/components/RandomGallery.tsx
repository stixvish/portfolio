import fs from "fs";
import path from "path";
import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";

function pickRandom<T>(arr: T[], n: number): T[] {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, n);
}

export default async function RandomGallery() {
  const galleryDir = path.join(process.cwd(), "public/gallery");
  const files = fs.readdirSync(galleryDir);
  const picked = pickRandom(files, 3);

  const images = await Promise.all(
    picked.map(async (file) => {
      const buffer = fs.readFileSync(path.join(galleryDir, file));
      const { base64 } = await getPlaiceholder(buffer);
      return { file, base64 };
    })
  );

  return (
    <div className="fixed inset-0 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 opacity-50">
      {images.map(({ file, base64 }, i) => (
        <div
          key={file}
          className={`relative ${i === 1 ? "hidden md:block" : ""} ${i === 2 ? "hidden lg:block" : ""}`}
        >
          <Image
            src={`/gallery/${file}`}
            alt=""
            fill
            className="object-cover"
            placeholder="blur"
            blurDataURL={base64}
          />
        </div>
      ))}
    </div>
  );
}
