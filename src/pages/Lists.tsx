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
  color: string;
  bgColor: string;
  stats?: string;
}

const categories: ListCategory[] = [
  {
    title: 'Reading List',
    description: 'Books, articles, and papers that have shaped my thinking as a developer.',
    icon: Book,
    path: '/lists/reading',
    count: readingData.length,
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-50 dark:bg-amber-900/20',
    stats: `${readingData.filter((item) => item.status === 'completed').length} completed`,
  },
  {
    title: 'Tools & Setup',
    description: 'Software, apps, and tools I use daily for development and productivity.',
    icon: Wrench,
    path: '/lists/tools',
    count: toolsData.length,
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    stats: `${toolsData.filter((item) => item.favorite).length} favorites`,
  },
  {
    title: 'Resources',
    description: 'Curated learning resources, tutorials, and references I recommend.',
    icon: BookOpen,
    path: '/lists/resources',
    count: resourcesData.length,
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    stats: `${new Set(resourcesData.flatMap((item) => item.tags)).size} topics`,
  },
];

export function Lists() {
  return (
    <div className="space-y-12">
      {/* Page Header */}
      <header className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Lists
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          A curated collection of books, tools, and resources I find valuable.
          Think of it as a personal knowledge base I'm sharing with you.
        </p>
      </header>

      {/* Category Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Link
              key={category.path}
              to={category.path}
              className="group block bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-200"
            >
              {/* Icon */}
              <div
                className={`inline-flex p-3 rounded-lg ${category.bgColor} ${category.color} mb-4`}
              >
                <Icon className="w-6 h-6" />
              </div>

              {/* Title & Description */}
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {category.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                {category.description}
              </p>

              {/* Footer with count and stats */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {category.count} items
                  </span>
                  {category.stats && (
                    <>
                      <span className="text-gray-300 dark:text-gray-600">|</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        {category.stats.includes('favorites') && (
                          <Star className="w-3 h-3 text-amber-500" />
                        )}
                        {category.stats}
                      </span>
                    </>
                  )}
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Additions Preview */}
      <section className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 md:p-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Featured Picks
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Featured Book */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-100 dark:border-gray-700">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded bg-amber-50 dark:bg-amber-900/20">
                <Book className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  Currently Reading
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
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-100 dark:border-gray-700">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded bg-blue-50 dark:bg-blue-900/20">
                <Wrench className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  Favorite Tool
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
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-100 dark:border-gray-700">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded bg-green-50 dark:bg-green-900/20">
                <BookOpen className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  Top Resource
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
