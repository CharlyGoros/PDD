import { useState, useEffect } from 'react';
import {  getUsers, makeUserAdmin, deleteUserById } from '../../../services/api';
import './UserManagement.css';
import useAuth from '../../../hooks/useAuth';
const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const { token } = useAuth();
  const loadUsers = async () => {
    try {
      const response = await getUsers(token);
      console.log(response);
      setUsers(response['data']);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, makeAdmin) => {
    try {
      await makeUserAdmin(userId, makeAdmin);
      await loadUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    
    try {
      await deleteUserById(userId);
      await loadUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="loading">Loading users...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="user-management">
      <h2>User Management</h2>
      <div className="user-list">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name} {user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.role === 1 ? 'Admin' : 'Guest'}</td>
                <td>
                  <button
                    onClick={() => handleRoleChange(user._id, user.role === 0)}
                    className="role-button"
                  >
                    Make {user.role === 1 ? 'Guest' : 'Admin'}
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default UserManagement;