import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';

const SectionSkeleton = () => {
    const { theme } = useTheme();
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '100px 4%'
        }}>
            <motion.div 
                animate={{ opacity: [0.15, 0.4, 0.15] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    width: '100%',
                    maxWidth: '1200px',
                    height: '500px',
                    borderRadius: '24px',
                    background: theme.cardBg,
                    border: `1px solid ${theme.border}`,
                    boxShadow: theme.cardShadow
                }}
            />
        </div>
    );
};

export default SectionSkeleton;
