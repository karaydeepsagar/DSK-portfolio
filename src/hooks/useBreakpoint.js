import { useState, useEffect } from 'react';

// ─── TV / Low-Power Detection (runs once at module load) ─────────────────────
const _TV_RE = /TV|SmartTV|Tizen|WebOS|NetCast|SMART-TV|HbbTV|Opera TV|VIERA|BRAVIA|Roku|CrKey/i;
const _isTV =
    typeof navigator !== 'undefined' && _TV_RE.test(navigator.userAgent);
const _cores =
    typeof navigator !== 'undefined' ? (navigator.hardwareConcurrency || 4) : 4;
const _prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** True on Smart TVs or devices with ≤ 2 CPU cores. */
export const isLowPowerDevice = _isTV || _cores <= 2;

/** True when the user's OS requests reduced motion. */
export const prefersReducedMotion = _prefersReducedMotion;

/**
 * Master flag – skip expensive animations when true.
 * Use this in every component to gate heavy Framer Motion loops.
 */
export const shouldReduceAnimations = isLowPowerDevice || _prefersReducedMotion;

// ─── Singleton resize state ───────────────────────────────────────────────────
// A single window resize listener is shared across all useBreakpoint() consumers
// instead of creating one per component, so resize handling stays O(1).

const _getValues = () =>
    typeof window === 'undefined'
        ? { isMobile: false, isTablet: false, isLandscape: false, viewportWidth: 1440, isTV: false, isLowPower: false }
        : {
              isMobile: window.innerWidth < 768,
              isTablet: window.innerWidth < 1024,
              isLandscape: window.innerWidth > window.innerHeight && window.innerWidth < 1100,
              viewportWidth: window.innerWidth,
              isTV: _isTV,
              isLowPower: isLowPowerDevice,
          };

let _currentBp = _getValues();
const _subscribers = new Set();

const _onResize = () => {
    _currentBp = _getValues();
    _subscribers.forEach((fn) => fn(_currentBp));
};

if (typeof window !== 'undefined') {
    window.addEventListener('resize', _onResize, { passive: true });
}

/**
 * Shared breakpoint hook.
 *
 *   isMobile     – viewport width < 768 px  (phones)
 *   isTablet     – viewport width < 1024 px (phones + tablets)
 *   isLandscape  – width > height AND width < 1100 px (phone landscape)
 *   viewportWidth – raw px value
 *   isTV         – detected Smart TV user-agent
 *   isLowPower   – TV or ≤ 2 CPU cores
 */
export const useBreakpoint = () => {
    const [bp, setBp] = useState(() => _currentBp);

    useEffect(() => {
        // Sync in case value changed between SSR and mount
        setBp(_currentBp);
        _subscribers.add(setBp);
        return () => {
            _subscribers.delete(setBp);
        };
    }, []);

    return bp;
};
