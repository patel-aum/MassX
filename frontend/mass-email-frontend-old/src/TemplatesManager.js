import React, { useState, useEffect } from 'react';

function TemplatesManager() {
    const [templates, setTemplates] = useState([]);
    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');

    useEffect(() => {
        fetchTemplates();
    }, []);

    const fetchTemplates = async () => {
        const response = await fetch('http://127.0.0.1:5000/templates');
        const data = await response.json();
        setTemplates(data);
    };

    const createTemplate = async () => {
        const response = await fetch('http://127.0.0.1:5000/templates', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, subject, body }),
        });
        if (response.ok) {
            fetchTemplates();
            setName('');
            setSubject('');
            setBody('');
        }
    };

    const deleteTemplate = async (templateId) => {
        const response = await fetch(`http://127.0.0.1:5000/templates/${templateId}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            fetchTemplates();
        }
    };

    return (
        <div>
            <h2>Manage Email Templates</h2>
            <input
                type="text"
                placeholder="Template Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
            />
            <textarea
                placeholder="Body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
            ></textarea>
            <button onClick={createTemplate}>Create Template</button>

            <h3>Existing Templates</h3>
            <ul>
                {templates.map((template) => (
                    <li key={template.id}>
                        <strong>{template.name}</strong> - {template.subject}
                        <button onClick={() => deleteTemplate(template.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TemplatesManager;

