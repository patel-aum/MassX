import React from 'react';
import TemplateForm from '../components/Templates/TemplateForm';
import TemplateList from '../components/Templates/TemplateList';

const Templates: React.FC = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Manage Templates</h1>
      <TemplateForm />
      <TemplateList />
    </div>
  );
};

export default Templates;
