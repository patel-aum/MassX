import React, { useState, useEffect } from 'react';

function RecipientsManager() {
    const [recipients, setRecipients] = useState([]);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        fetchRecipients();
    }, []);

    const fetchRecipients = async () => {
        const response = await fetch('http://127.0.0.1:5000/recipients');
        const data = await response.json();
        setRecipients(data);
    };

    const createRecipient = async () => {
        const response = await fetch('http://127.0.0.1:5000/recipients', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, name }),
        });
        if (response.ok) {
            fetchRecipients();
            setEmail('');
            setName('');
        }
    };

    const deleteRecipient = async (recipientId) => {
        const response = await fetch(`http://127.0.0.1:5000/recipients/${recipientId}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            fetchRecipients();
        }
    };

    return (
        <div>
            <h2>Manage Recipients</h2>
            <input
                type="text"
                placeholder="Recipient Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="email"
                placeholder="Recipient Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={createRecipient}>Add Recipient</button>

            <h3>Existing Recipients</h3>
            <ul>
                {recipients.map((recipient) => (
                    <li key={recipient.id}>
                        <strong>{recipient.name}</strong> - {recipient.email}
                        <button onClick={() => deleteRecipient(recipient.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RecipientsManager;

