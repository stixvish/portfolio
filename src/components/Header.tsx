'use client';

import { useState } from 'react';
import Link from 'next/link';

const statements = [
  'i build things that matter.',
  'chicago-made, everywhere-bound.',
  'software is just math you can ship.',
  'always learning, occasionally sleeping.',
  'i write code and overthink chess moves.',
  'data nerd with good taste in music.',
  'cs student by day, bug-fixer by night.',
  'basketball > meetings.',
];

const links = [
  { href: '/about', label: 'about me' },
  { href: '/experience', label: 'experience' },
  { href: '/projects', label: 'projects' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [statement, setStatement] = useState(statements[0]);

  const openMenu = () => {
    setStatement(statements[Math.floor(Math.random() * statements.length)]);
    setOpen(true);
  };

  return (
    <header>
      {/* dropdown nav */}
      <div
        className='fixed z-20 inset-0 flex flex-col-reverse lg:flex-row gap-5 lg:gap-0 bg-white transition-all duration-500 ease-in-out pl-[7vw] pr-[7vw] md:pl-[5vw] md:pr-[5vw] lg:pl-[2vw] lg:pr-[2vw] pb-[5vh]'
        style={{ clipPath: open ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)' }}
      >
        {/* rotating statement */}
        <div className='flex flex-col justify-end w-full lg:w-1/2'>
          <p className='text-accent leading-tight tracking-tight text-[1.25rem] lg:text-[clamp(1.25rem,2vw,2rem)]'>
            {statement}
          </p>
        </div>
        {/* nav links */}
        <nav className='flex flex-col justify-end w-full lg:w-1/2 flex-1 gap-3 lg:gap-5'>
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className='text-black hover:text-accent transition-colors duration-300 tracking-tight leading-none text-[4rem] lg:text-[clamp(5rem,7vw,7rem)] font-bold'
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>

      {/* main header */}
      <div className='fixed z-30 w-full h-[clamp(3rem,7.5vh,4rem)] lg:h-[clamp(3rem,10vh,5rem)] flex justify-between items-center pl-[7vw] pr-[7vw] md:pl-[5vw] md:pr-[5vw] lg:pl-[2vw] lg:pr-[2vw] top-[2.5vh]'>
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="font-bold transition-colors duration-500 leading-none text-[2rem] lg:text-[clamp(2rem,5.5vw,3rem)]"
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
            onClick={openMenu}
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
