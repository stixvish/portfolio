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
    <main className="min-h-dvh [@media(min-width:1024px)_and_(min-height:600px)]:h-dvh [@media(min-width:1024px)_and_(min-height:600px)]:overflow-hidden pt-[calc(clamp(3rem,7.5vh,4rem)+2.5vh+1.5rem)] lg:pt-[calc(clamp(3rem,10vh,5rem)+2.5vh+1.5rem)] pl-[7vw] pr-[7vw] md:pl-[5vw] md:pr-[5vw] lg:pl-[2vw] lg:pr-[2vw] pb-6 lg:pb-10 flex flex-col lg:flex-row gap-6 lg:gap-16">

      {/* Photo */}
      <div className="shrink-0 lg:w-[45%] relative min-h-0 h-48 [@media(min-width:1024px)_and_(min-height:600px)]:h-full rounded-2xl overflow-hidden">
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
      <div className="flex flex-col justify-between flex-1 min-h-0 pb-1">

        {/* Top: name + location */}
        <div>
          <p className="text-accent text-xs uppercase tracking-widest mb-1">Chicago, IL</p>
          <h1 className="text-[12vw] lg:text-[5.5vw] font-bold leading-none tracking-tight">
            vishesh gupta<span className="text-accent">.</span>
          </h1>
          <p className="text-sm lg:text-base text-neutral-500 dark:text-neutral-400 mt-1">computer science student &middot; software engineer</p>
        </div>

        {/* Middle: interests */}
        <div className="flex flex-col gap-1 mt-6 lg:mt-0">
          <p className="text-xs uppercase tracking-widest text-neutral-400 mb-2">what i&apos;m into</p>
          <p className="text-2xl lg:text-3xl font-bold">data<span className="text-accent">.</span></p>
          <p className="text-2xl lg:text-3xl font-bold">basketball<span className="text-accent">.</span></p>
          <p className="text-2xl lg:text-3xl font-bold">jack &amp; cokes<span className="text-accent">.</span></p>
          <p className="text-2xl lg:text-3xl font-bold">chess<span className="text-accent">.</span></p>
          <p className="text-2xl lg:text-3xl font-bold">emotional oranges<span className="text-accent">.</span></p>
        </div>

        {/* Middle: integrations */}
        <div className="mt-6 lg:mt-0">
          <Integrations />
        </div>

        {/* Bottom: open to + socials */}
        <div className="pt-4 flex flex-col gap-3">
          <div>
            <p className="text-xs uppercase tracking-widest text-neutral-400 mb-1">open to</p>
            <p className="text-lg lg:text-xl font-bold">software engineering roles<span className="text-accent">.</span></p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-neutral-400 mb-1">find me</p>
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
