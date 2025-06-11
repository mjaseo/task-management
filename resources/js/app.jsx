import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { FlashMessageProvider } from './context/FlashMessageContext';
import TaskApp from './components/TaskApp';
import TaskListPage from './pages/TaskListPage';
import TaskFormPage from './pages/TaskFormPage';
import LoginPage from './pages/LoginPage';
import UserListPage from './pages/UserListPage';
import UserFormPage from './pages/UserFormPage';
import DashboardPage from './pages/DashboardPage';

const App = () => (
    <BrowserRouter>
        <AuthProvider>
            <FlashMessageProvider>
                <Routes>
                    <Route path="/tasks" element={<TaskListPage />} />
                    <Route path="/tasks/create" element={<TaskFormPage />} />
                    <Route path="/tasks/:id/edit" element={<TaskFormPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/users" element={<UserListPage />} />
                    <Route path="/users/create" element={<UserFormPage />} />
                    <Route path="/users/:id/edit" element={<UserFormPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                </Routes>
            </FlashMessageProvider>
        </AuthProvider>
    </BrowserRouter>
);

ReactDOM.createRoot(document.getElementById('app')).render(<App />);
