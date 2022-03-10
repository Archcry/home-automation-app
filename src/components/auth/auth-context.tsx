import Cookies from 'js-cookie';
import { createContext, ReactChild, useContext, useState } from 'react';

interface AuthContextType {
  username?: string;
  password?: string;
  login: (username: string, password: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  username: undefined,
  password: undefined,
  login: () => {},
  logout: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactChild }) => {
  const [credentials, setCredentials] = useState<Pick<AuthContextType, 'username' | 'password'> | null>({
    username: Cookies.get('username') ?? undefined,
    password: Cookies.get('password') ?? undefined,
  });

  const login = (username: string, password: string) => {
    Cookies.set('username', username.toLowerCase());
    Cookies.set('password', password);

    setCredentials({
      username: username.toLowerCase(),
      password,
    });
  };

  const logout = () => {
    Cookies.remove('username');
    Cookies.remove('password');

    setCredentials(null);
  };

  return <AuthContext.Provider value={{ ...credentials, login, logout }}>{children}</AuthContext.Provider>;
};
