import axios from 'axios';
import { envConfig } from './envConfig';

const apiClient = axios.create({
    baseURL: `${envConfig.API_BASE_URL}/api`,
    timeout: 130000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export default apiClient;
