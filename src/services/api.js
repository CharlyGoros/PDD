import axios from 'axios';
import { Category, User, ArtWork } from '../types/models';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api-pdd.netlify.app/.netlify/functions/server/';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const createCategory = async () => {
    try {
        const { data } = await api.post('/categories');
        return new Category(data);
    } catch (error) {
        console.error('Error creating category:', error);
        throw error;
    }
};

export const getCategoryById = async (id) => {
    try {
        const { data } = await api.get(`/categories/${id}`);
        return new Category(data);
    } catch (error) {
        console.error(`Error fetching category ${id}:`, error);
        throw error;
    }
};

export const getCategories = async (token) => {
    try {
        const response = await api.get('/categories', {
            headers: {
                authorization: token,
            },
        });
        console.log(response);
        return response['data']['data'].map(category => new Category(category));
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

export const updateCategory = async (id, updatedCategory) => {
    try {
        const { data } = await api.put(`/categories/${id}`, updatedCategory);
        return new Category(data);
    } catch (error) {
        console.error(`Error updating category ${id}:`, error);
        throw error;
    }
};

export const deleteCategoryById = async (id) => {
    try {
        await api.delete(`/categories/${id}`);
    } catch (error) {
        console.error(`Error deleting category ${id}:`, error);
        throw error;
    }
};

export const deleteAllCategories = async () => {
    try {
        await api.delete('/categories');
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

export const getUserById = async (id) => {
    try {
        const { data } = await api.get(`/users/${id}`);
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
                authorization: token,
            },
        });
        return data['data'].map(user => new User(user));
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const updateUser = async (id, updatedUser) => {
    try {
        const { data } = await api.put(`/users/${id}`, updatedUser);
        return new User(data);
    } catch (error) {
        console.error(`Error updating user ${id}:`, error);
        throw error;
    }
};

export const deleteUserById = async (id) => {
    try {
        await api.delete(`/users/${id}`);
    } catch (error) {
        console.error(`Error deleting user ${id}:`, error);
        throw error;
    }
};

export const deleteAllUsers = async () => {
    try {
        await api.delete('/users');
    } catch (error) {
        console.error('Error deleting all users:', error);
        throw error;
    }
};

export const makeUserAdmin = async (id) => {
    try {
        await api.post(`/users/${id}/makeAdmin`);
    } catch (error) {
        console.error(`Error making user ${id} admin:`, error);
        throw error;
    }
};

export const makeUserGuest = async (id) => {
    try {
        await api.post(`/users/${id}/makeGuest`);
    } catch (error) {
        console.error(`Error making user ${id} guest:`, error);
        throw error;
    }
};

export const createArtwork = async (categoryId, artworkData) => {
    try {
        const { data } = await api.post(`/categories/${categoryId}/artworks`, artworkData);
        return new ArtWork(data);
    } catch (error) {
        console.error(`Error creating artwork in category ${categoryId}:`, error);
        throw error;
    }
};

export const getArtworksByCategory = async (categoryId) => {
    try {
        const { data } = await api.get(`/categories/${categoryId}/artworks`);
        return data.map(artwork => new ArtWork(artwork));
    } catch (error) {
        console.error(`Error fetching artworks for category ${categoryId}:`, error);
        throw error;
    }
};

export const getArtworkById = async (categoryId, artworkId) => {
    try {
        const { data } = await api.get(`/categories/${categoryId}/artworks/${artworkId}`);
        return new ArtWork(data);
    } catch (error) {
        console.error(`Error fetching artwork ${artworkId} in category ${categoryId}:`, error);
        throw error;
    }
};

export const updateArtwork = async (categoryId, artworkId, updatedArtwork) => {
    try {
        const { data } = await api.put(`/categories/${categoryId}/artworks/${artworkId}`, updatedArtwork);
        return new ArtWork(data);
    } catch (error) {
        console.error(`Error updating artwork ${artworkId} in category ${categoryId}:`, error);
        throw error;
    }
};

export const deleteArtworkById = async (categoryId, artworkId) => {
    try {
        await api.delete(`/categories/${categoryId}/artworks/${artworkId}`);
    } catch (error) {
        console.error(`Error deleting artwork ${artworkId} in category ${categoryId}:`, error);
        throw error;
    }
};

export const deleteAllArtworks = async (categoryId) => {
    try {
        await api.delete(`/categories/${categoryId}/artworks`);
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
