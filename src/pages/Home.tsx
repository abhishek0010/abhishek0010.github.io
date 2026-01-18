import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Instagram, ArrowRight, Calendar, Clock, ExternalLink } from 'lucide-react';
import { resumeData } from '@/data/resume';

// Map social network names to lucide icons
const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
};

// Placeholder data for featured posts
const latestPosts = [
  {
    title: 'Building Scalable Microservices with Go',
    slug: 'building-scalable-microservices-go',
    date: '2024-01-15',
    description: 'A deep dive into designing and implementing microservices architecture using Go and Docker.',
    readingTime: 8,
  },
  {
    title: 'The Art of Database Migration',
    slug: 'art-of-database-migration',
    date: '2024-01-10',
    description: 'Best practices for migrating large-scale databases with zero downtime.',
    readingTime: 6,
  },
  {
    title: 'React Performance Optimization Tips',
    slug: 'react-performance-optimization',
    date: '2024-01-05',
    description: 'Practical techniques to improve your React application performance.',
    readingTime: 5,
  },
];

// Placeholder data for featured projects
const featuredProjects = [
  {
    title: 'Project Planning Platform',
    description: 'A revolutionary commercial project planning and tracking platform for construction industry.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
  },
  {
    title: 'Authentication Microservice',
    description: 'Scalable authentication service with OAuth2 and JWT support.',
    tags: ['Go', 'Redis', 'Docker'],
  },
  {
    title: 'Data Scraping Infrastructure',
    description: 'Distributed web scraping system for large-scale data collection.',
    tags: ['Python', 'Scrapy', 'AWS'],
  },
];

// Typewriter component for the hero
function Typewriter({ text, delay = 50, className = '' }: { text: string; delay?: number; className?: string }) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1));
        i++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, delay);
    return () => clearInterval(timer);
  }, [text, delay]);

  return (
    <span className={className}>
      {displayText}
      {!isComplete && <span className="animate-blink text-accent">▋</span>}
    </span>
  );
}

export default function Home() {
  const { main } = resumeData;
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show content after typewriter animation
    const timer = setTimeout(() => setShowContent(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24">
        <div className="relative max-w-4xl mx-auto">
          {/* Terminal-style intro */}
          <div className="space-y-6">
            {/* Command prompt */}
            <div className="font-mono text-sm text-gray-500 dark:text-gray-400">
              <span className="text-accent">$</span> whoami
            </div>

            {/* Name with typewriter effect */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white tracking-tight font-mono">
              <Typewriter text={main.name} delay={80} />
            </h1>

            {/* Occupation as terminal output */}
            <div
              className={`transform transition-all duration-500 ${
                showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <p className="text-xl sm:text-2xl text-accent font-mono">
                {'> '}{main.occupation}
              </p>
            </div>

            {/* Description */}
            <div
              className={`transform transition-all duration-500 delay-100 ${
                showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <p className="max-w-2xl text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                {main.description}
              </p>
            </div>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 pt-4 transform transition-all duration-500 delay-200 ${
                showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <Link to="/projects" className="btn-glow inline-flex items-center justify-center">
                View Projects
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link to="/blog" className="btn-ghost inline-flex items-center justify-center">
                Read Blog
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>

            {/* Social Links */}
            <div
              className={`flex items-center gap-2 pt-4 transform transition-all duration-500 delay-300 ${
                showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {main.social.map((social) => {
                const IconComponent = socialIcons[social.name.toLowerCase()];
                if (!IconComponent) return null;

                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-sharp text-gray-500 dark:text-gray-400 hover:text-accent hover:bg-accent/10 transition-all duration-200"
                    aria-label={social.name}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto">
          {/* Latest Posts */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white font-mono">
                <span className="text-accent">#</span> latest_posts
              </h2>
              <Link
                to="/blog"
                className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-accent font-mono transition-colors"
              >
                view all
                <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group card-terminal p-5 hover-glow"
                >
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-accent transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                    {post.description}
                  </p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500 font-mono">
                    <span className="inline-flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                    <span className="inline-flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {post.readingTime}m
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Featured Projects */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white font-mono">
                <span className="text-accent">#</span> featured_projects
              </h2>
              <Link
                to="/projects"
                className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-accent font-mono transition-colors"
              >
                view all
                <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project, index) => (
                <div
                  key={index}
                  className="group card-terminal p-5 hover-glow"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-accent transition-colors flex-shrink-0" />
                  </div>
                  <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Brief About Preview */}
      <section className="py-16 border-t border-gray-200 dark:border-terminal-border">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white font-mono mb-6">
            <span className="text-accent">#</span> about_me
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {main.bio}
          </p>
          <Link
            to="/about"
            className="mt-8 inline-flex items-center text-accent hover:text-accent-light font-medium transition-colors"
          >
            Learn more
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
