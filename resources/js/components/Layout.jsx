import React from 'react';
import { useAuth } from '../context/AuthContext';
import FlashMessage from './FlashMessage';
import { useNavigate } from 'react-router-dom';

const Layout = ({ title, children }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <FlashMessage />
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">{title}</h1>
                <button onClick={handleLogout} className="text-red-500">Logout</button>
            </div>
            <div>{children}</div>
        </div>
    );
};

export default Layout;
