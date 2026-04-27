/**
 * useWebVitals: Monitors Core Web Vitals and reports performance metrics
 * Used for observability and debugging on any device.
 * 
 * Metrics collected:
 * - LCP (Largest Contentful Paint): How fast the main content loads
 * - FID (First Input Delay): How responsive the page is to user input
 * - CLS (Cumulative Layout Shift): How stable the layout is
 * - FCP (First Contentful Paint): How fast anything appears
 * - TTFB (Time to First Byte): How fast the server responds
 */

export const useWebVitals = (callback) => {
  if (typeof window === 'undefined') return;

  try {
    // Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        callback({
          name: 'LCP',
          value: Math.round(lastEntry.renderTime || lastEntry.loadTime),
          rating: lastEntry.startTime < 2500 ? 'good' : 'poor'
        });
      });

      try {
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        // API not supported
      }

      // Cumulative Layout Shift (CLS)
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        list.getEntries().forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        callback({
          name: 'CLS',
          value: Math.round(clsValue * 1000) / 1000,
          rating: clsValue < 0.1 ? 'good' : 'poor'
        });
      });

      try {
        clsObserver.observe({ type: 'layout-shift', buffered: true });
      } catch (e) {
        // API not supported
      }

      // First Input Delay (FID) - deprecated, using deferredFirst-input instead
      const fidObserver = new PerformanceObserver((list) => {
        const firstInput = list.getEntries()[0];
        callback({
          name: 'FID',
          value: Math.round(firstInput.processingDuration),
          rating: firstInput.processingDuration < 100 ? 'good' : 'poor'
        });
      });

      try {
        fidObserver.observe({ type: 'first-input', buffered: true });
      } catch (e) {
        // API not supported - FID is deprecated
      }
    }

    // Navigation Timing API for FCP and TTFB
    if ('PerformanceNavigationTiming' in window) {
      window.addEventListener('load', () => {
        const navTiming = performance.getEntriesByType('navigation')[0];
        if (navTiming) {
          const fcp = navTiming.responseStart - navTiming.fetchStart;
          const ttfb = navTiming.responseStart - navTiming.fetchStart;
          
          callback({
            name: 'TTFB',
            value: Math.round(ttfb),
            rating: ttfb < 600 ? 'good' : 'poor'
          });
        }
      });
    }

    // Performance metrics API (if available)
    if ('PerformanceEventTiming' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            callback({
              name: 'FCP',
              value: Math.round(entry.startTime),
              rating: entry.startTime < 1800 ? 'good' : 'poor'
            });
          }
        });
      });

      try {
        observer.observe({ entryTypes: ['paint'] });
      } catch (e) {
        // API not supported
      }
    }
  } catch (error) {
    // Silently fail if Web Vitals are not supported
    console.debug('Web Vitals monitoring not available');
  }
};
