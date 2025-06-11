import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);
    const [token, setToken] = useState(() => localStorage.getItem('token') || null);

    const login = async ({ email, password }) => {
        const res = await axios.post('/api/login', { email, password });
        const token = res.data.token;
        localStorage.setItem('token', token);
        setToken(token);
    };


    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    const contextValue = { user, token, login, logout };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
