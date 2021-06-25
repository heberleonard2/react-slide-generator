import axios from 'axios';

const api = axios.create({
  baseURL: 'https://slide-generator-backend.herokuapp.com'
});

export default api;
