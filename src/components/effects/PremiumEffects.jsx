import React from 'react';
import { useBreakpoint, shouldReduceAnimations } from '../../hooks/useBreakpoint';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

/**
 * PremiumEffects: Adds cinematic overlays and global UX enhancements.
 * 1. Cinematic Grain Overlay (Netflix-style texture)
 * 2. Dynamic Scroll Progress Line
 */
const PremiumEffects = () => {
    const { theme } = useTheme();
    const { scrollYProgress } = useScroll();
    const { isMobile } = useBreakpoint();

    // Smooth out the scroll progress
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <>
            {/* 1. Dynamic Scroll Progress Line */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: theme.accent,
                    transformOrigin: '0%',
                    scaleX,
                    zIndex: 2000,
                    boxShadow: `0 0 10px ${theme.accent}, 0 0 5px ${theme.accent}`,
                    willChange: 'transform'
                }}
            />

            {/* 2. Lightweight static texture overlay.
                 Replaced the previous SVG noise filter because feTurbulence can trigger
                 severe paint/composite cost and visible frame hitching on weaker systems.
                 This keeps a subtle premium texture without the expensive raster cost. */}
            {!shouldReduceAnimations && !isMobile && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        pointerEvents: 'none',
                        zIndex: 9998,
                        opacity: theme.mode === 'dark' ? 0.035 : 0.02,
                        mixBlendMode: 'overlay',
                        backgroundImage:
                            'radial-gradient(rgba(255,255,255,0.1) 0.8px, transparent 0.8px), radial-gradient(rgba(255,255,255,0.05) 0.8px, transparent 0.8px)',
                        backgroundSize: '18px 18px, 26px 26px',
                        backgroundPosition: '0 0, 9px 9px',
                    }}
                />
            )}
        </>
    );
};

export default PremiumEffects;
