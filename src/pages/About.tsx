import {
  Mail,
  MapPin,
  Download,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Server,
  Code2,
  Wrench,
} from 'lucide-react';
import { resumeData } from '../data/resume';

const { main, resume } = resumeData;

// Map social network names to icons
const socialIcons: Record<string, React.ElementType> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
};

// Grouped skills by domain for cleaner presentation
const skillGroups = [
  {
    name: 'Infrastructure',
    icon: Server,
    skills: ['AWS', 'GCP', 'Docker', 'DevOps', 'Backend'],
  },
  {
    name: 'Languages',
    icon: Code2,
    skills: ['Python', 'Java', 'Go', 'C++', 'Swift', 'JavaScript'],
  },
  {
    name: 'Tools & Data',
    icon: Wrench,
    skills: ['MySQL', 'PostgreSQL', 'Redis', 'Git'],
  },
];

export function About() {
  // Extract initials from name for profile placeholder
  const initials = main.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="space-y-12">
      {/* Profile Section */}
      <section aria-labelledby="profile-heading" className="flex flex-col md:flex-row gap-8 items-start">
        {/* Profile Picture Placeholder */}
        <div className="flex-shrink-0">
          <div className="w-28 h-28 md:w-32 md:h-32 rounded-sharp bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center shadow-glow">
            <span className="text-2xl md:text-3xl font-bold text-white font-mono">{initials}</span>
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex-1 space-y-4">
          <div>
            <h1 id="profile-heading" className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white font-mono">
              {main.name}
            </h1>
            <p className="text-lg text-accent font-mono mt-1">
              {'> '}{main.occupation}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent" />
              <span>
                {main.address.city}, {main.address.state}
              </span>
            </div>
            <a
              href={`mailto:${main.email}`}
              className="flex items-center gap-2 hover:text-accent transition-colors"
            >
              <Mail className="w-4 h-4 text-accent" />
              <span>{main.email}</span>
            </a>
          </div>

          <p className="text-gray-700 dark:text-gray-300 max-w-2xl leading-relaxed">
            {main.description}
          </p>
        </div>
      </section>

      {/* Bio Section */}
      <section aria-labelledby="bio-heading" className="card-terminal p-6">
        <h2 id="bio-heading" className="text-lg font-bold text-gray-900 dark:text-white font-mono mb-4">
          <span className="text-accent">#</span> about_me
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {main.bio}
        </p>
      </section>

      {/* Skills Section - Grouped Tags */}
      <section aria-labelledby="skills-heading">
        <h2 id="skills-heading" className="text-lg font-bold text-gray-900 dark:text-white font-mono mb-6">
          <span className="text-accent">#</span> skills
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {skillGroups.map((group) => {
            const Icon = group.icon;
            return (
              <div key={group.name} className="card-terminal p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Icon className="w-4 h-4 text-accent" />
                  <h3 className="font-mono text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    {group.name}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span key={skill} className="tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Work Experience Timeline */}
      <section aria-labelledby="experience-heading">
        <div className="flex items-center gap-2 mb-6">
          <Briefcase className="w-5 h-5 text-accent" />
          <h2 id="experience-heading" className="text-lg font-bold text-gray-900 dark:text-white font-mono">
            <span className="text-accent">#</span> experience
          </h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-terminal-border dark:bg-terminal-border" />

          <div className="space-y-6">
            {resume.work.map((job, index) => (
              <article key={index} className="relative pl-8">
                {/* Timeline dot */}
                <div className="absolute left-0 top-2 w-[15px] h-[15px] rounded-full bg-accent border-4 border-white dark:border-terminal-bg shadow-glow-sm" />

                <div className="card-terminal p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {job.title}
                    </h3>
                    <span className="text-xs font-mono text-accent bg-accent/10 px-2 py-1 rounded-sharp w-fit">
                      {job.years}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-2">
                    {job.company}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {job.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section aria-labelledby="education-heading">
        <div className="flex items-center gap-2 mb-6">
          <GraduationCap className="w-5 h-5 text-accent" />
          <h2 id="education-heading" className="text-lg font-bold text-gray-900 dark:text-white font-mono">
            <span className="text-accent">#</span> education
          </h2>
        </div>

        <div className="space-y-4">
          {resume.education.map((edu, index) => (
            <article key={index} className="card-terminal p-5">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {edu.degree}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {edu.school}
                  </p>
                </div>
                <span className="text-xs font-mono text-accent bg-accent/10 px-2 py-1 rounded-sharp w-fit">
                  {edu.graduated}
                </span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                {edu.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Contact CTA Section */}
      <section
        aria-labelledby="contact-heading"
        className="bg-gradient-to-r from-accent/10 via-accent/5 to-transparent border border-accent/20 rounded-sharp p-8"
      >
        <h2 id="contact-heading" className="text-lg font-bold text-gray-900 dark:text-white font-mono mb-4">
          <span className="text-accent">#</span> let's_connect
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-xl">
          {main.contactMessage}
        </p>

        <div className="flex flex-wrap gap-4 mb-6">
          <a
            href={`mailto:${main.email}`}
            className="btn-glow inline-flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            Email Me
          </a>
          <a
            href={main.resumeDownload}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost inline-flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download Resume
          </a>
        </div>

        {/* Social Links */}
        <div className="flex gap-2">
          {main.social.map((social) => {
            const Icon = socialIcons[social.name.toLowerCase()] || ExternalLink;
            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-sharp text-gray-500 dark:text-gray-400 hover:text-accent hover:bg-accent/10 transition-all duration-200"
                aria-label={`Visit ${social.name} profile`}
              >
                <Icon className="w-5 h-5" />
              </a>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default About;
