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
    icon: <Github className="w-5 h-5" />,
  },
  {
    href: 'https://linkedin.com/in/abhishek0010',
    label: 'LinkedIn',
    icon: <Linkedin className="w-5 h-5" />,
  },
  {
    href: 'https://twitter.com/abhishek0010',
    label: 'Twitter',
    icon: <Twitter className="w-5 h-5" />,
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center space-y-4">
          {/* Social Links */}
          <div className="flex items-center space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {currentYear} Abhishek. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
