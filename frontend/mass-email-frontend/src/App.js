import React from 'react';
import './App.css';
import EmailForm from './components/EmailForm';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Mass Email Sender</h1>
                <EmailForm />
            </header>
        </div>
    );
}

export default App;

