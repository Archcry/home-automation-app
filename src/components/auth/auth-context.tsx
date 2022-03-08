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
    Partial<AuthContextType>,
    "login"
  > | null>({
    username: localStorage.getItem("username") ?? undefined,
    password: localStorage.getItem("password") ?? undefined,
  });

  const login = (username: string, password: string) => {
    localStorage.setItem("username", username.toLowerCase());
    localStorage.setItem("password", password);

    setCredentials({
      username: username.toLowerCase(),
      password,
    });
  };

  return (
    <AuthContext.Provider value={{ ...credentials, login }}>
      {children}
    </AuthContext.Provider>
  );
};
