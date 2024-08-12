import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getTemplate, createTemplate, updateTemplate } from '../../api';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
`;

const Input = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-size: 1rem;
  min-height: 200px;
`;

const Button = styled.button`
  background-color: ${props => props.theme.primaryColor};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

function TemplateForm() {
  const [template, setTemplate] = useState({ name: '', subject: '', body: '' });
  const { id } = useParams();
  const history = useNavigate();

  useEffect(() => {
    if (id) {
      fetchTemplate();
    }
  }, [id]);

  const fetchTemplate = async () => {
    try {
      const response = await getTemplate(id);
      setTemplate(response.data);
    } catch (error) {
      console.error('Error fetching template:', error);
    }
  };

  const handleChange = (e) => {
    setTemplate({ ...template, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateTemplate(id, template);
      } else {
        await createTemplate(template);
      }
      history.push('/templates');
    } catch (error) {
      console.error('Error saving template:', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>{id ? 'Edit Template' : 'Create New Template'}</h2>
      <Input
        type="text"
        name="name"
        value={template.name}
        onChange={handleChange}
        placeholder="Template Name"
        required
      />
      <Input
        type="text"
        name="subject"
        value={template.subject}
        onChange={handleChange}
        placeholder="Email Subject"
        required
      />
      <TextArea
        name="body"
        value={template.body}
        onChange={handleChange}
        placeholder="Email Body"
        required
      />
      <Button type="submit">Save Template</Button>
    </Form>
  );
}

export default TemplateForm;