import { create } from 'zustand';
import { login } from '../services/api';

// Recuperar datos del usuario y token desde Local Storage al cargar
const getStoredAuthData = () => {
  const storedUser = localStorage.getItem('user');
  const storedToken = localStorage.getItem('token');
  return {
    user: storedUser ? JSON.parse(storedUser) : null,
    token: storedToken || null,
  };
};

const useAuth = create((set) => ({
  // Estado inicial con datos recuperados desde Local Storage
  ...getStoredAuthData(),
  loading: false,
  error: null,

  // Iniciar sesión
  login: async (formData) => {
    set({ loading: true, error: null });
    try {
      const response = await login(formData);
      const user = response['data']['data']['user'];
      const token = response['data']['data']['token'];

      // Actualizar estado
      set({ user, token, loading: false });

      // Guardar en Local Storage
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);

      return user;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Cerrar sesión
  logout: () => {
    // Limpiar estado
    set({ user: null, token: null, error: null });

    // Eliminar datos de Local Storage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  },
}));

export default useAuth;
