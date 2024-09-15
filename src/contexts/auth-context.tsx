import React, { createContext, ReactNode, useContext, useState } from 'react';

import { User } from 'src/constants/types/user';

interface AuthContextProps {
  setAuth: (user: User | null) => void;
  setUserData: (userData: Partial<User>) => void;
  user: User | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const setAuth = (user: User | null): void => setUser(user);

  const setUserData = (userData: Partial<User>): void =>
    setUser((prevUser) => (prevUser ? { ...prevUser, ...userData } : prevUser));

  return (
    <AuthContext.Provider value={{ user, setAuth, setUserData }}>
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
