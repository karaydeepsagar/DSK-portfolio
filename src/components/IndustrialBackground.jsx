import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Cloud, Server, Database, Globe, Shield, Terminal,
    Code2, Activity, Cpu, Share2, Settings, Box,
    Lock, Zap, Layout, Monitor, MessageSquare
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

/**
 * IndustrialBackground: Versatile background component for various sections.
 * Features a signature rotating ring, infinity loop, and context-aware icons.
 */
const IndustrialBackground = ({ type }) => {
    const { theme } = useTheme();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Technical Expertise (skills) panel should not have the right-side animation/background.
    if (type === 'skills') return null;

    const infinityPath = 'M 400,200 C 400,100 550,100 600,200 C 650,300 800,300 800,200 C 800,100 650,100 600,200 C 550,300 400,300 400,200 Z';

    const getTheme = () => {
        switch (type) {
            case 'projects':
                return {
                    icons: [Code2, Layout, Box, Monitor],
                    mainColor: theme.accent,
                    secondaryColor: theme.border,
                    opacity: 0.4
                };
            case 'experience':
                return {
                    icons: [Server, Activity, Cpu, Share2],
                    mainColor: theme.primaryText,
                    secondaryColor: theme.accent,
                    opacity: 0.3
                };
            case 'blog':
                return {
                    icons: [Globe, Lock, MessageSquare, Zap],
                    mainColor: theme.accent,
                    secondaryColor: theme.mutedText,
                    opacity: 0.35
                };
            case 'contact':
                return {
                    icons: [Shield, Database, Terminal, Cloud],
                    mainColor: theme.primaryText,
                    secondaryColor: theme.accent,
                    opacity: 0.4
                };
            case 'home':
            default:
                return {
                    icons: [Cloud, Server, Database, Globe, Shield],
                    mainColor: theme.accent,
                    secondaryColor: theme.border,
                    opacity: 0.3
                };
        }
    };

    const backgroundTheme = getTheme();
    const { icons, mainColor, secondaryColor, opacity } = backgroundTheme;
    const nonRedIconColor = theme.mode === 'dark' ? theme.primaryText : theme.secondaryText;
    const infinityOpacity = isMobile
        ? (theme.mode === 'dark' ? 0.14 : 0.18)
        : (theme.mode === 'dark' ? 0.25 : 0.34);

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            zIndex: 0,
            pointerEvents: 'none'
        }}>
            {/* Infinity Loop Animation (Right Side) - Classic dashed flow style */}
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 800 400"
                preserveAspectRatio="xMidYMid slice"
                style={{
                    position: 'absolute',
                    top: '50%',
                    right: isMobile ? '-32%' : '-22%',
                    transform: isMobile ? 'translateY(-50%) scale(0.9)' : 'translateY(-50%)',
                    opacity: infinityOpacity,
                    zIndex: 0
                }}
            >
                <motion.path
                    d={infinityPath}
                    fill="none"
                    stroke={secondaryColor}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={theme.mode === 'dark' ? 0.55 : 0.35}
                />
                {/* Interleaved dash animation: white and red stay separated */}
                <motion.path
                    d={infinityPath}
                    fill="none"
                    stroke={theme.primaryText}
                    strokeWidth="3"
                    strokeLinecap="butt"
                    strokeLinejoin="round"
                    strokeDasharray="28 92"
                    animate={{ strokeDashoffset: [60, -180] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    opacity={theme.mode === 'dark' ? 0.22 : 0.14}
                />
                <motion.path
                    d={infinityPath}
                    fill="none"
                    stroke={mainColor}
                    strokeWidth="4"
                    strokeLinecap="butt"
                    strokeLinejoin="round"
                    strokeDasharray="28 92"
                    animate={{ strokeDashoffset: [0, -240] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    opacity={theme.mode === 'dark' ? 0.55 : 0.62}
                />
            </svg>

            {/* 1. Large Themed Animation Cluster (Right Aligned or Centered on Mobile) */}
            <div style={{
                position: 'absolute',
                top: isMobile ? '80%' : '50%',
                right: isMobile ? '50%' : '-15%',
                transform: isMobile ? 'translate(50%, -50%) scale(0.6)' : 'translateY(-50%)',
                width: isMobile ? '500px' : '70vw',
                height: isMobile ? '500px' : '70vw',
                maxHeight: '700px',
                maxWidth: '700px',
                zIndex: 0,
                opacity: isMobile ? 0.3 : 1
            }}>
                {/* Core Radial Glow */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.4, 0.7, 0.4]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                        position: 'absolute',
                        top: '15%',
                        left: '15%',
                        width: '70%',
                        height: '70%',
                        background: 'radial-gradient(circle, var(--netflix-red) 0%, transparent 75%)',
                        borderRadius: '50%',
                        filter: 'blur(100px)',
                        zIndex: -1
                    }}
                />

                {/* Rotating Tech Ring */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        border: theme.mode === 'dark' ? '2px solid rgba(255, 255, 255, 0.1)' : '2px solid rgba(0, 0, 0, 0.08)',
                        borderRadius: '50%',
                        borderTop: `4px solid ${theme.accent}`,
                        borderBottom: theme.mode === 'dark' ? `4px solid ${theme.primaryText}` : '4px solid rgba(26, 26, 26, 0.22)',
                        borderRight: theme.mode === 'dark' ? '2px solid rgba(255, 255, 255, 0.3)' : '2px solid rgba(0, 0, 0, 0.14)',
                        opacity: theme.mode === 'dark' ? 0.7 : 0.55
                    }}
                />

                {/* 2. Orbital Tech Icons (Rotating with Ring) */}
                {icons.map((Icon, idx) => {
                    const orbitRadius = 240; // Constant radius to stay INSIDE the ring
                    const orbitSpeed = 30; // Faster, synchronized with tech ring
                    // Ensure perfect geometrical spacing (72 degrees for 5 icons)
                    const initialRotation = idx * (360 / icons.length);

                    return (
                        <motion.div
                            key={idx}
                            animate={{ rotate: [initialRotation, initialRotation + 360] }}
                            transition={{
                                duration: orbitSpeed,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                width: '1px', // Pivot point
                                height: '1px',
                                zIndex: 2
                            }}
                        >
                            <motion.div
                                animate={{
                                    rotate: [-(initialRotation), -(initialRotation + 360)], // Counter-rotate at matching speed
                                    scale: [1, 1.1, 1],
                                    filter: [
                                        `drop-shadow(0 0 10px ${idx % 2 === 0 ? 'var(--netflix-red)' : secondaryColor}66)`,
                                        `drop-shadow(0 0 25px ${idx % 2 === 0 ? 'var(--netflix-red)' : secondaryColor})`,
                                        `drop-shadow(0 0 10px ${idx % 2 === 0 ? 'var(--netflix-red)' : secondaryColor}66)`
                                    ]
                                }}
                                transition={{
                                    rotate: { duration: orbitSpeed, repeat: Infinity, ease: "linear" },
                                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                                    filter: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                                }}
                                style={{
                                    position: 'absolute',
                                    left: orbitRadius,
                                    color: idx % 2 === 0 ? 'var(--netflix-red)' : nonRedIconColor,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    top: '-25px' // Half of icon size to center on orbit line
                                }}
                            >
                                <Icon size={50} strokeWidth={1} />

                                {/* Background Glow for the Icon itself */}
                                <div style={{
                                    position: 'absolute',
                                    width: '40px',
                                    height: '40px',
                                    background: idx % 2 === 0 ? 'var(--netflix-red)' : nonRedIconColor,
                                    filter: 'blur(30px)',
                                    opacity: 0.3,
                                    zIndex: -1
                                }} />
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>

            {/* 3. (Replaced) Infinity loop is now the shared right-side animation above */}

            {/* Subtle Grid Pattern */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
                backgroundSize: '60px 60px',
                zIndex: -1
            }} />
        </div>
    );
};

export default IndustrialBackground;
