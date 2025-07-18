import React, { createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { getToken } from '../utils/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = getToken();
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const isExpired = decoded.exp * 1000 < Date.now();
                if (!isExpired) {
                    setAuth(decoded);
                } else {
                    localStorage.removeItem('token');
                }
            } catch (err) {
                console.error('Invalid token', err);
                localStorage.removeItem('token');
            }
        }
        setLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
