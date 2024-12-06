import axios from 'axios';

const API_BASE_URL = 'YOUR_API_BASE_URL';

export const fetchCollections = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/collections`);
    return response.data;
  } catch (error) {
    console.error('Error fetching collections:', error);
    throw error;
  }
};