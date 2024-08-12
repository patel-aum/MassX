import React from 'react';
import styled from 'styled-components';

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
  return (
    <DashboardContainer>
      <h1>Dashboard</h1>
      <DashboardCard>
        <h2>Templates</h2>
        <p>Total templates: 10</p>
      </DashboardCard>
      <DashboardCard>
        <h2>Recipients</h2>
        <p>Total recipients: 100</p>
      </DashboardCard>
      <DashboardCard>
        <h2>Recent Campaigns</h2>
        <p>Campaigns sent this month: 5</p>
      </DashboardCard>
    </DashboardContainer>
  );
}

export default Dashboard;