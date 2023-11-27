import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', 
  headers: {
    'Content-Type': 'application/json',
  },
});



export const getTooltip = (data) => api.get('/tooltip', data);
export const getSummarize = (data) => api.get('/summarize', data);

export default {getTooltip, getSummarize, api};