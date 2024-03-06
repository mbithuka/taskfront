import axios from 'axios';

const instance = axios.create({
 base: process.env.REACT_APP_API_BASE_URL
});

export default instance;
