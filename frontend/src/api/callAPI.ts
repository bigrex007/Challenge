import axios from 'axios';

const callAPI = axios.create({
  baseURL: 'http://localhost:3000/',
  withCredentials: true,
});

export default callAPI;