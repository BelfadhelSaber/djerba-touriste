import axios from 'axios';

const API_URL = 'http://localhost:8080/api/public';

const publicApi = {
    getAllServices: async () => {
        const response = await axios.get(`${API_URL}/services`);
        return response.data;
    },
    getServicesByCategory: async (category) => {
        const response = await axios.get(`${API_URL}/services/category/${category}`);
        return response.data;
    },
    getServicesByType: async (type) => {
        const response = await axios.get(`${API_URL}/services/type/${type}`);
        return response.data;
    }
};

export default publicApi;
