import Image from 'next/image';

const projects = [
  {
    name: 'portfolio',
    description:
      'this website. a personal portfolio built with Next.js and Tailwind CSS. features a spotify integration and links to my cool projects.',
    tags: ['TypeScript', 'Next.js', 'Tailwind CSS'],
    github: 'https://github.com/stixvish/portfolio',
    href: 'https://stixvish.com',
    image: '/previews/portfolio.png',
  },
  {
    name: 'cli tool',
    description:
      'a command-line utility that automates a tedious workflow. saved me hours every week.',
    tags: ['Go', 'Cobra'],
    github: 'https://github.com/stixvish/cli-tool',
    href: null,
    image: null,
  },
];

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

export default function Projects() {
  return (
    <main className="min-h-dvh pt-[calc(clamp(3rem,7.5vh,4rem)+2.5vh+1.5rem)] lg:pt-[calc(clamp(3rem,10vh,5rem)+2.5vh+1.5rem)] pl-[7vw] pr-[7vw] md:pl-[5vw] md:pr-[5vw] lg:pl-[2vw] lg:pr-[2vw] pb-6 lg:pb-10 flex flex-col">

      {/* Heading */}
      <div className="mb-8 lg:mb-12 shrink-0">
        <p className="text-accent text-sm lg:text-base uppercase tracking-widest mb-1">what i&apos;ve built</p>
        <h1 className="text-5xl lg:text-7xl font-bold leading-none tracking-tight">
          projects<span className="text-accent">.</span>
        </h1>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
        {projects.map((project, i) => (
          <div key={i} className="flex flex-col gap-4">

            {/* Image */}
            <div className="relative w-full aspect-video">
              <a
                href={project.href ?? undefined}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 block"
              >
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm uppercase tracking-widest text-neutral-400">no image yet</span>
                  </div>
                )}
              </a>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/40 text-white hover:bg-accent transition-colors duration-200 z-10"
                  aria-label="View on GitHub"
                >
                  <GitHubIcon />
                </a>
              )}
            </div>

            {/* Content */}
            <div className="flex flex-col gap-2">
              {project.href ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit hover:text-accent transition-colors duration-200"
                >
                  <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
                    {project.name}<span className="text-accent">.</span>
                  </h2>
                </a>
              ) : (
                <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
                  {project.name}<span className="text-accent">.</span>
                </h2>
              )}
              <p className="text-lg lg:text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-1">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm uppercase tracking-widest text-accent border border-accent/30 rounded-full px-3 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>

    </main>
  );
}
