import axios from 'axios';

const API_URL = 'http://localhost:8080/api/provider';

// Helper to get auth headers
const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

// Helper to get providerId (userId) from localStorage
const getProviderIdFromStorage = () => {
    const userId = localStorage.getItem('userId');
    return userId ? parseInt(userId, 10) : null;
};

const providerApi = {
    getProviderId: getProviderIdFromStorage,

    // User Profile Settings
    getProviderProfile: async (id) => {
        const response = await axios.get(`http://localhost:8080/api/users/${id}`, getAuthHeaders());
        return response.data;
    },
    updateProviderProfile: async (id, profileData) => {
        const response = await axios.put(`http://localhost:8080/api/users/${id}`, profileData, getAuthHeaders());
        return response.data;
    },

    // Services
    getServices: async (providerId) => {
        const response = await axios.get(`${API_URL}/services?providerId=${providerId}`, getAuthHeaders());
        return response.data;
    },
    createService: async (serviceData) => {
        const response = await axios.post(`${API_URL}/services`, serviceData, getAuthHeaders());
        return response.data;
    },
    updateService: async (id, serviceData) => {
        const response = await axios.put(`${API_URL}/services/${id}`, serviceData, getAuthHeaders());
        return response.data;
    },
    deleteService: async (id) => {
        const response = await axios.delete(`${API_URL}/services/${id}`, getAuthHeaders());
        return response.data;
    },

    // Bookings
    getBookings: async (providerId) => {
        const response = await axios.get(`${API_URL}/bookings?providerId=${providerId}`, getAuthHeaders());
        return response.data;
    },
    updateBookingStatus: async (id, status) => {
        const response = await axios.put(`${API_URL}/bookings/${id}/status?status=${status}`, {}, getAuthHeaders());
        return response.data;
    },

    // Events
    getEvents: async (providerId) => {
        const response = await axios.get(`${API_URL}/events?providerId=${providerId}`, getAuthHeaders());
        return response.data;
    },
    createEvent: async (eventData) => {
        const response = await axios.post(`${API_URL}/events`, eventData, getAuthHeaders());
        return response.data;
    },
    updateEvent: async (id, eventData) => {
        const response = await axios.put(`${API_URL}/events/${id}`, eventData, getAuthHeaders());
        return response.data;
    },
    deleteEvent: async (id) => {
        const response = await axios.delete(`${API_URL}/events/${id}`, getAuthHeaders());
        return response.data;
    },

    // Promotions
    getPromotions: async (providerId) => {
        const response = await axios.get(`${API_URL}/promotions?providerId=${providerId}`, getAuthHeaders());
        return response.data;
    },
    createPromotion: async (promotionData) => {
        const response = await axios.post(`${API_URL}/promotions`, promotionData, getAuthHeaders());
        return response.data;
    },
    deletePromotion: async (id) => {
        const response = await axios.delete(`${API_URL}/promotions/${id}`, getAuthHeaders());
        return response.data;
    }
};

export default providerApi;
