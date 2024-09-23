import React, { createContext, ReactNode, useContext, useState } from 'react';

import { User } from 'src/constants/types';

interface AuthContextProps {
  setAuthData: (user: User | null) => void;
  setUserData: (userData: User) => void;
  user: User | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const setAuthData = (user: User | null): void => setUser(user);

  const setUserData = (userData: User): void => setUser(userData);

  return (
    <AuthContext.Provider value={{ user, setAuthData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
