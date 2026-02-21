import React, { useState, useCallback, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import DSKIntro from './components/DSKIntro';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PremiumEffects from './components/PremiumEffects';
import CustomCursor from './components/CustomCursor';
import { portfolioData } from './data/portfolioData';

// Lazy loading non-critical sections to reduce initial bundle size
const Projects = lazy(() => import('./components/Projects'));
const Experience = lazy(() => import('./components/Experience'));
const Skills = lazy(() => import('./components/Skills'));
const Education = lazy(() => import('./components/Education'));
const Blog = lazy(() => import('./components/Blog'));
const Contact = lazy(() => import('./components/Contact'));

// Loading Placeholder for Suspense
const SectionPlaceholder = () => <div style={{ minHeight: '50vh', background: 'transparent' }} />;

const AppContent = () => {
    const { theme } = useTheme();

    return (
        <div className="App" style={{ backgroundColor: theme.primaryBg, minHeight: '100vh', transition: 'background-color 0.4s ease' }}>
            <CustomCursor />
            <PremiumEffects />
            <Navbar />
            <Hero data={portfolioData.personalInfo} />

            <Suspense fallback={<SectionPlaceholder />}>
                <Projects data={portfolioData.projects} />
            </Suspense>
            <Suspense fallback={<SectionPlaceholder />}>
                <Experience data={portfolioData.experience} />
            </Suspense>
            <Suspense fallback={<SectionPlaceholder />}>
                <Skills data={portfolioData.skills} />
            </Suspense>
            <Suspense fallback={<SectionPlaceholder />}>
                <Education data={portfolioData.education} />
            </Suspense>
            <Suspense fallback={<SectionPlaceholder />}>
                <Blog data={portfolioData.blogs} />
            </Suspense>
            <Suspense fallback={<SectionPlaceholder />}>
                <Contact data={portfolioData.personalInfo} />
            </Suspense>

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
