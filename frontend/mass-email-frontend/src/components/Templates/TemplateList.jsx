import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getTemplates, deleteTemplate } from '../../api';

const TemplateListContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.h2`
  color: ${props => props.theme.primaryColor};
  margin-bottom: 1.5rem;
`;

const CreateButton = styled(Link)`
  background-color: ${props => props.theme.primaryColor};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  display: inline-block;
  margin-bottom: 1.5rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${props => props.theme.secondaryColor};
  }
`;

const TemplateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const TemplateCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const TemplateName = styled.h3`
  margin: 0 0 1rem 0;
  color: ${props => props.theme.textColor};
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: auto;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
`;

const EditButton = styled(Link)`
  background-color: ${props => props.theme.secondaryColor};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${props => props.theme.primaryColor};
  }
`;

const PreviewButton = styled(Button)`
  background-color: ${props => props.theme.successColor};
  color: white;

  &:hover {
    opacity: 0.8;
  }
`;

const DeleteButton = styled(Button)`
  background-color: ${props => props.theme.errorColor};
  color: white;

  &:hover {
    opacity: 0.8;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 80%;
  max-height: 80%;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled(Button)`
  background-color: ${props => props.theme.secondaryColor};
  color: white;
  margin-top: 1rem;

  &:hover {
    opacity: 0.8;
  }
`;

const ModalButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
`;

function TemplateList() {
  const [templates, setTemplates] = useState([]);
  const [previewTemplate, setPreviewTemplate] = useState(null);

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

  const handlePreview = (template) => {
    setPreviewTemplate(template);
  };

  return (
    <TemplateListContainer>
      <Header>Email Templates</Header>
      <CreateButton to="/templates/new">Create New Template</CreateButton>
      <TemplateGrid>
        {templates.map(template => (
          <TemplateCard key={template.id}>
            <TemplateName>{template.name}</TemplateName>
            <ButtonGroup>
              <EditButton to={`/templates/${template.id}`}>Edit</EditButton>
              <PreviewButton onClick={() => handlePreview(template)}>Preview</PreviewButton>
              <DeleteButton onClick={() => handleDelete(template.id)}>Delete</DeleteButton>
            </ButtonGroup>
          </TemplateCard>
        ))}
      </TemplateGrid>
      {previewTemplate && (
        <Modal>
          <ModalContent>
            <h3>{previewTemplate.name}</h3>
            <h4>Subject: {previewTemplate.subject}</h4>
            <div dangerouslySetInnerHTML={{ __html: previewTemplate.body }} />
            <ModalButtonGroup>
              <EditButton to={`/templates/${previewTemplate.id}`}>Edit</EditButton>
              <CloseButton onClick={() => setPreviewTemplate(null)}>Close</CloseButton>
            </ModalButtonGroup>
          </ModalContent>
        </Modal>
      )}
    </TemplateListContainer>
  );
}

export default TemplateList;
