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

export default function Home() {
  const { main } = resumeData;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800" />

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Name */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white tracking-tight">
              {main.name}
            </h1>

            {/* Occupation */}
            <p className="mt-4 text-xl sm:text-2xl text-blue-600 dark:text-blue-400 font-medium">
              {main.occupation}
            </p>

            {/* Description/Tagline */}
            <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {main.description}
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/projects"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
              >
                View Projects
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                to="/blog"
                className="inline-flex items-center px-6 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Read Blog
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>

            {/* Social Links */}
            <div className="mt-12 flex items-center justify-center gap-6">
              {main.social.map((social) => {
                const IconComponent = socialIcons[social.name.toLowerCase()];
                if (!IconComponent) return null;

                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                    aria-label={social.name}
                  >
                    <IconComponent className="w-6 h-6" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Latest Posts */}
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Latest Posts
              </h2>
              <Link
                to="/blog"
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
              >
                View all
                <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="group block p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg transition-all duration-200"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                    {post.description}
                  </p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
                    <span className="inline-flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1" />
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <span className="inline-flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1" />
                      {post.readingTime} min read
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Featured Projects */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Featured Projects
              </h2>
              <Link
                to="/projects"
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
              >
                View all
                <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project, index) => (
                <div
                  key={index}
                  className="group p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {project.title}
                    </h3>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-500 transition-colors" />
                  </div>
                  <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                      >
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
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            About Me
          </h2>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            {main.bio}
          </p>
          <Link
            to="/about"
            className="mt-8 inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
          >
            Learn more about me
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
