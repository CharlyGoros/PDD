import React, { useEffect, useState } from "react";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                //const response = await fetch("http://localhost:3001/getUsers"); // Reemplaza con tu URL de API
                const response = await fetch('http://localhost:3001/getUsers', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },

                });
                if (!response.ok) {
                    throw new Error("Error al obtener los usuarios");
                }
                const data = await response.json();
                setUsers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <div>Cargando usuarios...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Lista de Usuarios</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} - {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;