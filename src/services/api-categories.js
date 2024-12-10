import axios from 'axios';
import { Category } from '../types/models';

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

export const getCategories = async () => {
    try {
        const { data } = await api.get('/categories');
        return data.map(category => new Category(category));
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
        console.log(`Category ${id} deleted successfully.`);
    } catch (error) {
        console.error(`Error deleting category ${id}:`, error);
        throw error;
    }
};

export const deleteAllCategories = async () => {
    try {
        await api.delete('/categories');
        console.log('All categories deleted successfully.');
    } catch (error) {
        console.error('Error deleting all categories:', error);
        throw error;
    }
};
