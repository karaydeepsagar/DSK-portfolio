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

    const accent = theme.accent; // #D10000
    // Ring adapts to theme: crisp white on dark, charcoal on light — always legible
    const ringColor = theme.mode === 'dark' ? 'rgba(255,255,255,0.55)' : 'rgba(30,30,30,0.45)';
    const ringColorHover = accent;

    return (
        <>
            {/*
             * PRECISION CROSSHAIR CURSOR
             * ─────────────────────────────────────────────────────────────────
             * Layer 1 — Adaptive ring (spring lag)
             *   · 30px thin 1.5px ring, white/charcoal to match theme
             *   · Hover: expands to 42px, turns accent-red
             *   · Click: snaps inward (scale 0.7)
             *   Works in both dark & light mode — no blur needed, pure GPU transform
             *
             * Layer 2 — Red dot (instant, exact position)
             *   · Solid 5px accent-red circle — always on top
             *   · Click: snaps to 3px
             * ─────────────────────────────────────────────────────────────────
             */}

            {/* Layer 1: Adaptive ring — spring follower */}
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
                    zIndex: 99998,
                    width: isHovering ? '42px' : '30px',
                    height: isHovering ? '42px' : '30px',
                    borderRadius: '50%',
                    border: `1.5px solid ${isHovering ? ringColorHover : ringColor}`,
                    background: isHovering ? `${accent}15` : 'transparent',
                    opacity: isVisible ? 1 : 0,
                    transition:
                        'width 0.22s cubic-bezier(0.34,1.56,0.64,1), ' +
                        'height 0.22s cubic-bezier(0.34,1.56,0.64,1), ' +
                        'border-color 0.2s ease, ' +
                        'background 0.2s ease, ' +
                        'opacity 0.25s ease',
                    willChange: 'transform',
                }}
                animate={{ scale: isClicking ? 0.7 : 1 }}
                transition={{ type: 'spring', stiffness: 450, damping: 24 }}
            />

            {/* Layer 2: Accent dot — exact, zero-lag, always on top */}
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
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    background: accent,
                    opacity: isVisible ? 1 : 0,
                    transition: 'opacity 0.2s ease',
                    willChange: 'transform',
                }}
                animate={{ scale: isClicking ? 0.5 : 1 }}
                transition={{ type: 'spring', stiffness: 700, damping: 30 }}
            />
        </>
    );
};

export default CustomCursor;
