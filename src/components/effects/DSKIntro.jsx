import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

/**
 * DSKIntro: "The Infrastructure Assembly"
 * A specialized animation for Cloud/DevOps engineers.
 * 1. Network Pulses: Concentric rings simulating health-checks/pings.
 * 2. Scanning Reveal: A sweeping light bar that "initializes" the title.
 * 3. Fluid Layout: Modern typography with high-tech spacing.
 */
const DSKIntro = ({ onComplete }) => {
    const { theme } = useTheme();

    useEffect(() => {
        // Duration reduced to 2.5s for faster initial paint while maintaining rhythm
        const timer = setTimeout(() => onComplete(), 2500);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ 
                opacity: 0, 
                scale: 1.02, 
                filter: 'blur(10px)', 
                transition: { duration: 0.8, ease: "easeInOut" } 
            }}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                background: theme.primaryBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                transform: 'translateZ(0)',
                willChange: 'opacity, filter'
            }}
        >
            {/* 1. Infrastructure Pulses (Concentric Rings) */}
            {[1, 2, 3].map((i) => (
                <motion.div
                    key={i}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 2.2, opacity: [0, 0.2, 0] }}
                    transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        delay: i * 0.8,
                        ease: "easeOut" 
                    }}
                    style={{
                        position: 'absolute',
                        width: '500px',
                        height: '500px',
                        border: `1px solid ${theme.accent}44`,
                        borderRadius: '50%',
                        zIndex: 1,
                        pointerEvents: 'none'
                    }}
                />
            ))}

            {/* 2. Main Text Container */}
            <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
                <div style={{ position: 'relative', overflow: 'hidden', padding: '10px 40px' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 'clamp(10px, 3vw, 25px)',
                        }}
                    >
                        <h1 style={{
                            fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
                            fontWeight: '900',
                            color: theme.primaryText,
                            margin: 0,
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase'
                        }}>
                            DSK
                        </h1>
                        <h1 style={{
                            fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
                            fontWeight: '300',
                            color: theme.accent || '#e11d48',
                            margin: 0,
                            letterSpacing: '0.15em',
                            textTransform: 'uppercase'
                        }}>
                            PORTFOLIO
                        </h1>
                    </motion.div>

                    {/* 3. The "Scanning" Light Bar (System Initialization Effect) */}
                    <motion.div
                        initial={{ left: '-150%' }}
                        animate={{ left: '250%' }}
                        transition={{ duration: 1.8, delay: 0.6, ease: "easeInOut" }}
                        style={{
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            width: '50%',
                            background: `linear-gradient(90deg, transparent, ${theme.accent}66, transparent)`,
                            transform: 'skewX(-25deg)',
                            zIndex: 11,
                            pointerEvents: 'none'
                        }}
                    />
                </div>

                {/* 4. Refined Underline */}
                <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: '100%', opacity: 1 }}
                    transition={{ duration: 1.2, delay: 1, ease: "circOut" }}
                    style={{
                        height: '1px',
                        background: `linear-gradient(90deg, transparent, ${theme.accent || '#e11d48'}, transparent)`,
                        margin: '15px auto 0',
                        maxWidth: '85%',
                        boxShadow: `0 0 10px ${theme.accent}22`
                    }}
                />

                {/* 5. Themed Subtitle */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ duration: 1, delay: 1.8 }}
                    style={{
                        marginTop: '30px',
                        fontSize: '0.85rem',
                        letterSpacing: '0.5em',
                        color: theme.primaryText,
                        textTransform: 'uppercase',
                        fontWeight: '300'
                    }}
                >
                    CLOUD COMPUTING . DEVOPS . AI AUTOMATION
                </motion.p>
            </div>
        </motion.div>
    );
};

export default DSKIntro;

