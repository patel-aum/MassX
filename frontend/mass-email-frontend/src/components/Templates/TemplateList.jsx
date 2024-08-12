import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTemplates, deleteTemplate } from '../../api';

function TemplateList() {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await getTemplates();
      setTemplates(response.data);
    } catch (error) {
      console.error('Error fetching templates:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTemplate(id);
      fetchTemplates();
    } catch (error) {
      console.error('Error deleting template:', error);
    }
  };

  return (
    <div className="template-list">
      <h2>Email Templates</h2>
      <Link to="/templates/new" className="btn btn-primary">Create New Template</Link>
      <ul>
        {templates.map(template => (
          <li key={template.id}>
            {template.name}
            <Link to={`/templates/${template.id}`} className="btn btn-secondary">Edit</Link>
            <button onClick={() => handleDelete(template.id)} className="btn btn-danger">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TemplateList;