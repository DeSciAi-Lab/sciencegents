
import React from 'react';
import NavbarLayout from '@/components/layout/NavbarLayout';
import CapabilityWizard from '@/components/capability/create-wizard/CapabilityWizard';

const CreateCapability = () => {
  return (
    <NavbarLayout>
      <div className="bg-gray-50 pb-16">
        <div className="container mx-auto px-4 sm:px-6">
          <CapabilityWizard />
        </div>
      </div>
    </NavbarLayout>
  );
};

export default CreateCapability;
