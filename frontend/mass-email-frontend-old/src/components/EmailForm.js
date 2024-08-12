import React, { useState } from 'react';

const EmailForm = () => {
    const [subject, setSubject] = useState('');
    const [recipient, setRecipient] = useState('');
    const [body, setBody] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Sending...');

        const response = await fetch('http://127.0.0.1:5000/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                subject,
                recipient,
                body,
            }),
        });

        if (response.ok) {
            setStatus('Email sent successfully!');
        } else {
            setStatus('Failed to send email.');
        }
    };

    return (
        <div>
            <h2>Send an Email</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Subject:</label>
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                </div>
                <div>
                    <label>Recipient:</label>
                    <input
                        type="email"
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                    />
                </div>
                <div>
                    <label>Body:</label>
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                    ></textarea>
                </div>
                <button type="submit">Send Email</button>
            </form>
            <p>{status}</p>
        </div>
    );
};

export default EmailForm;

