import React, { useState, useCallback, Suspense, lazy, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import ErrorBoundary from '../components/layout/ErrorBoundary';
import DSKIntro from '../components/effects/DSKIntro';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/sections/Hero';
import { portfolioData } from '../data/portfolioData';
import { useWebVitals } from '../hooks/useWebVitals';

// Lazy load heavy effect components to reduce initial bundle and improve FCP
const PremiumEffects = lazy(() => import('../components/effects/PremiumEffects'));
const SpaceAtmosphere = lazy(() => import('../components/effects/SpaceAtmosphere'));
const CustomCursor = lazy(() => import('../components/effects/CustomCursor'));

// Lazy loading non-critical sections to reduce initial bundle size
const Projects = lazy(() => import('../components/sections/Projects'));
const Experience = lazy(() => import('../components/sections/Experience'));
const Skills = lazy(() => import('../components/sections/Skills'));
const Education = lazy(() => import('../components/sections/Education'));
const Blog = lazy(() => import('../components/sections/Blog'));
const Contact = lazy(() => import('../components/sections/Contact'));

import SectionSkeleton from '../components/common/SectionSkeleton';
import ScrollToTop from '../components/layout/ScrollToTop';

const AppContent = () => {
    const { theme } = useTheme();

    return (
        <div className="App" style={{ 
            backgroundColor: theme.mode === 'dark' ? 'transparent' : theme.primaryBg, 
            minHeight: '100vh', 
            transition: 'background-color 0.4s ease' 
        }}>
            {/* Lazy-loaded effect components render when dependencies load */}
            <Suspense fallback={null}>
                <SpaceAtmosphere />
            </Suspense>
            <Suspense fallback={null}>
                <CustomCursor />
            </Suspense>
            <Suspense fallback={null}>
                <PremiumEffects />
            </Suspense>
            
            <Navbar />
            <Hero data={portfolioData.personalInfo} />

            <Suspense fallback={<SectionSkeleton />}>
                <Skills data={portfolioData.skills} />
            </Suspense>
            <Suspense fallback={<SectionSkeleton />}>
                <Experience data={portfolioData.experience} />
            </Suspense>
            <Suspense fallback={<SectionSkeleton />}>
                <Projects data={portfolioData.projects} />
            </Suspense>
            <Suspense fallback={<SectionSkeleton />}>
                <Blog data={portfolioData.blogs} />
            </Suspense>
            <Suspense fallback={<SectionSkeleton />}>
                <Education data={portfolioData.education} />
            </Suspense>
            <Suspense fallback={<SectionSkeleton />}>
                <Contact data={portfolioData.personalInfo} />
            </Suspense>

            <ScrollToTop />

            <footer style={{
                textAlign: 'center',
                padding: '40px',
                borderTop: `1px solid ${theme.border}`,
                color: theme.mutedText,
                fontSize: '0.9rem',
                background: 'transparent'
            }}>
                <p>© {new Date().getFullYear()} Deep Sagar Karay. All rights reserved.</p>
            </footer>
        </div>
    );
};

function App() {
    const [showIntro, setShowIntro] = useState(true);
    const handleIntroComplete = useCallback(() => setShowIntro(false), []);

    // Monitor Web Vitals for performance debugging
    useEffect(() => {
        useWebVitals((metric) => {
            // Log metrics for debugging (only in development)
            if (process.env.NODE_ENV === 'development') {
                console.log(`${metric.name}: ${metric.value}ms (${metric.rating})`);
            }
        });
    }, []);

    return (
        <ErrorBoundary>
            <ThemeProvider>
                <AnimatePresence mode="wait">
                    {showIntro ? (
                        <DSKIntro key="intro" onComplete={handleIntroComplete} />
                    ) : (
                        <motion.div
                            key="main-app"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                        >
                            <AppContent />
                        </motion.div>
                    )}
                </AnimatePresence>
            </ThemeProvider>
        </ErrorBoundary>
    );
}

export default App;
