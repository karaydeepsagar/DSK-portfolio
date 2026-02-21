import { useState, useEffect } from 'react';

const getValues = () => ({
    isMobile: window.innerWidth < 768,
    isTablet: window.innerWidth < 1024,
    isLandscape: window.innerWidth > window.innerHeight && window.innerWidth < 1100,
    viewportWidth: window.innerWidth,
});

/**
 * Shared breakpoint hook – installs a single passive resize listener per
 * component instance and exposes four derived values:
 *
 *   isMobile    – viewport width < 768 px  (phones)
 *   isTablet    – viewport width < 1024 px (phones + tablets)
 *   isLandscape – width > height AND width < 1100 px (phone landscape)
 *   viewportWidth – raw px value for fine-grained calculations
 */
export const useBreakpoint = () => {
    const [bp, setBp] = useState(() =>
        typeof window !== 'undefined'
            ? getValues()
            : { isMobile: false, isTablet: false, isLandscape: false, viewportWidth: 1440 }
    );

    useEffect(() => {
        const onResize = () => setBp(getValues());
        window.addEventListener('resize', onResize, { passive: true });
        return () => window.removeEventListener('resize', onResize);
    }, []);

    return bp;
};
