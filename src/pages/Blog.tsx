import { Suspense, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllBlogPosts, getAllTags } from '@/lib/blog';
import { formatDate, cn } from '@/lib/utils';
import { BlogPost } from '@/types';
import { Calendar, Clock } from 'lucide-react';

// Loading skeleton component
function BlogPostSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-5 bg-gray-200 dark:bg-terminal-surface rounded w-3/4 mb-3" />
      <div className="h-4 bg-gray-200 dark:bg-terminal-surface rounded w-1/4 mb-3" />
      <div className="h-4 bg-gray-200 dark:bg-terminal-surface rounded w-full mb-2" />
      <div className="h-4 bg-gray-200 dark:bg-terminal-surface rounded w-5/6" />
    </div>
  );
}

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

// Blog post card component
function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <article className="group">
      <Link
        to={`/blog/${post.slug}`}
        className="block card-terminal p-5 hover-glow h-full"
      >
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-accent transition-colors mb-2">
          {post.title}
        </h2>

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400 font-mono mb-3">
          <span className="inline-flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </span>
          <span className="inline-flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {post.readingTime}m
          </span>
          {post.draft && (
            <span className="px-2 py-0.5 rounded-sharp bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 text-xs font-medium">
              Draft
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {post.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="tag text-xs">
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </article>
  );
}

// Blog post list content
function BlogPostList() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const posts = useMemo(() => getAllBlogPosts(), []);
  const tags = useMemo(() => getAllTags(), []);

  const filteredPosts = useMemo(() => {
    if (!activeTag) return posts;
    return posts.filter((post) => post.tags.includes(activeTag));
  }, [posts, activeTag]);

  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-4xl mb-4 font-mono text-accent">{'{ }'}</div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 font-mono">
          No posts yet
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Check back soon for new content!
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Tag filters */}
      {tags.length > 0 && (
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
            {tags.map((tag) => (
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

      {/* Posts grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {filteredPosts.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>

      {/* No results message */}
      {filteredPosts.length === 0 && activeTag && (
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">
            No posts found with tag "{activeTag}".
          </p>
          <button
            onClick={() => setActiveTag(null)}
            className="mt-2 text-accent hover:text-accent-light transition-colors"
          >
            Clear filter
          </button>
        </div>
      )}
    </div>
  );
}

// Main Blog page component
export default function Blog() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Page header */}
      <header className="mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white font-mono mb-3">
          <span className="text-accent">#</span> blog
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Thoughts on software engineering, infrastructure, and systems design.
        </p>
      </header>

      {/* Blog posts with Suspense */}
      <Suspense
        fallback={
          <div className="grid gap-4 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card-terminal p-5">
                <BlogPostSkeleton />
              </div>
            ))}
          </div>
        }
      >
        <BlogPostList />
      </Suspense>
    </div>
  );
}
