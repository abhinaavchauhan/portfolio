import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Loader from './components/Loader';
import Background from './components/Background';
import CustomCursor from './components/CustomCursor';

function App() {
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = ['About', 'Skills', 'Projects', 'Experience', 'Contact'];

  useEffect(() => {
    // Initialize smooth scrolling with Lenis setup
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      if (!loading) lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [loading]);

  return (
    <>
      <CustomCursor />
      <Background />
      
      <AnimatePresence mode="wait">
        {loading && <Loader setLoading={setLoading} />}
      </AnimatePresence>

      {!loading && (
        <div className="bg-transparent min-h-screen text-gray-200 selection:bg-accent1 selection:text-black relative z-10 transition-colors duration-500">
          <nav className="fixed top-0 left-0 w-full z-40 bg-background/80 backdrop-blur-md border-b border-white/5 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
              <a href="#" className="text-2xl font-display font-bold text-white tracking-tighter hover:scale-105 transition-transform duration-300 relative group">
                AC<span className="text-accent1 relative z-10 group-hover:text-accent2 transition-colors duration-300">.</span>
                <div className="absolute inset-0 bg-accent1 opacity-0 group-hover:opacity-10 blur-lg transition-opacity duration-300" />
              </a>

              <div className="flex items-center gap-6">
                <div className="md:flex gap-8 text-sm font-medium hidden">
                  {navItems.map((item) => (
                    <a 
                      key={item} 
                      href={`#${item.toLowerCase()}`}
                      className="text-gray-400 hover:text-white transition-colors duration-300 relative group"
                    >
                      {item}
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent1 transition-all duration-300 group-hover:w-full" />
                    </a>
                  ))}
                </div>

                {/* Mobile Hamburger Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden p-2 text-gray-300 hover:text-white focus:outline-none transition-colors rounded-lg border border-white/10 bg-white/5 hover:bg-white/10"
                  aria-label="Toggle mobile navigation menu"
                >
                  {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
              </div>
            </div>

            {/* Mobile Dropdown Menu */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="md:hidden overflow-hidden bg-background/95 backdrop-blur-xl border-b border-white/10 px-6 py-4"
                >
                  <div className="flex flex-col gap-3">
                    {navItems.map((item) => (
                      <a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-gray-300 hover:text-accent1 font-medium text-base py-2 px-3 rounded-lg hover:bg-white/5 transition-all duration-200"
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>

          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Contact />
          </main>
        </div>
      )}
    </>
  );
}

export default App;
