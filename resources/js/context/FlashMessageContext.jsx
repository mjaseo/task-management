import React, { createContext, useContext, useState } from 'react';

const FlashMessageContext = createContext();

export const FlashMessageProvider = ({ children }) => {
    const [message, setMessage] = useState(null);
    const [type, setType] = useState('success'); // 'success' | 'error'

    const showMessage = (msg, msgType = 'success') => {
        setMessage(msg);
        setType(msgType);
        setTimeout(() => setMessage(null), 3000);
    };

    return (
        <FlashMessageContext.Provider value={{ message, type, showMessage }}>
            {children}
        </FlashMessageContext.Provider>
    );
};

export const useFlash = () => useContext(FlashMessageContext);
