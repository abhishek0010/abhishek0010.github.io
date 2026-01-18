import { Link } from 'react-router-dom';
import { Book, Wrench, BookOpen, ArrowRight, Star } from 'lucide-react';
import readingData from '../content/lists/reading.json';
import toolsData from '../content/lists/tools.json';
import resourcesData from '../content/lists/resources.json';

interface ListCategory {
  title: string;
  description: string;
  icon: React.ElementType;
  path: string;
  count: number;
  stats?: string;
}

const categories: ListCategory[] = [
  {
    title: 'reading',
    description: 'Books, articles, and papers that have shaped my thinking as a developer.',
    icon: Book,
    path: '/lists/reading',
    count: readingData.length,
    stats: `${readingData.filter((item) => item.status === 'completed').length} completed`,
  },
  {
    title: 'tools',
    description: 'Software, apps, and tools I use daily for development and productivity.',
    icon: Wrench,
    path: '/lists/tools',
    count: toolsData.length,
    stats: `${toolsData.filter((item) => item.favorite).length} favorites`,
  },
  {
    title: 'resources',
    description: 'Curated learning resources, tutorials, and references I recommend.',
    icon: BookOpen,
    path: '/lists/resources',
    count: resourcesData.length,
    stats: `${new Set(resourcesData.flatMap((item) => item.tags)).size} topics`,
  },
];

export function Lists() {
  return (
    <div className="space-y-12">
      {/* Page Header */}
      <header className="max-w-2xl">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white font-mono mb-3">
          <span className="text-accent">#</span> lists
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          A curated collection of books, tools, and resources I find valuable.
        </p>
      </header>

      {/* Category Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Link
              key={category.path}
              to={category.path}
              className="group card-terminal p-5 hover-glow"
            >
              {/* Icon */}
              <div className="inline-flex p-2 rounded-sharp bg-accent/10 text-accent mb-4">
                <Icon className="w-5 h-5" />
              </div>

              {/* Title & Description */}
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-accent transition-colors font-mono">
                {category.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                {category.description}
              </p>

              {/* Footer with count and stats */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-terminal-border">
                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className="text-gray-900 dark:text-white">
                    {category.count} items
                  </span>
                  {category.stats && (
                    <>
                      <span className="text-gray-300 dark:text-gray-600">|</span>
                      <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        {category.stats.includes('favorites') && (
                          <Star className="w-3 h-3 text-accent" />
                        )}
                        {category.stats}
                      </span>
                    </>
                  )}
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-accent group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Additions Preview */}
      <section className="card-terminal p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white font-mono mb-6">
          <span className="text-accent">&gt;</span> featured_picks
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {/* Featured Book */}
          <div className="p-4 rounded-sharp border border-gray-200 dark:border-terminal-border bg-gray-50 dark:bg-terminal-surface/50">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-sharp bg-accent/10">
                <Book className="w-4 h-4 text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-mono text-gray-500 dark:text-gray-400 mb-1">
                  currently_reading
                </p>
                <p className="font-medium text-gray-900 dark:text-white text-sm truncate">
                  {readingData.find((item) => item.status === 'reading')?.title ||
                    readingData[0].title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {readingData.find((item) => item.status === 'reading')?.author ||
                    readingData[0].author}
                </p>
              </div>
            </div>
          </div>

          {/* Favorite Tool */}
          <div className="p-4 rounded-sharp border border-gray-200 dark:border-terminal-border bg-gray-50 dark:bg-terminal-surface/50">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-sharp bg-accent/10">
                <Wrench className="w-4 h-4 text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-mono text-gray-500 dark:text-gray-400 mb-1">
                  favorite_tool
                </p>
                <p className="font-medium text-gray-900 dark:text-white text-sm truncate">
                  {toolsData.find((item) => item.favorite)?.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {toolsData.find((item) => item.favorite)?.description}
                </p>
              </div>
            </div>
          </div>

          {/* Top Resource */}
          <div className="p-4 rounded-sharp border border-gray-200 dark:border-terminal-border bg-gray-50 dark:bg-terminal-surface/50">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-sharp bg-accent/10">
                <BookOpen className="w-4 h-4 text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-mono text-gray-500 dark:text-gray-400 mb-1">
                  top_resource
                </p>
                <p className="font-medium text-gray-900 dark:text-white text-sm truncate">
                  {resourcesData[0].title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {resourcesData[0].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Lists;
