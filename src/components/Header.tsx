'use client';

import { useState } from 'react';
import Link from 'next/link';

const links = [
  { href: '/about', label: 'about me' },
  { href: '/experience', label: 'experience' },
  { href: '/projects', label: 'projects' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <div className='fixed z-10 w-full h-[5.5vh] flex justify-between items-center pl-[7vw] pr-[7vw] md:pl-[5vw] md:pr-[5vw] lg:pl-[2vw] lg:pr-[2vw] top-[2vh]'>
      <Link href="/" className="font-bold leading-none text-[3rem] lg:text-[clamp(2rem,5.5vw,4rem)]">stix</Link>
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
          <circle cx="5" cy="5" r="4.5" fill="white" stroke={open ? '#a374ff' : 'transparent'} strokeWidth="0.1" style={{ transition: 'stroke 300ms' }} />
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
          <circle cx="5" cy="5" r="4.5" fill="white" stroke="#a374ff" strokeWidth="0.1" />
          <line x1="4" y1="4" x2="6" y2="6" stroke="black" strokeWidth="0.5" />
          <line x1="4" y1="6" x2="6" y2="4" stroke="black" strokeWidth="0.5" />
        </svg>
      </div>
    </div>
  );
}
