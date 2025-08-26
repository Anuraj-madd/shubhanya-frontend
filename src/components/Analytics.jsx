import { useEffect } from 'react';

const Analytics = () => {
  useEffect(() => {
    // Simple analytics tracking
    const trackPageView = () => {
      // You can replace this with your actual analytics service
      // For now, we'll just log to console
      console.log('Page viewed:', window.location.pathname);
      
      // Example: Send to Google Analytics (if you have GA4)
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', 'GA_MEASUREMENT_ID', {
          page_path: window.location.pathname,
        });
      }
      
      // Example: Send to Facebook Pixel (if you have one)
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'PageView');
      }
    };

    trackPageView();
  }, []);

  return null; // This component doesn't render anything
};

export default Analytics;
