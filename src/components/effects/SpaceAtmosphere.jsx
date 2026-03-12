import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useBreakpoint } from '../../hooks/useBreakpoint';

/**
 * SpaceAtmosphere: A high-performance canvas-based background 
 * that replaces pitch-black with a minimalist starfield and 
 * subtle maroon/grey/crimson nebulae.
 */
const SpaceAtmosphere = () => {
    const { theme } = useTheme();
    const { isMobile } = useBreakpoint();
    const canvasRef = useRef(null);
    const requestRef = useRef(null);

    // Only active in dark mode
    const isActive = theme.mode === 'dark';

    useEffect(() => {
        if (!isActive) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width, height;
        let stars = [];
        let smoothedScroll = window.scrollY;

        const STAR_COUNT = isMobile ? 60 : 120; // Slightly reduced for max smoothness
        const COLORS = ['#ffffff', '#ffffff', '#ffffff', '#e2e8f0', '#ef444422'];

        // Simple Seeded Random for consistency
        const random = (seed) => {
            const x = Math.sin(seed) * 10000;
            return x - Math.floor(x);
        };

        const init = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width * window.devicePixelRatio;
            canvas.height = height * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
            
            stars = [];
            for (let i = 0; i < STAR_COUNT; i++) {
                // Use index as seed for consistency across refreshes if screen size is same
                const seed = i + 123.456;
                stars.push({
                    x: random(seed * 1) * width,
                    y: random(seed * 2) * height,
                    size: random(seed * 3) * 1.0 + 0.3,
                    color: COLORS[Math.floor(random(seed * 4) * COLORS.length)],
                    opacity: random(seed * 5),
                    speed: random(seed * 6) * 0.008 + 0.003,
                    direction: random(seed * 7) > 0.5 ? 1 : -1
                });
            }
        };

        const draw = () => {
            // Smooth the scroll value to eliminate jitter (interpolation)
            smoothedScroll += (window.scrollY - smoothedScroll) * 0.15;
            
            ctx.clearRect(0, 0, width, height);

            // 1. Solid Dark Background (Pre-filled via CSS, but keeping a clean base here)
            ctx.fillStyle = '#030304';
            ctx.fillRect(0, 0, width, height);

            // 2. Render Stars (NO shadowBlur for performance)
            for (let i = 0; i < stars.length; i++) {
                const star = stars[i];
                
                // Twinkle logic
                star.opacity += star.speed * star.direction;
                if (star.opacity >= 1 || star.opacity <= 0.2) star.direction *= -1;

                // Parallax Position
                const parallaxFactor = star.size * 0.05;
                let yPos = (star.y - (smoothedScroll * parallaxFactor)) % height;
                if (yPos < 0) yPos += height;

                ctx.globalAlpha = star.opacity;
                ctx.fillStyle = star.color;
                
                // Draw Star
                ctx.beginPath();
                ctx.arc(star.x, yPos, star.size, 0, Math.PI * 2);
                ctx.fill();

                // Fake "Glow" for larger stars (drawing a second circle is 10x faster than shadowBlur)
                if (star.size > 0.8) {
                    ctx.globalAlpha = star.opacity * 0.3;
                    ctx.beginPath();
                    ctx.arc(star.x, yPos, star.size * 2.5, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            requestRef.current = requestAnimationFrame(draw);
        };

        const onResize = () => {
            init();
        };

        init();
        draw();

        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
        };
    }, [isActive, isMobile]);

    if (!isActive) return null;

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                pointerEvents: 'none',
                zIndex: -1
            }}
            aria-hidden="true"
        />
    );
};

export default SpaceAtmosphere;
