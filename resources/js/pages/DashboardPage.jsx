import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const DashboardPage = () => {
    return (
        <Layout title="Dashboard">
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                <Link to="/tasks" className="bg-blue-600 text-white p-6 rounded-xl shadow hover:bg-blue-700 transition">
                    <h2 className="text-xl font-bold">Manage Tasks</h2>
                    <p className="text-sm mt-2">View, create, and manage your tasks.</p>
                </Link>

                <Link to="/users" className="bg-green-600 text-white p-6 rounded-xl shadow hover:bg-green-700 transition">
                    <h2 className="text-xl font-bold">Manage Users</h2>
                    <p className="text-sm mt-2">View and manage registered users.</p>
                </Link>
            </div>
        </Layout>
    );
};

export default DashboardPage;
