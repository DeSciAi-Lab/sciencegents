import React, { useEffect } from 'react';
import { NavbarLayout } from '@/components/layout/NavbarLayout';
import ScienceGentWizard from '@/components/create-sciencegent/ScienceGentWizard';

const CreateScienceGent = () => {
  // Clear any stale state when directly navigating to this page
  useEffect(() => {
    // Check if we're coming from a direct navigation (not from app flow)
    const referrer = document.referrer;
    const isDirectNavigation = !referrer || !referrer.includes(window.location.host);
    
    if (isDirectNavigation) {
      // Clear any stale form data and state
      localStorage.removeItem('sciencegent_wizard_form_data');
      localStorage.removeItem('sciencegent_wizard_current_step');
      
      console.log("Reset ScienceGent creation state due to direct navigation");
    }
  }, []);

  return (
    <NavbarLayout>
      <div className="max-w-6xl mx-auto py-8">
        <ScienceGentWizard />
      </div>
    </NavbarLayout>
  );
};

export default CreateScienceGent;
