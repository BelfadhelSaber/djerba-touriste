import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

const adminService = {
    // Statistics
    getStats: async () => {
        const response = await axios.get(`${BASE_URL}/admin/stats`, getAuthHeaders());
        return response.data;
    },

    // User Management
    getAllUsers: async () => {
        const response = await axios.get(`${BASE_URL}/users`, getAuthHeaders());
        return response.data;
    },

    updateUserStatus: async (id, status) => {
        const response = await axios.patch(`${BASE_URL}/users/${id}/status?status=${status}`, {}, getAuthHeaders());
        return response.data;
    },

    deleteUser: async (id) => {
        const response = await axios.delete(`${BASE_URL}/users/${id}`, getAuthHeaders());
        return response.data;
    }
};

export default adminService;
