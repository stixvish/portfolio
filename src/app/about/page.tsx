import Image from 'next/image';
import Integrations from '@/components/Integrations';

const socials = [
  { label: 'github', href: 'https://github.com/stixvish' },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/vishgupta404/' },
  { label: 'letterboxd', href: 'https://letterboxd.com/stixvish/' },
  { label: 'steam', href: 'https://steamcommunity.com/id/stixvish/' },
  { label: 'chess.com', href: 'https://www.chess.com/member/stixvish' },
  { label: 'beli', href: 'https://beliapp.co/app/stixvish' },
  { label: 'spotify', href: 'https://open.spotify.com/user/vishstix720' },
  { label: 'email', href: 'mailto:gupta.v.vishesh@gmail.com' },
];

export default function About() {
  return (
    <main className="min-h-dvh overflow-x-hidden pt-[calc(clamp(3rem,7.5vh,4rem)+2.5vh+1.5rem)] lg:pt-[calc(clamp(3rem,10vh,5rem)+2.5vh+1.5rem)] pl-[7vw] pr-[7vw] md:pl-[5vw] md:pr-[5vw] lg:pl-[2vw] lg:pr-[2vw] pb-6 lg:pb-10 flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-16">

      {/* Photo */}
      <div className="shrink-0 lg:w-[45%] relative h-48 lg:h-[calc(100dvh-clamp(3rem,10vh,5rem)-2.5vh-4rem)] lg:sticky lg:top-[calc(clamp(3rem,10vh,5rem)+2.5vh+1.5rem)] rounded-2xl overflow-hidden">
        <Image
          src="/gallery/recess.jpeg"
          alt="Vishesh Gupta"
          fill
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-cover"
          priority
        />
      </div>

      {/* Notes */}
      <div className="flex flex-col flex-1 gap-6 lg:gap-8 pb-1">

        {/* Top: name + location */}
        <div>
          <p className="text-accent text-sm lg:text-base uppercase tracking-widest mb-1">Chicago, IL</p>
          <h1 className="text-[12vw] lg:text-[5.5vw] font-bold leading-none tracking-tight">
            vishesh gupta<span className="text-accent">.</span>
          </h1>
          <p className="text-base lg:text-lg text-neutral-500 dark:text-neutral-400 mt-1">computer science student &middot; software engineer</p>
        </div>

        {/* Interests */}
        <div className="flex flex-col gap-1">
          <p className="text-accent text-[1.75rem]">what i&apos;m into</p>
          <p className="text-2xl lg:text-3xl font-bold">data<span className="text-accent">.</span></p>
          <p className="text-2xl lg:text-3xl font-bold">basketball<span className="text-accent">.</span></p>
          <p className="text-2xl lg:text-3xl font-bold">jack &amp; cokes<span className="text-accent">.</span></p>
          <p className="text-2xl lg:text-3xl font-bold">chess<span className="text-accent">.</span></p>
          <p className="text-2xl lg:text-3xl font-bold">emotional oranges<span className="text-accent">.</span></p>
        </div>

        {/* Integrations */}
        <Integrations />

        {/* Bottom: open to + socials */}
        <div className="flex flex-col gap-3">
          <div>
            <p className="text-accent text-[1.75rem]">open to</p>
            <p className="text-lg lg:text-xl font-bold">software engineering roles<span className="text-accent">.</span></p>
          </div>
          <div>
            <p className="text-accent text-[1.75rem]">find me</p>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {socials.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg lg:text-xl font-bold text-neutral-500 dark:text-neutral-400 hover:text-accent transition-colors duration-200"
                >
                  {label}<span className="text-accent">.</span>
                </a>
              ))}
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
