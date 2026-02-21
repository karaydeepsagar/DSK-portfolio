import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useBreakpoint } from '../hooks/useBreakpoint';
import SpotlightCard from './SpotlightCard';

const Education = ({ data }) => {
    const { theme } = useTheme();
    const { isMobile } = useBreakpoint();
    const sectionRef = React.useRef(null);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.1 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { type: 'spring', stiffness: 100, damping: 20 }
        }
    };

    return (
        <section ref={sectionRef} id="education" style={{ position: 'relative', overflow: 'hidden' }}>
            <div
                className="section-padding"
                style={{
                    padding: isMobile ? '100px 15px 40px' : '120px 6% 80px',
                    background: 'transparent',
                    minHeight: '100vh',
                    color: theme.primaryText
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', marginBottom: isMobile ? '60px' : '80px' }}
                >
                    <h2
                        style={{
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            fontWeight: '800',
                            marginBottom: '20px',
                            color: theme.primaryText
                        }}
                    >
                        <span>Education</span> <span style={{ color: theme.accent }}>Details</span>
                    </h2>
                    <p style={{ color: theme.mutedText, fontSize: '1.2rem', maxWidth: '780px', margin: '0 auto' }}>
                        Academic foundation supporting cloud and DevOps expertise.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}
                >
                    {data.map((item, idx) => {
                        const labels = ['Undergraduate', 'Diploma', 'Secondary School'];
                        return (
                            <motion.div
                                key={`${item.degree}-${item.year}-${idx}`}
                                variants={cardVariants}
                            >
                                <SpotlightCard
                                    style={{
                                        background: theme.cardBg,
                                        boxShadow: theme.cardShadow
                                    }}
                                >
                                    <div style={{ padding: isMobile ? '20px 18px' : '26px 28px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                                        {/* Icon */}
                                        <div style={{
                                            width: '50px',
                                            height: '50px',
                                            flexShrink: 0,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: '14px',
                                            background: `linear-gradient(135deg, ${theme.accent}20 0%, ${theme.accent}08 100%)`,
                                            border: `1px solid ${theme.borderAccent}`,
                                            color: theme.accent
                                        }}>
                                            <GraduationCap size={22} />
                                        </div>

                                        {/* Content */}
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            {/* Top row: label + year */}
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                                                <span style={{
                                                    fontSize: '0.68rem',
                                                    fontWeight: '700',
                                                    letterSpacing: '2.5px',
                                                    textTransform: 'uppercase',
                                                    color: theme.accent,
                                                    background: `${theme.accent}12`,
                                                    border: `1px solid ${theme.accent}30`,
                                                    borderRadius: '50px',
                                                    padding: '3px 11px',
                                                    lineHeight: 1.6
                                                }}>
                                                    {labels[idx]}
                                                </span>
                                                <span style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '6px',
                                                    fontSize: '0.82rem',
                                                    fontWeight: '600',
                                                    color: theme.mutedText,
                                                    background: theme.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
                                                    border: `1px solid ${theme.border}`,
                                                    borderRadius: '50px',
                                                    padding: '3px 11px'
                                                }}>
                                                    <Calendar size={12} style={{ color: theme.accent, flexShrink: 0 }} />
                                                    {item.year}
                                                </span>
                                            </div>

                                            {/* Degree | Institute — same font style */}
                                            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                                                <span style={{
                                                    fontSize: isMobile ? '1rem' : '1.15rem',
                                                    fontWeight: '700',
                                                    color: theme.primaryText,
                                                    letterSpacing: '-0.01em',
                                                    lineHeight: '1.3'
                                                }}>
                                                    {item.degree}
                                                </span>
                                                {item.institute && (
                                                    <>
                                                        <span style={{ color: theme.borderAccent, fontSize: '1rem', fontWeight: '300', lineHeight: 1 }}>|</span>
                                                        <span style={{
                                                            fontSize: isMobile ? '1rem' : '1.15rem',
                                                            fontWeight: '700',
                                                            color: theme.mutedText,
                                                            letterSpacing: '-0.01em',
                                                            lineHeight: '1.3'
                                                        }}>
                                                            {item.institute}
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </SpotlightCard>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default Education;
