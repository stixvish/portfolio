'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type NowPlaying =
  | { playing: false }
  | { playing: true; track: string; artist: string; albumArt: string; url: string };

type LastWatched =
  | { found: false }
  | { found: true; title: string; year: string; rating: number | null; poster: string; url: string };

const links = [
  { href: '/about', label: 'about me' },
  { href: '/experience', label: 'experience' },
  { href: '/projects', label: 'projects' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [nowPlaying, setNowPlaying] = useState<NowPlaying>({ playing: false });
  const [lastWatched, setLastWatched] = useState<LastWatched>({ found: false });

  useEffect(() => {
    const fetchNowPlaying = () =>
      fetch('/api/spotify')
        .then((r) => r.json())
        .then(setNowPlaying)
        .catch(() => {});

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 30_000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetch('/api/letterboxd')
      .then((r) => r.json())
      .then(setLastWatched)
      .catch(() => {});
  }, []);

  return (
    <header>
      {/* dropdown nav */}
      <div
        className='fixed z-20 inset-0 flex flex-col-reverse lg:flex-row gap-5 lg:gap-0 bg-white transition-all duration-500 ease-in-out pl-[7vw] pr-[7vw] md:pl-[5vw] md:pr-[5vw] lg:pl-[2vw] lg:pr-[2vw] pb-[5vh]'
        style={{ clipPath: open ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)' }}
      >
        <div className='flex flex-col leading-none justify-end w-full lg:w-1/2 gap-5'>
          {nowPlaying.playing && (
            <div className='flex flex-col gap-2'>
              <span className='text-accent text-[1.5rem]'>listening to</span>
              <a
                href={nowPlaying.url}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-3 w-fit hover:opacity-50 transition-opacity'
              >
                <div className='relative shrink-0 flex items-center justify-center w-5 h-5'>
                  <span className='absolute inline-flex w-full h-full rounded-full bg-[#1DB954] opacity-50 animate-ping' />
                  <svg
                    viewBox='0 0 24 24'
                    width={20}
                    height={20}
                    fill='#1DB954'
                    className='relative'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z' />
                  </svg>
                </div>
                <Image src={nowPlaying.albumArt} alt='album art' width={48} height={48} className='rounded' />
                <div className='flex flex-col leading-tight'>
                  <span className='text-background font-medium'>{nowPlaying.track}</span>
                  <span className='text-background text-sm'>{nowPlaying.artist}</span>
                </div>
              </a>
            </div>
          )}
          {lastWatched.found && (
            <div className='flex flex-col gap-2'>
              <span className='text-accent text-[1.5rem]'>last watched</span>
              <a
                href={lastWatched.url}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-3 w-fit hover:opacity-50 transition-opacity'
              >
                {lastWatched.poster && (
                  <Image src={lastWatched.poster} alt={lastWatched.title} width={32} height={48} className='rounded object-cover' />
                )}
                <div className='flex flex-col leading-tight'>
                  <span className='text-background font-medium'>
                    {lastWatched.title}
                    {lastWatched.year && <span className='text-background font-normal'> ({lastWatched.year})</span>}
                  </span>
                  {lastWatched.rating && (
                    <span className='text-background text-sm'>{lastWatched.rating} / 5</span>
                  )}
                </div>
              </a>
            </div>
          )}
        </div>
        <nav className='flex flex-col justify-end w-full lg:w-1/2 flex-1 gap-3 lg:gap-5'>
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className='text-black tracking-tight leading-none text-[4rem] lg:text-[clamp(5rem,7vw,7rem)] font-bold hover:opacity-50 transition-opacity'
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    
      {/* main header idea */}
      <div className='fixed z-30 w-full h-[8vh] flex justify-between items-center pl-[7vw] pr-[7vw] md:pl-[5vw] md:pr-[5vw] lg:pl-[2vw] lg:pr-[2vw] top-[2vh]'>
        <Link
          href="/"
          className="font-bold transition-colors duration-500 leading-none text-[3rem] lg:text-[clamp(2rem,5.5vw,3rem)]"
          style={{ color: open ? 'var(--color-accent)' : 'white' }}
        >
          stix
        </Link>
        {/* menu toggle buttons */}
        <div className="relative h-full aspect-square shrink-0">
          {/* hamburger menu button */}
          <svg
            viewBox="0 0 10 10"
            width="100%"
            height="100%"
            className="cursor-pointer absolute inset-0"
            onClick={() => setOpen(true)}
            style={{ opacity: open ? 0 : 1, pointerEvents: open ? 'none' : 'auto', transition: 'opacity 300ms' }}
          >
            <circle cx="5" cy="5" r="4.5" fill="white" stroke={open ? 'var(--color-accent)' : 'transparent'} strokeWidth="0.1" style={{ transition: 'stroke 300ms' }} />
            <line x1="3.5" y1="4.2" x2="6.5" y2="4.2" stroke="black" strokeWidth="0.3" />
            <line x1="3.5" y1="5" x2="6.5" y2="5" stroke="black" strokeWidth="0.3" />
            <line x1="3.5" y1="5.8" x2="6.5" y2="5.8" stroke="black" strokeWidth="0.3" />
          </svg>
          {/* close menu button */}
          <svg
            viewBox="0 0 10 10"
            width="100%"
            height="100%"
            className="cursor-pointer absolute inset-0"
            onClick={() => setOpen(false)}
            style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none', transition: 'opacity 300ms' }}
          >
            <circle cx="5" cy="5" r="4.5" fill="white" stroke="var(--color-accent)" strokeWidth="0.1" />
            <line x1="4" y1="4" x2="6" y2="6" stroke="black" strokeWidth="0.5" />
            <line x1="4" y1="6" x2="6" y2="4" stroke="black" strokeWidth="0.5" />
          </svg>
        </div>
      </div>
    </header>
  );
}
