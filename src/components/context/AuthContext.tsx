// src/context/AuthContext.tsx
'use client'
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter();

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);


    const login = (token: string) => {
        document.cookie = `auth=${token}; path=/;`;
        setIsAuthenticated(true);
    };

    const logout = () => {
        document.cookie = `auth=; Max-Age=0; path=/;`;
        setIsAuthenticated(false);
        router.replace('/');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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
