import { useMemo, useState } from 'react';
import { ExternalLink, Github, Folder } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Project } from '@/types';
import projectsData from '@/content/projects/projects.json';

// Tag filter button component
function TagButton({
  tag,
  isActive,
  onClick,
}: {
  tag: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-3 py-1 rounded-full text-sm font-medium transition-colors',
        isActive
          ? 'bg-blue-600 text-white'
          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
      )}
    >
      {tag}
    </button>
  );
}

// Project card component
function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative">
      <div
        className={cn(
          'h-full flex flex-col p-6 rounded-xl border bg-white dark:bg-gray-800 transition-all duration-200',
          'border-gray-200 dark:border-gray-700',
          'hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-lg',
          project.featured && 'ring-2 ring-blue-500/20 dark:ring-blue-400/20'
        )}
      >
        {/* Featured badge */}
        {project.featured && (
          <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-600 text-white shadow-sm">
            Featured
          </div>
        )}

        {/* Image or placeholder */}
        <div className="mb-4 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 aspect-video flex items-center justify-center">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <Folder className="w-12 h-12 text-gray-400 dark:text-gray-500" />
          )}
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {project.title}
        </h2>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow line-clamp-3">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
              Source Code
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

// Main Projects page component
export default function Projects() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Load projects and extract all unique tags
  const projects = useMemo(() => projectsData as Project[], []);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    projects.forEach((project) => {
      project.tags.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [projects]);

  // Separate featured and regular projects, then filter by tag
  const { featuredProjects, regularProjects } = useMemo(() => {
    const filtered = activeTag
      ? projects.filter((project) => project.tags.includes(activeTag))
      : projects;

    return {
      featuredProjects: filtered.filter((p) => p.featured),
      regularProjects: filtered.filter((p) => !p.featured),
    };
  }, [projects, activeTag]);

  const hasProjects = featuredProjects.length > 0 || regularProjects.length > 0;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Page header */}
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Projects
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          A collection of projects I've worked on. From web applications to
          CLI tools, here's what I've been building.
        </p>
      </header>

      {/* Tag filters */}
      {allTags.length > 0 && (
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
              Filter by technology:
            </span>
            <TagButton
              tag="All"
              isActive={activeTag === null}
              onClick={() => setActiveTag(null)}
            />
            {allTags.map((tag) => (
              <TagButton
                key={tag}
                tag={tag}
                isActive={activeTag === tag}
                onClick={() => setActiveTag(tag)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Projects grid */}
      {hasProjects ? (
        <div className="space-y-12">
          {/* Featured projects */}
          {featuredProjects.length > 0 && (
            <section>
              {!activeTag && (
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  Featured Projects
                </h2>
              )}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                {featuredProjects.map((project) => (
                  <ProjectCard key={project.title} project={project} />
                ))}
              </div>
            </section>
          )}

          {/* Regular projects */}
          {regularProjects.length > 0 && (
            <section>
              {!activeTag && featuredProjects.length > 0 && (
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  Other Projects
                </h2>
              )}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {regularProjects.map((project) => (
                  <ProjectCard key={project.title} project={project} />
                ))}
              </div>
            </section>
          )}
        </div>
      ) : (
        <div className="text-center py-16">
          {activeTag ? (
            <>
              <p className="text-gray-600 dark:text-gray-400">
                No projects found with "{activeTag}" technology.
              </p>
              <button
                onClick={() => setActiveTag(null)}
                className="mt-2 text-blue-600 dark:text-blue-400 hover:underline"
              >
                Clear filter
              </button>
            </>
          ) : (
            <>
              <div className="text-6xl mb-4">-</div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No projects yet
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Check back soon for new projects!
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
