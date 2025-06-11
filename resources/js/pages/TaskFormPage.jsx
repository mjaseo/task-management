import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useFlash } from '../context/FlashMessageContext';

const TaskFormPage = () => {
    const [errors, setErrors] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useAuth();
    const [form, setForm] = useState({
        title: '', description: '', status: 'to_do', due_date: '', user_id: '', attachment: null,
    });
    const [users, setUsers] = useState([]);
    const { showMessage } = useFlash();

    const fetchUsers = async () => {
        try {
            const res = await api.get('/users', {
                headers: { Authorization: `Bearer ${token}` }
            });

            const userData = Array.isArray(res.data) ? res.data : res.data.data ?? [];
            setUsers(userData);
        } catch (err) {
            console.error("Failed to load users:", err);
            setUsers([]);
        }
    };

    const fetchTask = async () => {
        const res = await api.get(`/tasks/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setForm(res.data);
    };

    useEffect(() => {
        fetchUsers();
        if (id) fetchTask();
    }, []);

    const handleChange = e => {
        const { name, value, files } = e.target;
        setForm(prev => ({ ...prev, [name]: files ? files[0] : value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setErrors({}); // Clear previous errors

        try {
            const payload = new FormData();
            Object.entries(form).forEach(([key, val]) => {
                if (val !== null) payload.append(key, val);
            });

            if (id) {
                await api.post(`/tasks/${id}?_method=PUT`, payload, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
            } else {
                await api.post('/tasks', payload, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }

            navigate('/tasks');
        } catch (err) {
            if (err.response?.status === 422) {
                setErrors(err.response.data.errors);
            } else {
                console.error("Unexpected error:", err);
                alert("Something went wrong.");
            }
        }
    };


    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
                <h1 className="text-2xl font-bold mb-6">{id ? "Edit Task" : "Create Task"}</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Title"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title[0]}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Description"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description[0]}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Status</label>
                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >
                            <option value="to_do">To Do</option>
                            <option value="in_progress">In Progress</option>
                            <option value="done">Done</option>
                        </select>
                        {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status[0]}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Due Date</label>
                        <input
                            type="date"
                            name="due_date"
                            value={form.due_date ?? ''}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        {errors.due_date && <p className="text-red-500 text-sm mt-1">{errors.due_date[0]}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Assign to</label>
                        <select
                            name="user_id"
                            value={form.user_id}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >
                            <option value="">-- Select User --</option>
                            {users.map(u => (
                                <option key={u.id} value={u.id}>{u.name}</option>
                            ))}
                        </select>
                        {errors.user_id && <p className="text-red-500 text-sm mt-1">{errors.user_id[0]}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Attachment</label>
                        <input
                            type="file"
                            name="attachment"
                            onChange={handleChange}
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-indigo-600 file:text-white hover:file:bg-indigo-700"
                        />
                        {errors.attachment && <p className="text-red-500 text-sm mt-1">{errors.attachment[0]}</p>}
                    </div>

                    <div className="text-right">
                        <button
                            type="submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                        >
                            Create Task
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default TaskFormPage;
