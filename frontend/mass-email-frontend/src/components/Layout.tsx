import React from 'react';
import { Link } from 'react-router-dom';

const Layout: React.FC = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-4">
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/templates">Templates</Link></li>
            <li><Link to="/recipients">Recipients</Link></li>
            <li><Link to="/send-email">Send Email</Link></li>
          </ul>
        </nav>
      </header>
      <main className="flex-grow p-4">{children}</main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        © 2024 Mass Email Sender
      </footer>
    </div>
  );
};

export default Layout;

