// src/context/AuthContext.tsx
// src/context/AuthContext.tsx
'use client';
import { IUser } from '@/interfaces/IUser';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    user: IUser | null;
    login: (token: string, userInfo: IUser) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<IUser | null>(null);

    const login = (token: string, userInfo: IUser) => {
        document.cookie = `auth=${token}; path=/;`;
        setIsAuthenticated(true);
        setUser(userInfo);
    };

    const logout = () => {
        document.cookie = `auth=; Max-Age=0; path=/;`;
        setIsAuthenticated(false);
        setUser(null);
        router.replace('/');
    };

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
