import { Suspense, useMemo } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { MDXProvider } from '@mdx-js/react';
import { getBlogPostBySlug, getBlogPostComponent, getRelatedPosts } from '@/lib/blog';
import { MDXComponents } from '@/components/mdx/MDXComponents';
import { formatDate } from '@/lib/utils';
import { BlogPost as BlogPostType } from '@/types';

// Arrow left icon component
function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
      />
    </svg>
  );
}

// Loading skeleton for blog post
function BlogPostSkeleton() {
  return (
    <div className="animate-pulse max-w-3xl mx-auto">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-8" />
      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4" />
      <div className="flex gap-4 mb-8">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24" />
      </div>
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="h-4 bg-gray-200 dark:bg-gray-700 rounded"
            style={{ width: `${Math.random() * 30 + 70}%` }}
          />
        ))}
      </div>
    </div>
  );
}

// Related posts component
function RelatedPosts({ posts }: { posts: BlogPostType[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Related Posts
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
              {post.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {formatDate(post.date)}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

// Blog post content component
function BlogPostContent({ slug }: { slug: string }) {
  const post = useMemo(() => getBlogPostBySlug(slug), [slug]);
  const MDXContent = useMemo(() => getBlogPostComponent(slug), [slug]);
  const relatedPosts = useMemo(
    () => (post ? getRelatedPosts(post.slug, post.tags) : []),
    [post]
  );

  // Handle 404
  if (!post || !MDXContent) {
    return <Navigate to="/blog" replace />;
  }

  // Check if draft and in production
  if (post.draft && import.meta.env.PROD) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <article className="max-w-3xl mx-auto">
      {/* Back link */}
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-8"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        Back to blog
      </Link>

      {/* Post header */}
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {post.title}
        </h1>

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span className="hidden sm:inline">|</span>
          <span>{post.readingTime} min read</span>
          {post.draft && (
            <span className="px-2 py-0.5 rounded bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs font-medium">
              Draft
            </span>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              to={`/blog?tag=${encodeURIComponent(tag)}`}
              className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </header>

      {/* Post content */}
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <MDXProvider components={MDXComponents}>
          <MDXContent />
        </MDXProvider>
      </div>

      {/* Related posts */}
      <RelatedPosts posts={relatedPosts} />

      {/* Footer navigation */}
      <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back to all posts
        </Link>
      </footer>
    </article>
  );
}

// Main BlogPost page component
export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <Suspense fallback={<BlogPostSkeleton />}>
      <BlogPostContent slug={slug} />
    </Suspense>
  );
}
