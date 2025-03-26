
import React from 'react';
import NavbarLayout from '@/components/layout/NavbarLayout';
import ScienceGentWizard from '@/components/create-sciencegent/ScienceGentWizard';

const CreateScienceGent = () => {
  return (
    <NavbarLayout>
      <div className="bg-gray-50 py-12">
        <ScienceGentWizard />
      </div>
    </NavbarLayout>
  );
};

export default CreateScienceGent;
