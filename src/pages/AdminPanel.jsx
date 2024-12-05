import React from 'react';
import UserList from '../components/UserList';

const AdminPanel = () => {
    return (
        <div>
            <h1>Admin Panel</h1>
            <p>Here you can manage users and content.</p>
            <UserList />
        </div>
    );
};

export default AdminPanel;
