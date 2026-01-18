import { Github, Linkedin, Twitter } from 'lucide-react';

interface SocialLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const socialLinks: SocialLink[] = [
  {
    href: 'https://github.com/abhishek0010',
    label: 'GitHub',
    icon: <Github className="w-4 h-4" />,
  },
  {
    href: 'https://linkedin.com/in/abhishek0010',
    label: 'LinkedIn',
    icon: <Linkedin className="w-4 h-4" />,
  },
  {
    href: 'https://twitter.com/_a_k_0_0_1_0_',
    label: 'Twitter',
    icon: <Twitter className="w-4 h-4" />,
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200/50 dark:border-terminal-border/50 bg-white/50 dark:bg-terminal-bg/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left: Status & Version */}
          <div className="flex items-center gap-4 text-sm font-mono">
            {/* Status Indicator */}
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span className="hidden sm:inline">systems online</span>
            </div>

            {/* Version */}
            <span className="text-gray-400 dark:text-gray-500 text-xs">
              v2.0.0
            </span>
          </div>

          {/* Center: Social Links */}
          <div className="flex items-center gap-1">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-sharp text-gray-500 dark:text-gray-400 hover:text-accent hover:bg-accent/10 transition-all duration-200"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>

          {/* Right: Copyright */}
          <p className="text-xs text-gray-500 dark:text-gray-500 font-mono">
            &copy; {currentYear} abhishek
          </p>
        </div>
      </div>
    </footer>
  );
}
