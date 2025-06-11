import React from 'react';
import { useFlash } from '../context/FlashMessageContext';

const FlashMessage = () => {
    const { message, type } = useFlash();

    if (!message) return null;

    const base = 'p-3 rounded mb-4 text-sm font-semibold';
    const styles = {
        success: `${base} bg-green-100 text-green-800 border border-green-300`,
        error: `${base} bg-red-100 text-red-800 border border-red-300`
    };

    return <div className={styles[type] || base}>{message}</div>;
};

export default FlashMessage;
