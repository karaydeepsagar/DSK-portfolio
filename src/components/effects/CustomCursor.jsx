import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

const INTERACTIVE = 'a, button, input, textarea, select, label, [role="button"], [tabindex], .netflix-btn';

const CustomCursor = () => {
    const { theme } = useTheme();
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const dotRef = useRef(null);

    useEffect(() => {
        if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
            return;
        }

        const onMove = (e) => {
            if (!dotRef.current) return;
            dotRef.current.style.left = `${e.clientX}px`;
            dotRef.current.style.top = `${e.clientY}px`;
            setIsVisible(true);
        };

        const onOver = (e) => {
            if (e.target.closest(INTERACTIVE)) setIsHovering(true);
        };

        const onOut = (e) => {
            if (e.target.closest(INTERACTIVE)) setIsHovering(false);
        };

        const onLeave = () => {
            setIsVisible(false);
            setIsHovering(false);
        };

        const onEnter = () => {
            setIsVisible(true);
        };

        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseover', onOver);
        window.addEventListener('mouseout', onOut);
        document.documentElement.addEventListener('mouseleave', onLeave);
        document.documentElement.addEventListener('mouseenter', onEnter);

        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseover', onOver);
            window.removeEventListener('mouseout', onOut);
            document.documentElement.removeEventListener('mouseleave', onLeave);
            document.documentElement.removeEventListener('mouseenter', onEnter);
        };
    }, []);

    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null;

    const dotColor = theme.mode === 'dark' ? '#ffffff' : '#111111';
    const hoverColor = '#d10000';

    return (
        <div
            ref={dotRef}
            style={{
                position: 'fixed',
                top: '-100px',
                left: '-100px',
                width: isHovering ? '14px' : '10px',
                height: isHovering ? '14px' : '10px',
                borderRadius: '50%',
                background: isHovering ? hoverColor : dotColor,
                opacity: isVisible ? 1 : 0,
                pointerEvents: 'none',
                zIndex: 99999,
                transform: 'translate(-50%, -50%)',
                willChange: 'transform',
                transition: 'width 0.18s ease, height 0.18s ease, background 0.18s ease, opacity 0.2s ease',
            }}
        />
    );
};

export default CustomCursor;
