'use client'
import { customFetch } from '@/shared/api';
import { getCookie } from 'cookies-next';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthStatus {
    isLogged: boolean;
    isAdmin: boolean;
    logged?: () => void
}

const AuthContext = createContext<AuthStatus | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [authStatus, setAuthStatus] = useState<AuthStatus>({ isLogged: false, isAdmin: false });
    const logged = () => {
        setAuthStatus({ ...authStatus, isLogged: true })
    }
    useEffect(() => {
        const fetchAuthStatus = async () => {
            try {
                const token = getCookie('access');
                if (!token) {
                    setAuthStatus({ isLogged: false, isAdmin: false });
                    return;
                }
                await customFetch({ method: 'GET', path: 'is-admin/' });
                setAuthStatus({ isLogged: true, isAdmin: true });
            } catch (e: any) {
                if (e.status === 403) {
                    setAuthStatus({ isLogged: true, isAdmin: false });
                } else {
                    setAuthStatus({ isLogged: false, isAdmin: false });
                }
            }
        };

        fetchAuthStatus();
    }, []);


    return <AuthContext.Provider value={{ ...authStatus, logged }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
