import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, Layout } from '@/components/layout';
import NotFound from '@/pages/NotFound';

// Lazy load page components for code splitting
const Home = React.lazy(() => import('@/pages/Home'));
const About = React.lazy(() => import('@/pages/About'));
const Blog = React.lazy(() => import('@/pages/Blog'));
const BlogPost = React.lazy(() => import('@/pages/BlogPost'));
const Projects = React.lazy(() => import('@/pages/Projects'));
const Lists = React.lazy(() => import('@/pages/Lists'));
const ListDetail = React.lazy(() => import('@/pages/ListDetail'));

// Loading fallback component
function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Layout>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/lists" element={<Lists />} />
              <Route path="/lists/:category" element={<ListDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
}
