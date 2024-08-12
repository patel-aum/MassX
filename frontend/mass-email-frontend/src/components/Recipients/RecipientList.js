import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getRecipients, deleteRecipient } from '../../api';

const RecipientListContainer = styled.div`
  padding: 2rem;
`;

const RecipientTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background-color: ${props => props.theme.secondaryColor};
  padding: 0.5rem;
  text-align: left;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${props => props.theme.backgroundColor};
  }
`;

const TableCell = styled.td`
  padding: 0.5rem;
`;

const Button = styled.button`
  background-color: ${props => props.theme.primaryColor};
  color: white;
  border: none;
  padding: 0.25rem 0.5rem;
  margin-right: 0.5rem;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

function RecipientList() {
  const [recipients, setRecipients] = useState([]);

  useEffect(() => {
    fetchRecipients();
  }, []);

  const fetchRecipients = async () => {
    try {
      const response = await getRecipients();
      setRecipients(response.data);
    } catch (error) {
      console.error('Error fetching recipients:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteRecipient(id);
      fetchRecipients();
    } catch (error) {
      console.error('Error deleting recipient:', error);
    }
  };

  return (
    <RecipientListContainer>
      <h2>Recipients</h2>
      <Link to="/recipients/new">
        <Button>Add New Recipient</Button>
      </Link>
      <RecipientTable>
        <thead>
          <tr>
            <TableHeader>Name</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Actions</TableHeader>
          </tr>
        </thead>
        <tbody>
          {recipients.map(recipient => (
            <TableRow key={recipient.id}>
              <TableCell>{recipient.name}</TableCell>
              <TableCell>{recipient.email}</TableCell>
              <TableCell>
                <Link to={`/recipients/${recipient.id}`}>
                  <Button>Edit</Button>
                </Link>
                <Button onClick={() => handleDelete(recipient.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </RecipientTable>
    </RecipientListContainer>
  );
}

export default RecipientList;