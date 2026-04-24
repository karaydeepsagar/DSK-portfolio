import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import SpotlightCard from '../common/SpotlightCard';

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
        <section ref={sectionRef} id="education" style={{ position: 'relative', overflow: 'hidden', backgroundColor: 'transparent' }}>
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
                            fontSize: 'clamp(1.9rem, 3.8vw, 2.8rem)',
                            fontWeight: '800',
                            marginBottom: '20px',
                            color: theme.primaryText
                        }}
                    >
                        <span style={{ color: theme.accent }}>Education</span> <span style={{ color: theme.primaryText }}>Details</span>
                    </h2>
                    <p style={{ color: theme.mutedText, fontSize: '1.2rem', maxWidth: '780px', margin: '0 auto' }}>
                        Academic foundation supporting cloud and DevOps expertise.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-200px" }}
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
                                            <h3 style={{ color: theme.primaryText, fontSize: '1.2rem', fontWeight: '800', margin: '0 0 6px 0', lineHeight: 1.2 }}>
                                                {item.degree}
                                            </h3>
                                            <p style={{ color: theme.secondaryText, margin: '0', fontSize: '0.95rem', fontWeight: 600 }}>
                                                {item.institution}
                                            </p>
                                            {item.gpa && (
                                                <p style={{ color: theme.mutedText, margin: '4px 0 0 0', fontSize: '0.85rem' }}>
                                                    {item.gpa}
                                                </p>
                                            )}
                                        </div>

                                        {/* Year */}
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            color: theme.mutedText,
                                            fontSize: '0.9rem',
                                            flexShrink: 0
                                        }}>
                                            <Calendar size={16} style={{ color: theme.accent }} />
                                            {item.year}
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
