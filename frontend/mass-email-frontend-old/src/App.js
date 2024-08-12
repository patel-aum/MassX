import React from 'react';
import './App.css';
import EmailForm from './components/EmailForm';
import TemplatesManager from './TemplatesManager';
import RecipientsManager from './RecipientsManager';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Mass Email Sender</h1>
                  <TemplatesManager />
                  <RecipientsManager />
	    </header>
        </div>
    );
}

export default App;

