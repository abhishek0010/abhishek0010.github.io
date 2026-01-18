import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-terminal-bg-light dark:bg-terminal-bg">
      {/* Subtle grid pattern overlay */}
      <div className="fixed inset-0 bg-dots pointer-events-none" aria-hidden="true" />

      {/* Content wrapper */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
