import React from 'react';

const sendEmail = async () => {
  const response = await fetch('http://localhost:5000/send-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      subject: 'Test Subject',
      recipient: 'test@example.com',
      body: 'This is a test email body.',
    }),
  });

  const result = await response.json();
  console.log(result);
};


export default SendEmail;

