import { useState } from 'react';
import { Link } from 'react-router-dom';
import { createUser } from '../../services/api'; // Asegúrate de ajustar la ruta según tu estructura de carpetas.

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar contraseñas coincidan
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      // Llamar a la API para registrar al usuario
      await createUser({
        name: formData.name,
        lastName: formData.lastname,
        email: formData.email,
        password: formData.password,
        age: formData.age,
      });

      setSuccess(true); // Mostrar mensaje de éxito
      setError(null); // Limpiar errores
      setFormData({ name: '', lastname: '', email: '', password: '', confirmPassword: '', age: '' }); // Limpiar formulario
    } catch (err) {
      setError('Failed to register user. Please try again.');
      console.error('Registration error:', err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Crear una cuenta</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">¡Registro exitoso!</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastname" className="form-label">Apellido</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              className="form-control"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="age" className="form-label">Edad</label>
            <input
              type="number"
              id="age"
              name="age"
              className="form-control"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="form-control"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Registrar</button>
        </form>
        <p className="text-center mt-3">
        ¿Ya tienes una cuenta? <Link to="/login" className="text-primary">Iniciar Sesion</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
