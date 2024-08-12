import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import TemplateList from './components/Templates/TemplateList';
import TemplateForm from './components/Templates/TemplateForm';
import RecipientList from './components/Recipients/RecipientList';
import RecipientForm from './components/Recipients/RecipientForm';
import CampaignForm from './components/EmailCampaign/CampaignForm';

// Import the theme
import { theme } from './theme';

// Create a styled component for the main container
const AppContainer = styled.div`
  background-color: ${props => props.theme.backgroundColor};
  color: ${props => props.theme.textColor};
  min-height: 100vh;
`;

const MainContent = styled.main`
  padding: 20px;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <Router>
          <Navigation />
          <MainContent>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/templates" element={<TemplateList />} />
              <Route path="/templates/new" element={<TemplateForm />} />
              <Route path="/templates/:id" element={<TemplateForm />} />
              <Route path="/recipients" element={<RecipientList />} />
              <Route path="/recipients/new" element={<RecipientForm />} />
              <Route path="/recipients/:id" element={<RecipientForm />} />
              <Route path="/campaign" element={<CampaignForm />} />
            </Routes>
          </MainContent>
        </Router>
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;