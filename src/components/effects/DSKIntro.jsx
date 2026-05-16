import React, { useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

/**
 * DSKIntro: DSK Portfolio Text Animation
 */

// Animation constants
const DURATION = {
    exit: 5500,
    exitTransition: 0.8,
    letter: 0.6,
    stagger: 0.08,
    portfolio: 0.8,
    scan: 1.8,
    scanDelay: 0.8,
    underline: 1.2,
    underlineDelay: 1.2,
    subtitle: 1,
    subtitleDelay: 1.0,
    glow: 3,
    ring: 3
};

const EASING = {
    spring: [0.34, 1.56, 0.64, 1],
    easeInOut: 'easeInOut',
    easeOut: 'easeOut',
    circOut: 'circOut'
};

const RING_CONFIG = [
    { delay: 0 },
    { delay: 0.8 },
    { delay: 1.6 }
];

const DSK_LETTERS = ['D', 'S', 'K'];

const DSKIntro = ({ onComplete }) => {
    const { theme } = useTheme();
    const onCompleteRef = useRef(onComplete);

    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    // Pre-compute theme-dependent colors
    const accentColors = useMemo(() => ({
        glow: `${theme.accent}22`,
        ring: `${theme.accent}44`,
        bar: `${theme.accent}66`,
        underline: theme.accent,
        shadow: `${theme.accent}44`
    }), [theme.accent]);

    // Static container styles
    const containerStyle = useMemo(() => ({
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    }), []);

    const backgroundStyle = useMemo(() => ({
        background: theme.primaryBg
    }), [theme.primaryBg]);

    const glowAnimation = useMemo(() => ({
        scale: [1, 1.3, 1],
        opacity: [0.3, 0.5, 0.3]
    }), []);

    const glowTransition = useMemo(() => ({
        duration: DURATION.glow,
        repeat: Infinity,
        ease: EASING.easeInOut
    }), []);

    const ringAnimation = useMemo(() => ({
        scale: [0.4, 2.2],
        opacity: [0, 0.15, 0]
    }), []);

    const textColor = useMemo(() => theme.primaryText, [theme.primaryText]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (onCompleteRef.current) {
                onCompleteRef.current();
            }
        }, DURATION.exit);
        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{
                opacity: 0,
                scale: 1.02,
                filter: 'blur(10px)',
                transition: { duration: DURATION.exitTransition, ease: EASING.easeInOut }
            }}
            style={{ ...containerStyle, ...backgroundStyle }}
        >
            {/* Background Glow */}
            <motion.div
                animate={glowAnimation}
                transition={glowTransition}
                style={{
                    position: 'absolute',
                    width: '400px',
                    height: '400px',
                    background: `radial-gradient(circle, ${accentColors.glow} 0%, transparent 70%)`,
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 1
                }}
            />

            {/* Concentric Rings */}
            {RING_CONFIG.map((config, i) => (
                <motion.div
                    key={`ring-${i}`}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={ringAnimation}
                    transition={{
                        duration: DURATION.ring,
                        repeat: Infinity,
                        delay: config.delay,
                        ease: EASING.easeOut
                    }}
                    style={{
                        position: 'absolute',
                        width: '500px',
                        height: '500px',
                        border: `1px solid ${accentColors.ring}`,
                        borderRadius: '50%',
                        zIndex: 1,
                        pointerEvents: 'none'
                    }}
                />
            ))}

            {/* Main Text */}
            <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
                <div style={{ position: 'relative', overflow: 'hidden', padding: '10px 20px' }}>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 'clamp(10px, 3vw, 25px)',
                        }}
                    >
                        {/* DSK - Letter Stagger with Spring */}
                        <div style={{ display: 'flex', gap: '2px' }}>
                            {DSK_LETTERS.map((letter, i) => (
                                <motion.span
                                    key={`letter-${i}`}
                                    initial={{ opacity: 0, y: 40, scale: 0.8 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{
                                        duration: DURATION.letter,
                                        delay: i * DURATION.stagger,
                                        ease: EASING.spring
                                    }}
                                    style={{
                                        fontSize: 'clamp(2rem, 11vw, 7rem)',
                                        fontWeight: '900',
                                        color: textColor,
                                        margin: 0,
                                        letterSpacing: '0.15em',
                                        textTransform: 'uppercase',
                                        display: 'inline-block'
                                    }}
                                >
                                    {letter}
                                </motion.span>
                            ))}
                        </div>

                        {/* PORTFOLIO */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                                duration: DURATION.portfolio,
                                delay: 0.5,
                                ease: EASING.spring
                            }}
                            style={{
                                fontSize: 'clamp(2rem, 11vw, 7rem)',
                                fontWeight: '300',
                                color: theme.accent,
                                margin: 0,
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase'
                            }}
                        >
                            PORTFOLIO
                        </motion.h1>
                    </div>

                    {/* Scanning Light Bar */}
                    <motion.div
                        initial={{ left: '-150%' }}
                        animate={{ left: '250%' }}
                        transition={{ duration: DURATION.scan, delay: DURATION.scanDelay, ease: EASING.easeInOut }}
                        style={{
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            width: '50%',
                            background: `linear-gradient(90deg, transparent, ${accentColors.bar}, transparent)`,
                            transform: 'skewX(-25deg)',
                            zIndex: 11,
                            pointerEvents: 'none'
                        }}
                    />
                </div>

                {/* Underline */}
                <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: '100%', opacity: 1 }}
                    transition={{ duration: DURATION.underline, delay: DURATION.underlineDelay, ease: EASING.circOut }}
                    style={{
                        height: '2px',
                        background: `linear-gradient(90deg, transparent, ${accentColors.underline}, transparent)`,
                        margin: '20px auto 0',
                        maxWidth: '85%',
                        boxShadow: `0 0 15px ${accentColors.shadow}`
                    }}
                />

                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: DURATION.subtitle, delay: DURATION.subtitleDelay }}
                    style={{
                        marginTop: '35px',
                        fontSize: 'clamp(0.7rem, 2vw, 1.4rem)',
                        letterSpacing: '0.5em',
                        color: theme.secondaryText,
                        textTransform: 'uppercase',
                        fontWeight: '400'
                    }}
                >
                    Cloud-Ops | DevSecOps | AI-Ops
                </motion.p>
            </div>
        </motion.div>
    );
};

export default DSKIntro;