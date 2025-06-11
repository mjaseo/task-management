import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';

const UserFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useAuth();
    const isEdit = Boolean(id);

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isEdit) {
            api.get(`/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            }).then((res) => {
                setForm({ ...res.data, password: '' });
                console.log('User response:', res.data);
            });
        }
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        try {
            if (isEdit) {
                await api.put(`/users/${id}`, form, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            } else {
                await api.post('/users', form, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            }
            navigate('/users');
        } catch (err) {
            if (err.response?.data?.errors) {
                setErrors(err.response.data.errors);
            }
        }
    };

    return (
        <Layout title={isEdit ? 'Edit User' : 'Create User'}>
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded shadow">
                <div className="mb-4">
                    <label className="block font-semibold mb-1">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name[0]}</p>}
                </div>

                <div className="mb-4">
                    <label className="block font-semibold mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email[0]}</p>}
                </div>

                <div className="mb-4">
                    <label className="block font-semibold mb-1">
                        Password {isEdit && <span className="text-sm text-gray-500">(Leave blank to keep)</span>}
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        placeholder={isEdit ? '••••••••' : ''}
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password[0]}</p>}
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    {isEdit ? 'Update' : 'Create'}
                </button>
            </form>
        </Layout>
    );
};

export default UserFormPage;
