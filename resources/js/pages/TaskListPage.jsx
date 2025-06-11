import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import StatusBadge from '../components/StatusBadge';
import TaskItem from '../components/TaskItem';
import ConfirmModal from '../components/ConfirmModal';

const TaskListPage = () => {
    const [tasks, setTasks] = useState([]);
    const { token, logout } = useAuth();

    const fetchTasks = async () => {
        const res = await api.get('/tasks', {
            headers: { Authorization: `Bearer ${token}` }
        });
        setTasks(res.data);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const [showConfirm, setShowConfirm] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const confirmDelete = (id) => {
        setDeleteId(id);
        setShowConfirm(true);
    };

    const handleDelete = async (id) => {
        await api.delete(`/tasks/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setShowConfirm(false);
        fetchTasks();
    };

    const statusColors = {
        to_do: 'bg-gray-200 text-gray-800',
        in_progress: 'bg-yellow-200 text-yellow-800',
        done: 'bg-green-200 text-green-800',
    };

    return (
        <Layout title="Tasks">
            <Link
                to="/tasks/create"
                className="bg-green-600 text-white px-4 py-2 rounded mb-3 inline-block"
            >
                + Create Task
            </Link>
            <ul className="space-y-2">
                {tasks.map(task => (
                    <TaskItem key={task.id} task={task} onDelete={confirmDelete} />
                ))}
            </ul>
            <ConfirmModal
                open={showConfirm}
                onClose={() => setShowConfirm(false)}
                onConfirm={() => handleDelete(deleteId)}
                message="Are you sure you want to delete this task?"
            />
        </Layout>
    );
};

export default TaskListPage;
