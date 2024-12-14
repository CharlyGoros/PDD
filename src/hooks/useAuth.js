import { create } from 'zustand';
import { login } from '../services/api';

const useAuth = create((set) => ({
  user: null,
  token: null,
  loading: false,
  error: null,

  login: async (formData) => {
    set({ loading: true, error: null });
    try {
      const response = await login(formData);
      const user = response['data']['data']['user'];
      const token = response['data']['data']['token'];
      set({ user: user, loading: false });
      set({ token: token, loading: false });


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