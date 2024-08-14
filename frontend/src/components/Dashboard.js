import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const DashboardContainer = styled.div`
  padding: 2rem;
`;

const DashboardCard = styled.div`
  background-color: ${props => props.theme.secondaryColor};
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
`;

function Dashboard() {
  const [templateCount, setTemplateCount] = useState(0);
  const [recipientCount, setRecipientCount] = useState(0);
  const [campaignCount, setCampaignCount] = useState(0);

  useEffect(() => {
    // Fetch Templates Count
    axios.get('http://localhost:5000/templates')
      .then(response => {
        setTemplateCount(response.data.length);
      })
      .catch(error => {
        console.error('Error fetching templates:', error);
      });

    // Fetch Recipients Count
    axios.get('http://localhost:5000/recipients')
      .then(response => {
        setRecipientCount(response.data.length);
      })
      .catch(error => {
        console.error('Error fetching recipients:', error);
      });

    // Fetch Recent Campaigns Count
    axios.get('http://localhost:5000/campaigns')  // Assuming you have an endpoint for campaigns
      .then(response => {
        setCampaignCount(response.data.length);
      })
      .catch(error => {
        console.error('Error fetching campaigns:', error);
      });
  }, []);

  return (
    <DashboardContainer>
      <h1>Dashboard</h1>
      <DashboardCard>
        <h2>Templates</h2>
        <p>Total templates: {templateCount}</p>
      </DashboardCard>
      <DashboardCard>
        <h2>Recipients</h2>
        <p>Total recipients: {recipientCount}</p>
      </DashboardCard>
      <DashboardCard>
        <h2>Recent Campaigns</h2>
        <p>Campaigns sent this month: {campaignCount}</p>
      </DashboardCard>
    </DashboardContainer>
  );
}

export default Dashboard;
