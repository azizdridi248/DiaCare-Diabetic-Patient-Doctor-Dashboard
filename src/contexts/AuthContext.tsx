import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string, role: UserRole) => void;
  signUp: (name: string, email: string, password: string, age: number, role: UserRole) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const signIn = (email: string, password: string, role: UserRole) => {
    // Frontend-only validation
    if (email && password) {
      setUser({
        id: Math.random().toString(36).substr(2, 9),
        name: email.split('@')[0],
        email,
        role,
        age: role === 'patient' ? 45 : undefined,
      });
    }
  };

  const signUp = (name: string, email: string, password: string, age: number, role: UserRole) => {
    // Frontend-only validation
    if (name && email && password) {
      setUser({
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        role,
        age: role === 'patient' ? age : undefined,
      });
    }
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
