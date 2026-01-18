import { BlogPost } from '@/types';

// Type for the module returned by import.meta.glob
interface MDXModule {
  default: React.ComponentType;
  frontmatter?: {
    title?: string;
    date?: string;
    description?: string;
    tags?: string[];
    draft?: boolean;
  };
}

// Import all MDX files eagerly for frontmatter
const blogModules = import.meta.glob<MDXModule>('/src/content/blog/*.mdx', {
  eager: true,
});

// Import raw content for reading time calculation
const blogRawModules = import.meta.glob<string>('/src/content/blog/*.mdx', {
  eager: true,
  query: '?raw',
  import: 'default',
});

/**
 * Extract slug from file path
 */
function getSlugFromPath(path: string): string {
  const filename = path.split('/').pop() || '';
  return filename.replace('.mdx', '');
}

/**
 * Calculate reading time from content
 */
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

/**
 * Extract content from raw MDX string (removes frontmatter)
 */
function extractContentFromMDX(rawContent: string): string {
  if (typeof rawContent !== 'string') return '';
  const frontmatterRegex = /^---[\s\S]*?---/;
  return rawContent.replace(frontmatterRegex, '').trim();
}

/**
 * Get all blog posts with metadata
 * @param includeDrafts - Whether to include draft posts (default: false in production)
 * @returns Array of blog posts sorted by date descending
 */
export function getAllBlogPosts(includeDrafts = false): BlogPost[] {
  const posts: BlogPost[] = [];

  for (const path in blogModules) {
    const module = blogModules[path];
    const frontmatter = module.frontmatter || {};
    const slug = getSlugFromPath(path);

    // Get raw content for reading time calculation
    // The raw modules use the same path keys
    const rawContent = blogRawModules[path] || '';
    const contentWithoutFrontmatter = extractContentFromMDX(rawContent);

    const post: BlogPost = {
      title: frontmatter.title || 'Untitled',
      slug,
      date: frontmatter.date || new Date().toISOString().split('T')[0],
      description: frontmatter.description || '',
      tags: frontmatter.tags || [],
      draft: frontmatter.draft ?? false,
      content: contentWithoutFrontmatter,
      readingTime: calculateReadingTime(contentWithoutFrontmatter),
    };

    // Filter out drafts in production unless explicitly requested
    const isProduction = import.meta.env.PROD;
    if (!post.draft || includeDrafts || !isProduction) {
      posts.push(post);
    }
  }

  // Sort by date descending (newest first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get a single blog post by slug
 * @param slug - The post slug
 * @returns The blog post or null if not found
 */
export function getBlogPostBySlug(slug: string): BlogPost | null {
  const posts = getAllBlogPosts(true); // Include drafts for direct access
  return posts.find((post) => post.slug === slug) || null;
}

/**
 * Get the MDX component for a blog post
 * @param slug - The post slug
 * @returns The MDX component or null if not found
 */
export function getBlogPostComponent(slug: string): React.ComponentType | null {
  const path = `/src/content/blog/${slug}.mdx`;
  const module = blogModules[path];
  return module?.default || null;
}

/**
 * Get all unique tags from blog posts
 * @returns Array of unique tags
 */
export function getAllTags(): string[] {
  const posts = getAllBlogPosts();
  const tagsSet = new Set<string>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => tagsSet.add(tag));
  });

  return Array.from(tagsSet).sort();
}

/**
 * Get blog posts by tag
 * @param tag - The tag to filter by
 * @returns Array of blog posts with the specified tag
 */
export function getBlogPostsByTag(tag: string): BlogPost[] {
  const posts = getAllBlogPosts();
  return posts.filter((post) => post.tags.includes(tag));
}

/**
 * Get related posts based on shared tags
 * @param currentSlug - The current post slug to exclude
 * @param tags - Tags to match against
 * @param limit - Maximum number of related posts to return
 * @returns Array of related blog posts
 */
export function getRelatedPosts(
  currentSlug: string,
  tags: string[],
  limit = 3
): BlogPost[] {
  const posts = getAllBlogPosts();

  // Score posts by number of shared tags
  const scoredPosts = posts
    .filter((post) => post.slug !== currentSlug)
    .map((post) => ({
      post,
      score: post.tags.filter((tag) => tags.includes(tag)).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  return scoredPosts.slice(0, limit).map(({ post }) => post);
}
