import { useParams, Link, Navigate } from 'react-router-dom';
import {
  Book,
  Wrench,
  BookOpen,
  ExternalLink,
  ArrowLeft,
  Star,
  CheckCircle2,
  Clock,
  BookmarkPlus,
  Heart,
} from 'lucide-react';
import readingData from '../content/lists/reading.json';
import toolsData from '../content/lists/tools.json';
import resourcesData from '../content/lists/resources.json';

// Type definitions for list items
interface ReadingItem {
  title: string;
  author: string;
  type: string;
  status: string;
  rating: number | null;
  url: string;
  notes: string;
}

interface ToolItem {
  name: string;
  description: string;
  category: string;
  url: string;
  favorite: boolean;
}

interface ResourceItem {
  title: string;
  description: string;
  category: string;
  tags: string[];
  url: string;
}

const categoryConfig = {
  reading: {
    title: 'Reading List',
    description: 'Books, articles, and papers I have read or plan to read.',
    icon: Book,
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-50 dark:bg-amber-900/20',
  },
  tools: {
    title: 'Tools & Setup',
    description: 'Software and tools I use for development and productivity.',
    icon: Wrench,
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
  },
  resources: {
    title: 'Resources',
    description: 'Learning resources and references I recommend.',
    icon: BookOpen,
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
  },
};

// Status badge component for reading list
function StatusBadge({ status }: { status: string }) {
  const config = {
    completed: {
      icon: CheckCircle2,
      label: 'Completed',
      className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    },
    reading: {
      icon: Clock,
      label: 'Reading',
      className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    },
    'want-to-read': {
      icon: BookmarkPlus,
      label: 'Want to Read',
      className: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
    },
  };

  const { icon: Icon, label, className } = config[status as keyof typeof config] || config['want-to-read'];

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${className}`}>
      <Icon className="w-3.5 h-3.5" />
      {label}
    </span>
  );
}

// Star rating component
function StarRating({ rating }: { rating: number | null }) {
  if (rating === null) return <span className="text-gray-400 dark:text-gray-500 text-sm">Not rated</span>;

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? 'text-amber-400 fill-amber-400'
              : 'text-gray-300 dark:text-gray-600'
          }`}
        />
      ))}
    </div>
  );
}

// Reading List Table Component
function ReadingListView({ data }: { data: ReadingItem[] }) {
  const statusOrder = { reading: 0, 'want-to-read': 1, completed: 2 };
  const sortedData = [...data].sort(
    (a, b) => (statusOrder[a.status as keyof typeof statusOrder] ?? 3) - (statusOrder[b.status as keyof typeof statusOrder] ?? 3)
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
              Title
            </th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white hidden sm:table-cell">
              Author
            </th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
              Status
            </th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white hidden md:table-cell">
              Rating
            </th>
            <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900 dark:text-white">
              Link
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
          {sortedData.map((item, index) => (
            <tr
              key={index}
              className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <td className="py-4 px-4">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {item.title}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 sm:hidden">
                    {item.author}
                  </p>
                  {item.notes && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                      {item.notes}
                    </p>
                  )}
                </div>
              </td>
              <td className="py-4 px-4 text-gray-600 dark:text-gray-300 hidden sm:table-cell">
                {item.author}
              </td>
              <td className="py-4 px-4">
                <StatusBadge status={item.status} />
              </td>
              <td className="py-4 px-4 hidden md:table-cell">
                <StarRating rating={item.rating} />
              </td>
              <td className="py-4 px-4 text-right">
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline text-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Tools Grid Component
function ToolsGridView({ data }: { data: ToolItem[] }) {
  // Group tools by category
  const grouped = data.reduce((acc, tool) => {
    const category = tool.category;
    if (!acc[category]) acc[category] = [];
    acc[category].push(tool);
    return acc;
  }, {} as Record<string, ToolItem[]>);

  const categoryLabels: Record<string, string> = {
    development: 'Development',
    design: 'Design',
    productivity: 'Productivity',
    other: 'Other',
  };

  return (
    <div className="space-y-10">
      {Object.entries(grouped).map(([category, tools]) => (
        <div key={category}>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            {categoryLabels[category] || category}
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              ({tools.length})
            </span>
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool, index) => (
              <a
                key={index}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {tool.name}
                  </h4>
                  <div className="flex items-center gap-2">
                    {tool.favorite && (
                      <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                    )}
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {tool.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Resources List Component
function ResourcesListView({ data }: { data: ResourceItem[] }) {
  // Group by category
  const grouped = data.reduce((acc, resource) => {
    const category = resource.category;
    if (!acc[category]) acc[category] = [];
    acc[category].push(resource);
    return acc;
  }, {} as Record<string, ResourceItem[]>);

  return (
    <div className="space-y-8">
      {Object.entries(grouped).map(([category, resources]) => (
        <div key={category}>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 capitalize">
            {category}
          </h3>
          <div className="space-y-3">
            {resources.map((resource, index) => (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-white dark:bg-gray-800 rounded-lg p-5 border border-gray-100 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-800 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors mb-1">
                      {resource.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {resource.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {resource.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-block px-2 py-0.5 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-green-500 flex-shrink-0 transition-colors" />
                </div>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function ListDetail() {
  const { category } = useParams<{ category: string }>();

  // Validate category
  if (!category || !['reading', 'tools', 'resources'].includes(category)) {
    return <Navigate to="/lists" replace />;
  }

  const config = categoryConfig[category as keyof typeof categoryConfig];
  const Icon = config.icon;

  // Get data based on category
  const getData = () => {
    switch (category) {
      case 'reading':
        return readingData;
      case 'tools':
        return toolsData;
      case 'resources':
        return resourcesData;
      default:
        return [];
    }
  };

  const data = getData();

  return (
    <div className="space-y-8">
      {/* Back Link */}
      <Link
        to="/lists"
        className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Lists
      </Link>

      {/* Page Header */}
      <header className="flex items-start gap-4">
        <div className={`p-3 rounded-xl ${config.bgColor} ${config.color}`}>
          <Icon className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {config.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {config.description}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
            {data.length} items
          </p>
        </div>
      </header>

      {/* Content based on category */}
      <div className="bg-white dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700 p-4 md:p-6">
        {category === 'reading' && <ReadingListView data={data as ReadingItem[]} />}
        {category === 'tools' && <ToolsGridView data={data as ToolItem[]} />}
        {category === 'resources' && <ResourcesListView data={data as ResourceItem[]} />}
      </div>
    </div>
  );
}

export default ListDetail;
