import  { useState, useEffect } from 'react';
import { User, Role, Category, ArtWork } from '../models';

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState('users');
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [artworks, setArtworks] = useState([]);

    const [userForm, setUserForm] = useState({
        name: '',
        lastName: '',
        email: '',
        age: '',
        role: Role.GUEST,
    });

    const [categoryForm, setCategoryForm] = useState({
        title: '',
        description: '',
        image: '',
    });

    const [artworkForm, setArtworkForm] = useState({
        title: '',
        description: '',
        images: '',
    });

    useEffect(() => {
        // Simular llamadas a API
        const fetchData = async () => {
            setUsers([]); // Simula usuarios
            setCategories([]); // Simula categorías
            setArtworks([]); // Simula obras de arte
        };
        fetchData();
    }, []);

    // Manejadores para formularios
    const handleUserSubmit = (e) => {
        e.preventDefault();
        setUsers([...users, new User({ _id: Date.now().toString(), ...userForm })]);
        setUserForm({ name: '', lastName: '', email: '', age: '', role: Role.GUEST });
    };

    const handleCategorySubmit = (e) => {
        e.preventDefault();
        setCategories([...categories, new Category({ _id: Date.now().toString(), ...categoryForm })]);
        setCategoryForm({ title: '', description: '', image: '' });
    };

    const handleArtworkSubmit = (e) => {
        e.preventDefault();
        const imagesArray = artworkForm.images.split(',').map(img => img.trim());
        setArtworks([...artworks, new ArtWork({ _id: Date.now().toString(), ...artworkForm, images: imagesArray })]);
        setArtworkForm({ title: '', description: '', images: '' });
    };

    const handleChange = (e, formSetter, formState) => {
        const { name, value } = e.target;
        formSetter({ ...formState, [name]: value });
    };

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Admin Panel</h1>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'users' ? 'active' : ''}`}
                        onClick={() => setActiveTab('users')}
                    >
                        Users
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'categories' ? 'active' : ''}`}
                        onClick={() => setActiveTab('categories')}
                    >
                        Categories
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'artworks' ? 'active' : ''}`}
                        onClick={() => setActiveTab('artworks')}
                    >
                        ArtWorks
                    </button>
                </li>
            </ul>

            <div className="tab-content mt-4">
                {/* Users Section */}
                {activeTab === 'users' && (
                    <>
                        <h2>Manage Users</h2>
                        <form onSubmit={handleUserSubmit} className="mb-4">
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label">First Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        value={userForm.name}
                                        onChange={(e) => handleChange(e, setUserForm, userForm)}
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        className="form-control"
                                        value={userForm.lastName}
                                        onChange={(e) => handleChange(e, setUserForm, userForm)}
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        value={userForm.email}
                                        onChange={(e) => handleChange(e, setUserForm, userForm)}
                                        required
                                    />
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label">Age</label>
                                    <input
                                        type="number"
                                        name="age"
                                        className="form-control"
                                        value={userForm.age}
                                        onChange={(e) => handleChange(e, setUserForm, userForm)}
                                        required
                                    />
                                </div>
                                <div className="col-md-3">
                                    <label className="form-label">Role</label>
                                    <select
                                        name="role"
                                        className="form-select"
                                        value={userForm.role}
                                        onChange={(e) => handleChange(e, setUserForm, userForm)}
                                    >
                                        <option value={Role.GUEST}>Guest</option>
                                        <option value={Role.ADMIN}>Admin</option>
                                    </select>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary mt-3">Add User</button>
                        </form>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Age</th>
                                    <th>Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user._id}>
                                        <td>{user.name} {user.lastName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.age}</td>
                                        <td>{user.role === Role.ADMIN ? 'Admin' : 'Guest'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}

                {/* Categories Section */}
                {activeTab === 'categories' && (
                    <>
                        <h2>Manage Categories</h2>
                        <form onSubmit={handleCategorySubmit} className="mb-4">
                            <div className="mb-3">
                                <label className="form-label">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    className="form-control"
                                    value={categoryForm.title}
                                    onChange={(e) => handleChange(e, setCategoryForm, categoryForm)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <textarea
                                    name="description"
                                    className="form-control"
                                    value={categoryForm.description}
                                    onChange={(e) => handleChange(e, setCategoryForm, categoryForm)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Image URL</label>
                                <input
                                    type="text"
                                    name="image"
                                    className="form-control"
                                    value={categoryForm.image}
                                    onChange={(e) => handleChange(e, setCategoryForm, categoryForm)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Add Category</button>
                        </form>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Image</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map(category => (
                                    <tr key={category._id}>
                                        <td>{category.title}</td>
                                        <td>{category.description}</td>
                                        <td><img src={category.image} alt={category.title} style={{ width: '100px' }} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}

                {/* ArtWorks Section */}
                {activeTab === 'artworks' && (
                    <>
                        <h2>Manage ArtWorks</h2>
                        <form onSubmit={handleArtworkSubmit} className="mb-4">
                            <div className="mb-3">
                                <label className="form-label">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    className="form-control"
                                    value={artworkForm.title}
                                    onChange={(e) => handleChange(e, setArtworkForm, artworkForm)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <textarea
                                    name="description"
                                    className="form-control"
                                    value={artworkForm.description}
                                    onChange={(e) => handleChange(e, setArtworkForm, artworkForm)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Image URLs (comma-separated)</label>
                                <input
                                    type="text"
                                    name="images"
                                    className="form-control"
                                    value={artworkForm.images}
                                    onChange={(e) => handleChange(e, setArtworkForm, artworkForm)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Add Artwork</button>
                        </form>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Images</th>
                                </tr>
                            </thead>
                            <tbody>
                                {artworks.map(artwork => (
                                    <tr key={artwork._id}>
                                        <td>{artwork.title}</td>
                                        <td>{artwork.description}</td>
                                        <td>{artwork.images.join(', ')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminPanel;
