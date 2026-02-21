import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const INTERACTIVE = 'a, button, input, textarea, select, label, [role="button"], [tabindex], .netflix-btn';

const CustomCursor = () => {
    const { theme } = useTheme();
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Raw mouse position — dot follows this instantly
    const rawX = useMotionValue(-100);
    const rawY = useMotionValue(-100);

    // Ring follows with spring lag
    const springCfg = { stiffness: 160, damping: 22, mass: 0.6 };
    const ringX = useSpring(rawX, springCfg);
    const ringY = useSpring(rawY, springCfg);

    useEffect(() => {
        // Only enable on pointer devices (not touch-only)
        if (window.matchMedia('(pointer: coarse)').matches) return;

        const onMove = (e) => {
            rawX.set(e.clientX);
            rawY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const onOver = (e) => {
            if (e.target.closest(INTERACTIVE)) setIsHovering(true);
        };
        const onOut = (e) => {
            if (e.target.closest(INTERACTIVE)) setIsHovering(false);
        };

        const onDown = () => setIsClicking(true);
        const onUp = () => setIsClicking(false);
        const onLeave = () => setIsVisible(false);
        const onEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseover', onOver);
        window.addEventListener('mouseout', onOut);
        window.addEventListener('mousedown', onDown);
        window.addEventListener('mouseup', onUp);
        document.documentElement.addEventListener('mouseleave', onLeave);
        document.documentElement.addEventListener('mouseenter', onEnter);

        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseover', onOver);
            window.removeEventListener('mouseout', onOut);
            window.removeEventListener('mousedown', onDown);
            window.removeEventListener('mouseup', onUp);
            document.documentElement.removeEventListener('mouseleave', onLeave);
            document.documentElement.removeEventListener('mouseenter', onEnter);
        };
    }, []);

    // Don't render on touch devices
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null;

    const accent = theme.accent; // #D10000

    return (
        <>
            {/* Outer ring — laggy spring follower */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    x: ringX,
                    y: ringY,
                    translateX: '-50%',
                    translateY: '-50%',
                    pointerEvents: 'none',
                    zIndex: 99999,
                    width: isHovering ? '46px' : '32px',
                    height: isHovering ? '46px' : '32px',
                    borderRadius: '50%',
                    border: `1.5px solid ${accent}`,
                    background: isHovering ? `${accent}18` : 'transparent',
                    opacity: isVisible ? 1 : 0,
                    transition: 'width 0.25s ease, height 0.25s ease, background 0.25s ease, opacity 0.3s ease',
                    mixBlendMode: theme.mode === 'dark' ? 'normal' : 'multiply',
                    scale: isClicking ? 0.82 : 1,
                }}
                animate={{ scale: isClicking ? 0.82 : 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            />

            {/* Inner dot — instant follower */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    x: rawX,
                    y: rawY,
                    translateX: '-50%',
                    translateY: '-50%',
                    pointerEvents: 'none',
                    zIndex: 99999,
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: accent,
                    opacity: isVisible ? (isHovering ? 0 : 1) : 0,
                    transition: 'opacity 0.2s ease',
                    boxShadow: `0 0 8px ${accent}99`,
                }}
                animate={{ scale: isClicking ? 0.6 : 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            />
        </>
    );
};

export default CustomCursor;
