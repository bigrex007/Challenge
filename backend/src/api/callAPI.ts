import axios from 'axios';

const callAPI = axios.create({
  baseURL: 'http://localhost:3500/',
  withCredentials: true,
});

export default callAPI;
