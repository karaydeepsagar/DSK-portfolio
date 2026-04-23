import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { prefersReducedMotion } from '../../hooks/useBreakpoint';

const DSKIntro = ({ onComplete }) => {
    const { theme } = useTheme();
    const [phase, setPhase] = useState('init');
    const [isDesktop, setIsDesktop] = useState(() => typeof window !== 'undefined' && window.innerWidth > 1024);

    // Determine animation reduction eagerly — only respect prefer-reduced-motion.
    const reduceAnim = prefersReducedMotion;

    useEffect(() => {
        // Handle window resize to update desktop state
        const handleResize = () => {
            setIsDesktop(window.innerWidth > 1024);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        // Sequence:
        // 0.5s: Triangles start flying in
        // 2.0s: Text Reveal
        // 4.0s: Finish
        const t1 = setTimeout(() => setPhase('triangles'), 500);
        const t2 = setTimeout(() => setPhase('text'), 2000);
        const t3 = setTimeout(() => onComplete(), 4000);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, [onComplete]);

    // Generate random triangles across all 4 corners with uniform density
    const particles = useMemo(() => {
        const count = prefersReducedMotion ? 30 : (isDesktop ? 320 : 200);
        const result = [];
        let id = 0;

        // Helper: Create particles for a sector
        const addSector = (amount, minL, maxL, minT, maxT, ox, oy) => {
            for (let i = 0; i < amount; i++) {
                result.push({
                    id: id++,
                    leftPercent: minL + Math.random() * (maxL - minL),
                    topPercent: minT + Math.random() * (maxT - minT),
                    offsetX: ox,
                    offsetY: oy,
                    size: Math.random() * 30 + 12,
                    rotation: Math.random() * 360,
                    color: [theme.accent || '#b91c1c', '#d0d0d0', '#808080'][Math.floor(Math.random() * 3)],
                    delay: Math.random() * 0.8,
                    floatDuration: 2.5 + Math.random() * 1.5,
                    rotateDuration: 3.5 + Math.random() * 2.5
                });
            }
        };

        if (isDesktop) {
            // Uniform distribution across all 4 corners
            addSector(35, 0, 32, 0, 32, -400, -400);      // Top Left
            addSector(35, 68, 100, 0, 32, 400, -400);     // Top Right
            addSector(35, 0, 32, 68, 100, -400, 400);     // Bottom Left
            addSector(35, 68, 100, 68, 100, 400, 400);    // Bottom Right
            addSector(100, 5, 95, 0, 28, 0, -400);        // Top Middle
            addSector(80, 5, 95, 72, 100, 0, 400);        // Bottom Middle
        } else {
            // Mobile: equal distribution
            addSector(25, 0, 32, 0, 32, -400, -400);
            addSector(25, 68, 100, 0, 32, 400, -400);
            addSector(25, 0, 32, 68, 100, -400, 400);
            addSector(25, 68, 100, 68, 100, 400, 400);
            addSector(40, 10, 90, 0, 30, 0, -400);
            addSector(60, 10, 90, 70, 100, 0, 400);
        }

        return result;
    }, [theme.accent, prefersReducedMotion, isDesktop]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                background: theme.primaryBg,
                backgroundImage: `radial-gradient(circle at center, ${theme.primaryBg} 0%, ${theme.secondaryBg || '#f5f5f5'} 100%)`,
                overflow: 'hidden',
                // CSS containment: limits font-swap reflows and paint invalidations
                // to this element only, preventing them from bubbling to the whole page.
                contain: 'layout style paint',
                // Force GPU compositing layer for the entire intro overlay so all
                // child transforms stay on the GPU thread.
                transform: 'translateZ(0)',
                willChange: 'opacity'
            }}
        >
            {/* 1. Scattered Triangle Particles from 4 Corners */}
            {(phase === 'triangles' || phase === 'text') && particles.map((p) => (
                <motion.div
                    key={p.id}
                    initial={{ 
                        x: p.offsetX, 
                        y: p.offsetY, 
                        opacity: 0, 
                        scale: 0
                    }}
                    animate={{ 
                        x: 0, 
                        y: 0, 
                        opacity: 1, 
                        scale: 1,
                        rotate: p.rotation 
                    }}
                    transition={{ 
                        duration: 1.2, 
                        delay: p.delay, 
                        ease: "backOut" 
                    }}
                    style={{
                        position: 'fixed',
                        left: `${p.leftPercent}%`,
                        top: `${p.topPercent}%`,
                        transform: 'translate(-50%, -50%)',
                        zIndex: 1,
                        willChange: 'transform'
                    }}
                >
                    {/* Inner interactive triangle */}
                    <motion.div
                        whileHover={reduceAnim ? undefined : { 
                            scale: 1.2, 
                            rotate: p.rotation + 45, 
                            zIndex: 10
                        }}
                        animate={reduceAnim ? undefined : {
                            y: [0, -10, 0],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={reduceAnim ? undefined : {
                            // Durations baked into particle data to avoid random() in hot render path
                            y: { duration: p.floatDuration, repeat: Infinity, ease: "easeInOut" },
                            rotate: { duration: p.rotateDuration, repeat: Infinity, ease: "easeInOut" }
                        }}
                        style={{
                            width: 0,
                            height: 0,
                            borderLeft: `${p.size/2}px solid transparent`,
                            borderRight: `${p.size/2}px solid transparent`,
                            borderBottom: `${p.size}px solid ${p.color}`,
                            // drop-shadow forces a per-element GPU texture upload;
                            // skip entirely on mobile to halve compositor layer count.
                            filter: reduceAnim ? 'none' : 'drop-shadow(0 4px 6px rgba(0,0,0,0.15))',
                            cursor: 'pointer',
                            opacity: 0.9
                        }}
                    />
                </motion.div>
            ))}

            {/* 2. Center Text Reveal - ABSOLUTE MIDDLE */}
            <AnimatePresence>
                {phase === 'text' && (
                    <motion.div
                        key="intro-text"
                        // Animation: Scale Up + Fade In (clean/minimal)
                        initial={{ opacity: 0, scale: 0.8, y: 20, x: '-50%' }}
                        animate={{ opacity: 1, scale: 1, y: '-50%', x: '-50%' }}
                        exit={{ opacity: 0, scale: 1.1, filter: 'blur(5px)' }}
                        transition={{ duration: 0.8, ease: "circOut" }}
                        style={{ 
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 20, 
                            textAlign: 'center',
                            width: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {/* Radial Glow behind text for separation */}
                        <div style={{
                            position: 'absolute',
                            inset: '-50px',
                            background: `radial-gradient(circle closest-side, ${theme.primaryBg} 0%, transparent 100%)`,
                            zIndex: -1,
                            opacity: 0.8,
                            filter: 'blur(20px)'
                        }} />

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '15px',
                            flexWrap: 'wrap',
                            whiteSpace: 'nowrap'
                        }}>
                             <h1 style={{
                                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                                fontWeight: '900',
                                color: theme.primaryText,
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                margin: 0,
                                textShadow: `0 0 30px ${theme.glow}`
                            }}>
                                DSK 
                            </h1>
                            <h1 style={{
                                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                                fontWeight: '300',
                                color: theme.accent || '#e11d48',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                margin: 0,
                                textShadow: `0 0 30px ${theme.accent}44`
                            }}>
                                PORTFOLIO
                            </h1>
                        </div>
                        
                        {/* Decorative line under text */}
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                            style={{ 
                                height: '2px', 
                                background: theme.accent || '#b91c1c', 
                                marginTop: '10px',
                                borderRadius: '2px'
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};


export default DSKIntro;
