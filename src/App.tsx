import { lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Navigation } from './components/Navigation/Navigation';
import { Footer } from './components/Footer/Footer';
import { Home } from './pages/Home';
import { useScrollToTop } from './hooks/useScrollToTop';
import { useReducedMotion } from './hooks/useReducedMotion';

const CaseStudy = lazy(() => import('./pages/CaseStudy').then((m) => ({ default: m.CaseStudy })));
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })));

function App() {
  useScrollToTop();
  const location = useLocation();
  const prefersReduced = useReducedMotion();

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Navigation />
      <main id="main-content">
        <Suspense fallback={null}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location.pathname}
              initial={prefersReduced ? undefined : { opacity: 0 }}
              animate={prefersReduced ? undefined : { opacity: 1 }}
              exit={prefersReduced ? undefined : { opacity: 0 }}
              transition={{ duration: 0.18, ease: 'easeInOut' }}
            >
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/projects/:slug" element={<CaseStudy />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default App;
