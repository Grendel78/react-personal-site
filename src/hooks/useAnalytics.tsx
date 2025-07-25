import { useCallback } from 'react';

export const useAnalytics = () => {
  const trackEvent = useCallback((eventName: string, parameters?: Record<string, any>) => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', eventName, parameters);
    } else {
      console.warn('GA4 not initialized');
    }
  }, []);

  // Navigation events
  const trackNavigation = useCallback((destination: string) => {
    trackEvent('navigation_click', {
      destination,
      click_text: destination
    });
  }, [trackEvent]);

  // Button click events
  const trackButtonClick = useCallback((buttonName: string, buttonLocation?: string, additionalParams?: Record<string, any>) => {
    trackEvent('button_click', {
      button_name: buttonName,
      button_location: buttonLocation,
      ...additionalParams
    });
  }, [trackEvent]);

  // Form events
  const trackFormSubmission = useCallback((formName: string, success: boolean, errorMessage?: string) => {
    trackEvent('form_submission', {
      form_name: formName,
      success,
      ...(errorMessage && { error_message: errorMessage })
    });
  }, [trackEvent]);

  // Easter egg events
  const trackEasterEgg = useCallback((type: 'hint_revealed' | 'activated', method?: string) => {
    trackEvent('easter_egg_activated', {
      easter_egg_type: type === 'activated' ? 'konami_code' : 'hint_reveal',
      activation_method: method || (type === 'activated' ? 'keyboard_sequence' : 'mouse_hover')
    });
  }, [trackEvent]);

  // Project interaction events
  const trackProjectInteraction = useCallback((projectName: string, action: 'live_site' | 'view_code') => {
    trackEvent('project_interaction', {
      project_name: projectName,
      interaction_type: action,
      button_name: action === 'live_site' ? 'Live Site' : 'View Code'
    });
  }, [trackEvent]);

  // Social link events
  const trackSocialLink = useCallback((platform: string, location?: string) => {
    trackEvent('social_link_click', {
      platform,
      button_location: location || 'contact_section'
    });
  }, [trackEvent]);

  return {
    trackEvent,
    trackNavigation,
    trackButtonClick,
    trackFormSubmission,
    trackEasterEgg,
    trackProjectInteraction,
    trackSocialLink
  };
};