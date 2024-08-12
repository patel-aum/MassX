// src/components/Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: ${props => props.theme.primaryColor};
  padding: 1rem;
`;

const NavList = styled.ul`
  list-style-type: none;
  display: flex;
  justify-content: space-around;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  a {
    color: ${props => props.theme.backgroundColor};
    text-decoration: none;
    font-weight: bold;
    &:hover {
      text-decoration: underline;
    }
  }
`;

function Navigation() {
  return (
    <Nav>
      <NavList>
        <NavItem><Link to="/">Dashboard</Link></NavItem>
        <NavItem><Link to="/templates">Templates</Link></NavItem>
        <NavItem><Link to="/recipients">Recipients</Link></NavItem>
        <NavItem><Link to="/campaign">New Campaign</Link></NavItem>
      </NavList>
    </Nav>
  );
}

export default Navigation;