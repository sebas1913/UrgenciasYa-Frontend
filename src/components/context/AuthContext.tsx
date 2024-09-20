"use client";
import { IUser } from '@/interfaces/IUser';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useState, useEffect } from 'react';
import cookie from 'cookie';

interface AuthContextType {
    isAuthenticated: boolean;
    user: IUser | null;
    login: (token: string, userInfo: IUser) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<IUser | null>(null);
    const [authChecked, setAuthChecked] = useState<boolean>(false); 

    useEffect(() => {
        const cookies = cookie.parse(document.cookie || '');
        const token = cookies.auth;

        if (token) {
            const userInfo = JSON.parse(localStorage.getItem('userID') || '{}');
            setIsAuthenticated(true);
            setUser(userInfo);
        }
        setAuthChecked(true);  // La autenticación ha sido verificada
    }, []);

    const login = (token: string, userInfo: IUser) => {
        document.cookie = `auth=${token}; path=/;`;
        localStorage.setItem('userID', JSON.stringify(userInfo)); // Guardamos la info del usuario localmente
        setIsAuthenticated(true);
        setUser(userInfo);
    };

    const logout = () => {
        document.cookie = `auth=; Max-Age=0; path=/;`;
        localStorage.removeItem('userID'); // Eliminamos la info del usuario
        setIsAuthenticated(false);
        setUser(null);
        router.replace('/');
    };

    if (!authChecked) {
        // Mientras verificamos la autenticación, no renderizamos nada
        return null;
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
