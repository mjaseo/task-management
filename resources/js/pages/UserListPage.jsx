import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import ConfirmModal from '../components/ConfirmModal';
import Layout from '../components/Layout';

const UserListPage = () => {
    const { token } = useAuth();
    const [users, setUsers] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const fetchUsers = async () => {
        const res = await api.get('/users', {
            headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data.data);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const confirmDelete = (id) => {
        setDeleteId(id);
        setShowConfirm(true);
    };

    const handleDelete = async () => {
        await api.delete(`/users/${deleteId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setShowConfirm(false);
        fetchUsers();
    };

    return (
        <Layout title="Users">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">User List</h2>
                <Link
                    to="/users/create"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    + Create User
                </Link>
            </div>

            <div className="bg-white shadow rounded">
                <table className="w-full text-left">
                    <thead className="bg-gray-100 text-gray-700">
                    <tr>
                        <th className="p-3">ID</th>
                        <th className="p-3">Name</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="border-t">
                            <td className="p-3">{user.id}</td>
                            <td className="p-3">{user.name}</td>
                            <td className="p-3">{user.email}</td>
                            <td className="p-3 space-x-2">
                                <Link
                                    to={`/users/${user.id}/edit`}
                                    className="text-blue-600 hover:underline"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => confirmDelete(user.id)}
                                    className="text-red-600 hover:underline"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <ConfirmModal
                open={showConfirm}
                onClose={() => setShowConfirm(false)}
                onConfirm={handleDelete}
                message="Are you sure you want to delete this user?"
            />
        </Layout>
    );
};

export default UserListPage;
