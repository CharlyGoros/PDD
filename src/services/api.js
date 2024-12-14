import axios from 'axios';
import { Category, User, ArtWork } from '../types/models';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api-pdd.netlify.app/.netlify/functions/server/';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const createCategory = async (token) => {
    try {
        const { data } = await api.post('/categories', {
            headers: {
                'authorization': 'Bearer ' + token,
            },
        });
        return new Category(data);
    } catch (error) {
        console.error('Error creating category:', error);
        throw error;
    }
};

export const getCategoryById = async (id) => {
    try {
        const { data } = await api.get(`/categories/${id}`);
        return data;
    } catch (error) {
        console.error(`Error fetching category ${id}:`, error);
        throw error;
    }
};

export const getCategories = async () => {
    try {
        const { data } = await api.get('/categories');
        return data['data'].map(category => new Category(category));
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

export const updateCategory = async (token, id, updatedCategory) => {
    try {
        const { data } = await api.put(`/categories/${id}`, updatedCategory, {
            headers: {
                'authorization': 'Bearer ' + token,
            },
        });
        return new Category(data);
    } catch (error) {
        console.error(`Error updating category ${id}:`, error);
        throw error;
    }
};

export const deleteCategoryById = async (token, id) => {
    try {
        await api.delete(`/categories/${id}`, {
            headers: {
                'authorization': 'Bearer ' + token,
            },
        });
    } catch (error) {
        console.error(`Error deleting category ${id}:`, error);
        throw error;
    }
};

export const deleteAllCategories = async (token) => {
    try {
        await api.delete('/categories', {
            headers: {
                'authorization': 'Bearer ' + token,
            },
        });
    } catch (error) {
        console.error('Error deleting all categories:', error);
        throw error;
    }
};

export const createUser = async (userData) => {
    try {
        await api.post('/users', userData);
        return;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export const getUserById = async (token, id) => {
    try {
        const { data } = await api.get(`/users/${id}`, {
            headers: {
                'authorization': 'Bearer ' + token,
            },
        });
        return new User(data);
    } catch (error) {
        console.error(`Error fetching user ${id}:`, error);
        throw error;
    }
};
export const getUsers = async (token) => {
    try {
        const { data } = await api.get('/users', {
            headers: {
                'authorization': 'Bearer ' + token,
            },
        });
        return data['data'].map(user => new User(user));
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const updateUser = async (token, id, updatedUser) => {
    try {
        const { data } = await api.put(`/users/${id}`, updatedUser, {
            headers: {
                'authorization': 'Bearer ' + token,
            },
        });
        return new User(data);
    } catch (error) {
        console.error(`Error updating user ${id}:`, error);
        throw error;
    }
};

export const deleteUserById = async (token, id) => {
    try {
        await api.delete(`/users/${id}`, {
            headers: {
                'authorization': 'Bearer ' + token,
            },
        });
    } catch (error) {
        console.error(`Error deleting user ${id}:`, error);
        throw error;
    }
};

export const deleteAllUsers = async (token) => {
    try {
        await api.delete('/users', {
            headers: {
                'authorization': 'Bearer ' + token,
            },
        });
    } catch (error) {
        console.error('Error deleting all users:', error);
        throw error;
    }
};
export const makeUserAdmin = async (token, id) => {
    try {
        const { data } = await api.put(
            `/users/${id}/makeAdmin`,
            {},
            {
                headers: {
                    'authorization': 'Bearer ' + token,
                },
            }
        );
        return data;
    } catch (error) {
        console.error(`Error making user ${id} admin:`, error);
        throw error;
    }
};

export const makeUserGuest = async (token, id) => {
    try {
        console.log(token);
        await api.put(
            `/users/${id}/makeGuest`,
            {},
            {
                headers: {
                    'authorization': 'Bearer ' + token,
                },
            }
        );
    } catch (error) {
        console.error(`Error making user ${id} guest:`, error);
        throw error;
    }
};

export const createArtwork = async (token, categoryId, artworkData) => {
    try {
        const { data } = await api.post(`/categories/${categoryId}/artworks`, artworkData, {
            headers: {
                'authorization': 'Bearer ' + token,
            },
        });
        return new ArtWork(data);
    } catch (error) {
        console.error(`Error creating artwork in category ${categoryId}:`, error);
        throw error;
    }
};

export const getArtworksByCategory = async (token, categoryId) => {
    try {
        const { data } = await api.get(`/categories/${categoryId}/artworks`, {
            headers: {
                'authorization': 'Bearer ' + token,
            },
        });
        if (!data['data']) return [];
        return data['data'].map(artwork => new ArtWork(artwork));
    } catch (error) {
        console.error(`Error fetching artworks for category ${categoryId}:`, error);
        throw error;
    }
};

export const getArtworkById = async (token, categoryId, artworkId) => {
    try {
        const { data } = await api.get(`/categories/${categoryId}/artworks/${artworkId}`, {
            headers: {
                'authorization': 'Bearer ' + token,
            },
        });
        return new ArtWork(data);
    } catch (error) {
        console.error(`Error fetching artwork ${artworkId} in category ${categoryId}:`, error);
        throw error;
    }
};

export const updateArtwork = async (token, categoryId, artworkId, updatedArtwork) => {
    try {
        const { data } = await api.put(`/categories/${categoryId}/artworks/${artworkId}`, updatedArtwork, {
            headers: {
                'authorization': 'Bearer ' + token,
            },
        });
        return new ArtWork(data);
    } catch (error) {
        console.error(`Error updating artwork ${artworkId} in category ${categoryId}:`, error);
        throw error;
    }
};

export const deleteArtworkById = async (token, categoryId, artworkId) => {
    try {
        await api.delete(`/categories/${categoryId}/artworks/${artworkId}`, {
            headers: {
                'authorization': 'Bearer ' + token,
            },
        });
    } catch (error) {
        console.error(`Error deleting artwork ${artworkId} in category ${categoryId}:`, error);
        throw error;
    }
};

export const deleteAllArtworks = async (token, categoryId) => {
    try {
        await api.delete(`/categories/${categoryId}/artworks`, {
            headers: {
                'authorization': 'Bearer ' + token,
            },
        });
    } catch (error) {
        console.error(`Error deleting all artworks in category ${categoryId}:`, error);
        throw error;
    }
};
export const login = async (formData) => {
    try {

        const email = formData['formData']['email'];

        const password = formData['formData']['password'];

        const response = await api.post(`/login`, { email, password });

        return response;
    } catch (error) {
        console.error(`Error logging in`, error);
        throw error;
    }
};
