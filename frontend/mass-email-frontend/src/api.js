// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Replace with your backend URL

export const getTemplates = () => axios.get(`${API_URL}/templates`);
export const getTemplate = (id) => axios.get(`${API_URL}/templates/${id}`);
export const createTemplate = (data) => axios.post(`${API_URL}/templates`, data);
export const updateTemplate = (id, data) => axios.put(`${API_URL}/templates/${id}`, data);
export const deleteTemplate = (id) => axios.delete(`${API_URL}/templates/${id}`);

export const getRecipients = () => axios.get(`${API_URL}/recipients`);
export const getRecipient = (id) => axios.get(`${API_URL}/recipients/${id}`);
export const createRecipient = (data) => axios.post(`${API_URL}/recipients`, data);
export const updateRecipient = (id, data) => axios.put(`${API_URL}/recipients/${id}`, data);
export const deleteRecipient = (id) => axios.delete(`${API_URL}/recipients/${id}`);

export const sendEmail = (data) => axios.post(`${API_URL}/send-email`, data);
    