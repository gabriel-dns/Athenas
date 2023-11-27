import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8080', 
  headers: {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*"
  },
});

export const getTooltip = (data) => api.post('/tooltip', data);
export const getSummarize = (data) => api.post('/summarize', data);

export default { getTooltip, getSummarize, api };