import { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';

// Type definitions for MDX components
type HeadingProps = ComponentPropsWithoutRef<'h1'>;
type ParagraphProps = ComponentPropsWithoutRef<'p'>;
type AnchorProps = ComponentPropsWithoutRef<'a'>;
type CodeProps = ComponentPropsWithoutRef<'code'>;
type PreProps = ComponentPropsWithoutRef<'pre'>;
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>;
type ListProps = ComponentPropsWithoutRef<'ul'>;
type ListItemProps = ComponentPropsWithoutRef<'li'>;

// Heading Components
function H1({ className, children, ...props }: HeadingProps) {
  return (
    <h1
      className={cn(
        'scroll-m-20 text-3xl font-bold tracking-tight text-gray-900 dark:text-white mt-8 mb-4 first:mt-0 font-mono',
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

function H2({ className, children, ...props }: HeadingProps) {
  return (
    <h2
      className={cn(
        'scroll-m-20 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white mt-10 mb-4 border-b border-gray-200 dark:border-terminal-border pb-2 font-mono',
        className
      )}
      {...props}
    >
      <span className="text-accent">#</span> {children}
    </h2>
  );
}

function H3({ className, children, ...props }: HeadingProps) {
  return (
    <h3
      className={cn(
        'scroll-m-20 text-xl font-semibold tracking-tight text-gray-900 dark:text-white mt-8 mb-4 font-mono',
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

function H4({ className, children, ...props }: HeadingProps) {
  return (
    <h4
      className={cn(
        'scroll-m-20 text-lg font-semibold tracking-tight text-gray-900 dark:text-white mt-6 mb-3',
        className
      )}
      {...props}
    >
      {children}
    </h4>
  );
}

// Paragraph
function P({ className, children, ...props }: ParagraphProps) {
  return (
    <p
      className={cn(
        'leading-7 text-gray-700 dark:text-gray-300 mb-4 [&:not(:first-child)]:mt-4',
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

// Anchor/Link
function A({ className, href, children, ...props }: AnchorProps) {
  const isExternal = href?.startsWith('http');

  return (
    <a
      href={href}
      className={cn(
        'font-medium text-accent hover:text-accent-light underline underline-offset-4 transition-colors',
        className
      )}
      {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
      {...props}
    >
      {children}
    </a>
  );
}

// Inline Code
function Code({ className, children, ...props }: CodeProps) {
  // Check if this is inside a <pre> tag (code block vs inline code)
  const isInlineCode = !className?.includes('hljs');

  if (isInlineCode) {
    return (
      <code
        className={cn(
          'relative rounded-sharp bg-gray-100 dark:bg-terminal-surface px-[0.4rem] py-[0.2rem] font-mono text-sm text-accent',
          className
        )}
        {...props}
      >
        {children}
      </code>
    );
  }

  return (
    <code className={cn('font-mono text-sm', className)} {...props}>
      {children}
    </code>
  );
}

// Code Block (Pre)
function Pre({ className, children, ...props }: PreProps) {
  return (
    <pre
      className={cn(
        'mb-4 mt-6 overflow-x-auto rounded-sharp bg-terminal-bg p-4 border border-terminal-border',
        className
      )}
      {...props}
    >
      {children}
    </pre>
  );
}

// Blockquote
function Blockquote({ className, children, ...props }: BlockquoteProps) {
  return (
    <blockquote
      className={cn(
        'mt-6 border-l-4 border-accent pl-6 italic text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-terminal-surface/50 py-4 pr-4 rounded-r-sharp',
        className
      )}
      {...props}
    >
      {children}
    </blockquote>
  );
}

// Unordered List
function Ul({ className, children, ...props }: ListProps) {
  return (
    <ul
      className={cn(
        'my-6 ml-6 list-disc text-gray-700 dark:text-gray-300 [&>li]:mt-2 marker:text-accent',
        className
      )}
      {...props}
    >
      {children}
    </ul>
  );
}

// Ordered List
function Ol({ className, children, ...props }: ComponentPropsWithoutRef<'ol'>) {
  return (
    <ol
      className={cn(
        'my-6 ml-6 list-decimal text-gray-700 dark:text-gray-300 [&>li]:mt-2 marker:text-accent',
        className
      )}
      {...props}
    >
      {children}
    </ol>
  );
}

// List Item
function Li({ className, children, ...props }: ListItemProps) {
  return (
    <li
      className={cn('leading-7', className)}
      {...props}
    >
      {children}
    </li>
  );
}

// Horizontal Rule
function Hr({ className, ...props }: ComponentPropsWithoutRef<'hr'>) {
  return (
    <hr
      className={cn('my-8 border-gray-200 dark:border-terminal-border', className)}
      {...props}
    />
  );
}

// Strong/Bold
function Strong({ className, children, ...props }: ComponentPropsWithoutRef<'strong'>) {
  return (
    <strong
      className={cn('font-bold text-gray-900 dark:text-white', className)}
      {...props}
    >
      {children}
    </strong>
  );
}

// Emphasis/Italic
function Em({ className, children, ...props }: ComponentPropsWithoutRef<'em'>) {
  return (
    <em
      className={cn('italic', className)}
      {...props}
    >
      {children}
    </em>
  );
}

// Table components
function Table({ className, children, ...props }: ComponentPropsWithoutRef<'table'>) {
  return (
    <div className="my-6 w-full overflow-y-auto">
      <table
        className={cn('w-full border-collapse text-sm', className)}
        {...props}
      >
        {children}
      </table>
    </div>
  );
}

function Th({ className, children, ...props }: ComponentPropsWithoutRef<'th'>) {
  return (
    <th
      className={cn(
        'border border-gray-200 dark:border-terminal-border px-4 py-2 text-left font-bold font-mono bg-gray-50 dark:bg-terminal-surface text-gray-900 dark:text-white',
        className
      )}
      {...props}
    >
      {children}
    </th>
  );
}

function Td({ className, children, ...props }: ComponentPropsWithoutRef<'td'>) {
  return (
    <td
      className={cn(
        'border border-gray-200 dark:border-terminal-border px-4 py-2 text-gray-700 dark:text-gray-300',
        className
      )}
      {...props}
    >
      {children}
    </td>
  );
}

// Image
function Img({ className, alt, ...props }: ComponentPropsWithoutRef<'img'>) {
  return (
    <img
      className={cn('rounded-sharp border border-gray-200 dark:border-terminal-border my-6', className)}
      alt={alt}
      {...props}
    />
  );
}

// Export all components as an object for MDXProvider
export const MDXComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  p: P,
  a: A,
  code: Code,
  pre: Pre,
  blockquote: Blockquote,
  ul: Ul,
  ol: Ol,
  li: Li,
  hr: Hr,
  strong: Strong,
  em: Em,
  table: Table,
  th: Th,
  td: Td,
  img: Img,
};

// Also export individual components for direct use
export {
  H1,
  H2,
  H3,
  H4,
  P,
  A,
  Code,
  Pre,
  Blockquote,
  Ul,
  Ol,
  Li,
  Hr,
  Strong,
  Em,
  Table,
  Th,
  Td,
  Img,
};
