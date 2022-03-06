import { createContext, ReactChild, useContext, useState } from "react";

interface AuthContextType {
  username?: string;
  password?: string;
  login: (username: string, password: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  username: undefined,
  password: undefined,
  login: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactChild }) => {
  const [credentials, setCredentials] = useState<Omit<
    AuthContextType,
    "login"
  > | null>(null);

  const login = (username: string, password: string) => {
    setCredentials({
      username,
      password,
    });
  };

  return (
    <AuthContext.Provider value={{ ...credentials, login }}>
      {children}
    </AuthContext.Provider>
  );
};
