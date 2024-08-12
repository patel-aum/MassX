import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getTemplates, getRecipients, sendEmail } from '../../api';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
`;

const Select = styled.select`
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-size: 1rem;
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

function CampaignForm() {
  const [templates, setTemplates] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [selectedRecipients, setSelectedRecipients] = useState([]);

  useEffect(() => {
    fetchTemplates();
    fetchRecipients();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await getTemplates();
      setTemplates(response.data);
    } catch (error) {
      console.error('Error fetching templates:', error);
    }
  };

  const fetchRecipients = async () => {
    try {
      const response = await getRecipients();
      setRecipients(response.data);
    } catch (error) {
      console.error('Error fetching recipients:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Fetch the selected template details
        const selectedTemplateData = templates.find(t => t.id === selectedTemplate);
        const subject = selectedTemplateData.subject;
        const body = selectedTemplateData.body;

        for (const recipientId of selectedRecipients) {
            const recipient = recipients.find(r => r.id === recipientId);
            await sendEmail({
                subject,  // Sending subject
                recipient: recipient.email,
                body,  // Sending body
            });
        }
        alert('Campaign sent successfully!');
    } catch (error) {
        console.error('Error sending campaign:', error);
        alert('Error sending campaign. Please try again.');
    }
};


  return (
    <Form onSubmit={handleSubmit}>
      <h2>Create New Campaign</h2>
      <Select
        value={selectedTemplate}
        onChange={(e) => setSelectedTemplate(e.target.value)}
        required
      >
        <option value="">Select a template</option>
        {templates.map(template => (
          <option key={template.id} value={template.id}>{template.name}</option>
        ))}
      </Select>
      <Select
        multiple
        value={selectedRecipients}
        onChange={(e) => setSelectedRecipients(Array.from(e.target.selectedOptions, option => option.value))}
        required
      >
        {recipients.map(recipient => (
          <option key={recipient.id} value={recipient.id}>{recipient.name} ({recipient.email})</option>
        ))}
      </Select>
      <Button type="submit">Send Campaign</Button>
    </Form>
  );
}

export default CampaignForm;