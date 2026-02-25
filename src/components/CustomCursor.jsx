import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const INTERACTIVE = 'a, button, input, textarea, select, label, [role="button"], [tabindex], .netflix-btn';

const CustomCursor = () => {
    const { theme } = useTheme();
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    // Ref tracks visibility inside event-handler closures to avoid the stale-closure
    // bug where isVisible is always `false` inside onMove, causing setIsVisible(true)
    // to fire on every single mousemove event and trigger continuous re-renders.
    const isVisibleRef = useRef(false);

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
            // Use ref so we read current value without adding isVisible to deps,
            // preventing this handler from being recreated on every render.
            if (!isVisibleRef.current) {
                isVisibleRef.current = true;
                setIsVisible(true);
            }
        };

        const onOver = (e) => {
            if (e.target.closest(INTERACTIVE)) setIsHovering(true);
        };
        const onOut = (e) => {
            if (e.target.closest(INTERACTIVE)) setIsHovering(false);
        };

        const onDown = () => setIsClicking(true);
        const onUp = () => setIsClicking(false);
        const onLeave = () => { isVisibleRef.current = false; setIsVisible(false); };
        const onEnter = () => { isVisibleRef.current = true; setIsVisible(true); };

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

    const accent = theme.accent; // #D10000 — ring colour
    const dotColor = theme.mode === 'dark' ? '#FFFFFF' : '#000000';

    return (
        <>
            {/* Outer dot — light transparent red, laggy spring follower */}
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
                    width: isHovering ? '36px' : '22px',
                    height: isHovering ? '36px' : '22px',
                    borderRadius: '50%',
                    background: isHovering ? `${accent}30` : `${accent}22`,
                    border: 'none',
                    opacity: isVisible ? 1 : 0,
                    transition: 'width 0.25s ease, height 0.25s ease, background 0.25s ease, opacity 0.3s ease',
                }}
                animate={{ scale: isClicking ? 0.75 : 1 }}
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
                    background: dotColor,
                    opacity: isVisible ? (isHovering ? 0 : 1) : 0,
                    transition: 'opacity 0.2s ease',
                    boxShadow: `0 0 8px #ffffff99`,
                }}
                animate={{ scale: isClicking ? 0.6 : 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            />
        </>
    );
};

export default CustomCursor;
