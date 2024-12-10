import axios from 'axios';
import { Category, ArtWork, User } from '../types/models';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api-pdd.netlify.app/.netlify/functions/server/';
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchCategories = async () => {
  try {
    const { data } = await api.get('/categories');
    return data.map(category => new Category(category));
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const fetchCategoryById = async (id) => {
  try {
    const { data } = await api.get(`/categories/${id}`);
    return new Category(data);
  } catch (error) {
    console.error(`Error fetching category ${id}:`, error);
    throw error;
  }
};

export const fetchArtWorksByCategory = async (categoryId) => {
  try {
    const { data } = await api.get(`/categories/${categoryId}/artworks`);
    return data.map(artwork => new ArtWork(artwork));
  } catch (error) {
    console.error('Error fetching artworks:', error);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const { data } = await api.post('/auth/login', credentials);
    return new User(data);
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const { data } = await api.post('/auth/register', userData);
    return new User(data);
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};