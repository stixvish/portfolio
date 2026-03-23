import Image from 'next/image';

const education = [
  {
    school: 'illinois institute of technology',
    degree: 'bachelor of science in computer science, concentration in data science',
    period: 'Aug 2024 – Aug 2026',
    location: 'Chicago, IL',
    logo: '/logos/iit.png',
  },
  {
    school: 'college of dupage',
    degree: 'associate of science',
    period: 'May 2023 – May 2024',
    location: 'Glen Ellyn, IL',
    logo: '/logos/cod.jpg',
  },
  {
    school: 'arizona state university',
    degree: 'ira a. fulton schools of engineering',
    period: 'Aug 2021 – Dec 2022',
    location: 'Tempe, AZ',
    logo: '/logos/asu.jpg',
  },
];

const experiences = [
  {
    company: 'isos technology',
    role: 'development intern',
    period: 'Jun 2022 – Aug 2022',
    location: 'Tempe, AZ',
    description: [
      "developed a plugin for Atlassian's Jira to remove inactive issues and declutter user environments.",
      'learned to collaborate within a team of developers and communicate in a professional setting.',
    ],
    tags: ['Java', 'Atlassian SDK', 'Agile'],
    logo: '/logos/isos.jpg',
  },
  {
    company: 'national science foundation',
    role: 'reu undergraduate research fellow',
    period: 'Jun 2022 – Aug 2022',
    location: 'Tempe, AZ',
    description: [
      'contributed to a data analysis of differing communities in the Boston area to understand disparity between communities.',
      'engineered an application to display findings using MongoDB and React.js.',
    ],
    tags: ['JavaScript', 'MongoDB', 'React.js'],
    logo: '/logos/nsf.jpg',
  },
];

export default function Experience() {
  return (
    <main className="min-h-dvh pt-[calc(clamp(3rem,7.5vh,4rem)+2.5vh+1.5rem)] lg:pt-[calc(clamp(3rem,10vh,5rem)+2.5vh+1.5rem)] pl-[7vw] pr-[7vw] md:pl-[5vw] md:pr-[5vw] lg:pl-[2vw] lg:pr-[2vw] pb-6 lg:pb-10 flex flex-col">

      {/* Heading */}
      <div className="mb-8 lg:mb-12 shrink-0">
        <p className="text-accent text-sm lg:text-base uppercase tracking-widest mb-1">what i&apos;ve done</p>
        <h1 className="text-5xl lg:text-7xl font-bold leading-none tracking-tight">
          experience<span className="text-accent">.</span>
        </h1>
      </div>

      {/* Two-column layout */}
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

        {/* Left: Work experience */}
        <div className="flex flex-col gap-0 lg:w-1/2">
          <p className="text-accent text-4xl mb-2">work</p>
          {experiences.map((exp, i) => (
            <div
              key={i}
              className="flex flex-col py-8 border-t border-neutral-200 dark:border-neutral-800 last:border-b"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="relative w-10 h-10 rounded-md overflow-hidden shrink-0">
                  <Image src={exp.logo} alt={exp.company} fill sizes="40px" className="object-contain" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
                  {exp.company}<span className="text-accent">.</span>
                </h2>
              </div>
              <p className="text-base lg:text-lg uppercase tracking-widest text-neutral-400 mb-1">
                {exp.period} &middot; {exp.location}
              </p>
              <p className="text-xl lg:text-2xl italic text-neutral-700 dark:text-neutral-200 mt-0.5 mb-3">{exp.role}</p>
              <ul className="list-none text-lg lg:text-xl text-neutral-700 dark:text-neutral-200 leading-relaxed mb-4 space-y-1">
                {exp.description.map((point, j) => (
                  <li key={j}>{point}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {exp.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm uppercase tracking-widest text-accent border border-accent/30 rounded-full px-3 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right: Education */}
        <div className="flex flex-col gap-0 lg:w-1/2">
          <p className="text-accent text-4xl mb-2">education</p>
          {education.map((edu, i) => (
            <div
              key={i}
              className="flex flex-col py-8 border-t border-neutral-200 dark:border-neutral-800 last:border-b"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="relative w-10 h-10 rounded-md overflow-hidden shrink-0">
                  <Image src={edu.logo} alt={edu.school} fill sizes="40px" className="object-contain" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
                  {edu.school}<span className="text-accent">.</span>
                </h2>
              </div>
              <p className="text-base lg:text-lg uppercase tracking-widest text-neutral-400 mb-1">
                {edu.period} &middot; {edu.location}
              </p>
              <p className="text-xl lg:text-2xl italic text-neutral-700 dark:text-neutral-200 mt-0.5">{edu.degree}</p>
            </div>
          ))}
        </div>

      </div>

    </main>
  );
}
