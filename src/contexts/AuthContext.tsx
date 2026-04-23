import React, { createContext, useContext, useState, useEffect } from 'react';

export type Role = 'admin' | 'client' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

interface AuthContextType {
  user: User | null;
  login: (role: Role) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('mock_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (role: Role) => {
    const mockUser: User = {
      id: role === 'admin' ? 'admin-1' : 'client-1',
      name: role === 'admin' ? 'Admin User' : 'Jane Doe',
      email: role === 'admin' ? 'admin@threadandtailor.com' : 'jane.doe@example.com',
      role,
    };
    setUser(mockUser);
    localStorage.setItem('mock_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('mock_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
