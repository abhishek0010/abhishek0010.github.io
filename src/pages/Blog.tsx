import { Suspense, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllBlogPosts, getAllTags } from '@/lib/blog';
import { formatDate, cn } from '@/lib/utils';
import { BlogPost } from '@/types';

// Loading skeleton component
function BlogPostSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-3" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
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

// Blog post card component
function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <article className="group">
      <Link
        to={`/blog/${post.slug}`}
        className="block p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-lg transition-all duration-200"
      >
        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
          {post.title}
        </h2>

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-3">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span className="hidden sm:inline">-</span>
          <span>{post.readingTime} min read</span>
          {post.draft && (
            <span className="px-2 py-0.5 rounded bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs font-medium">
              Draft
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {post.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
            >
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
        <div className="text-6xl mb-4">-</div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
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
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
              Filter by tag:
            </span>
            <TagButton
              tag="All"
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
      <div className="grid gap-6 md:grid-cols-2">
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
            className="mt-2 text-blue-600 dark:text-blue-400 hover:underline"
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
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Blog
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Thoughts on software engineering, web development, and beyond.
        </p>
      </header>

      {/* Blog posts with Suspense */}
      <Suspense
        fallback={
          <div className="grid gap-6 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="p-6 rounded-xl border border-gray-200 dark:border-gray-700"
              >
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
