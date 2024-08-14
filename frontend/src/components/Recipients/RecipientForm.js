import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getRecipient, createRecipient, updateRecipient } from '../../api';

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

function RecipientForm() {
    const [recipient, setRecipient] = useState({ name: '', email: '' });
    const { id } = useParams();
    const navigate = useNavigate();
  

  useEffect(() => {
    if (id) {
      fetchRecipient();
    }
  }, [id]);

  const fetchRecipient = async () => {
    try {
      const response = await getRecipient(id);
      setRecipient(response.data);
    } catch (error) {
      console.error('Error fetching recipient:', error);
    }
  };

  const handleChange = (e) => {
    setRecipient({ ...recipient, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateRecipient(id, recipient);
      } else {
        await createRecipient(recipient);
      }
      navigate('/recipients');
    } catch (error) {
      console.error('Error saving recipient:', error);
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <h2>{id ? 'Edit Recipient' : 'Add New Recipient'}</h2>
      <Input
        type="text"
        name="name"
        value={recipient.name}
        onChange={handleChange}
        placeholder="Recipient Name"
        required
      />
      <Input
        type="email"
        name="email"
        value={recipient.email}
        onChange={handleChange}
        placeholder="Recipient Email"
        required
      />
      <Button type="submit">Save Recipient</Button>
    </Form>
  );
}

export default RecipientForm;