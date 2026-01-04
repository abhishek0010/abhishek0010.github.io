import {
  Mail,
  Phone,
  MapPin,
  Download,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Code2,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
} from 'lucide-react';
import { resumeData } from '../data/resume';

const { main, resume } = resumeData;

// Map social network names to icons
const socialIcons: Record<string, React.ElementType> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  facebook: Facebook,
};

export function About() {
  // Extract initials from name for profile placeholder
  const initials = main.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="space-y-16">
      {/* Profile Section */}
      <section aria-labelledby="profile-heading" className="flex flex-col md:flex-row gap-8 items-start">
        {/* Profile Picture Placeholder */}
        <div className="flex-shrink-0">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
            <span className="text-3xl md:text-4xl font-bold text-white">{initials}</span>
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex-1 space-y-4">
          <div>
            <h1 id="profile-heading" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              {main.name}
            </h1>
            <p className="text-xl text-blue-600 dark:text-blue-400 font-medium mt-1">
              {main.occupation}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>
                {main.address.city}, {main.address.state}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <a
                href={`mailto:${main.email}`}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {main.email}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>{main.phone}</span>
            </div>
          </div>

          <p className="text-gray-700 dark:text-gray-300 max-w-2xl">
            {main.description}
          </p>
        </div>
      </section>

      {/* Bio Section */}
      <section aria-labelledby="bio-heading" className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 md:p-8">
        <h2 id="bio-heading" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          About Me
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {main.bio}
        </p>
      </section>

      {/* Work Experience Timeline */}
      <section aria-labelledby="experience-heading">
        <div className="flex items-center gap-3 mb-8">
          <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h2 id="experience-heading" className="text-2xl font-bold text-gray-900 dark:text-white">
            Work Experience
          </h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-6 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />

          <div className="space-y-8">
            {resume.work.map((job, index) => (
              <article key={index} className="relative pl-12 md:pl-16">
                {/* Timeline dot */}
                <div className="absolute left-2 md:left-4 top-1.5 w-4 h-4 rounded-full bg-blue-600 dark:bg-blue-400 border-4 border-white dark:border-gray-900 shadow" />

                <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {job.title}
                    </h3>
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full w-fit">
                      {job.years}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 font-medium mb-2">
                    {job.company}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
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
        <div className="flex items-center gap-3 mb-8">
          <GraduationCap className="w-6 h-6 text-green-600 dark:text-green-400" />
          <h2 id="education-heading" className="text-2xl font-bold text-gray-900 dark:text-white">
            Education
          </h2>
        </div>

        <div className="space-y-6">
          {resume.education.map((edu, index) => (
            <article
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {edu.degree}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 font-medium">
                    {edu.school}
                  </p>
                </div>
                <span className="text-sm font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-3 py-1 rounded-full w-fit">
                  {edu.graduated}
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mt-3">
                {edu.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section aria-labelledby="skills-heading">
        <div className="flex items-center gap-3 mb-4">
          <Code2 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          <h2 id="skills-heading" className="text-2xl font-bold text-gray-900 dark:text-white">
            Skills
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{resume.skillMessage}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {resume.skills.map((skill, index) => {
            const levelPercent = parseInt(skill.level, 10);
            return (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {skill.name}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {skill.level}
                  </span>
                </div>
                <div className="h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${levelPercent}%` }}
                    role="progressbar"
                    aria-valuenow={levelPercent}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${skill.name} proficiency: ${skill.level}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact CTA Section */}
      <section
        aria-labelledby="contact-heading"
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center"
      >
        <h2 id="contact-heading" className="text-2xl font-bold text-white mb-4">
          Let's Connect
        </h2>
        <p className="text-blue-100 mb-6 max-w-xl mx-auto">
          {main.contactMessage}
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <a
            href={`mailto:${main.email}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
          >
            <Mail className="w-5 h-5" />
            Email Me
          </a>
          <a
            href={main.resumeDownload}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-transparent text-white font-medium rounded-lg border-2 border-white hover:bg-white/10 transition-colors"
          >
            <Download className="w-5 h-5" />
            Download Resume
          </a>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4">
          {main.social.map((social) => {
            const Icon = socialIcons[social.name] || ExternalLink;
            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors"
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
