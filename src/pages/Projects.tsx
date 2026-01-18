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
        'px-3 py-1 rounded-sharp text-sm font-mono transition-all duration-200',
        isActive
          ? 'bg-accent text-white'
          : 'tag hover:border-accent hover:text-accent'
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
          'h-full flex flex-col card-terminal p-5 hover-glow',
          project.featured && 'ring-1 ring-accent/30'
        )}
      >
        {/* Featured badge */}
        {project.featured && (
          <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded-sharp text-xs font-mono bg-accent text-white shadow-glow-sm">
            featured
          </div>
        )}

        {/* Image or placeholder */}
        <div className="mb-4 rounded-sharp overflow-hidden bg-gray-100 dark:bg-terminal-surface aspect-video flex items-center justify-center border border-gray-200 dark:border-terminal-border">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <Folder className="w-10 h-10 text-gray-400 dark:text-gray-500" />
          )}
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-accent transition-colors">
          {project.title}
        </h2>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-grow line-clamp-3">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span key={tag} className="tag text-xs">
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-terminal-border">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-light transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-accent transition-colors"
            >
              <Github className="w-4 h-4" />
              Source
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
      <header className="mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white font-mono mb-3">
          <span className="text-accent">#</span> projects
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          A collection of projects I've worked on. From web applications to infrastructure tools.
        </p>
      </header>

      {/* Tag filters */}
      {allTags.length > 0 && (
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-mono text-gray-500 dark:text-gray-400 mr-2">
              filter:
            </span>
            <TagButton
              tag="all"
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
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white font-mono mb-6">
                  <span className="text-accent">&gt;</span> featured
                </h2>
              )}
              <div className="grid gap-6 md:grid-cols-2">
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
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white font-mono mb-6">
                  <span className="text-accent">&gt;</span> other
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
                className="mt-2 text-accent hover:text-accent-light transition-colors"
              >
                Clear filter
              </button>
            </>
          ) : (
            <>
              <div className="text-4xl mb-4 font-mono text-accent">{'[ ]'}</div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 font-mono">
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
