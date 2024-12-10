import { create } from 'zustand';
import { loginUser, registerUser } from '../services/api';

const useAuth = create((set) => ({
  user: null,
  loading: false,
  error: null,
  
  login: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const user = await loginUser(credentials);
      set({ user, loading: false });
      return user;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  register: async (userData) => {
    set({ loading: true, error: null });
    try {
      const user = await registerUser(userData);
      set({ user, loading: false });
      return user;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  logout: () => {
    set({ user: null, error: null });
  },
}));

export default useAuth;