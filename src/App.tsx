import { Login } from "./components/auth/login";
import "./App.css";
import { AuthProvider } from "./components/auth/auth-context";

declare global {
  interface Window {
    _env_: { [key: string]: string };
  }
}

function App() {
  return (
    <AuthProvider>
      <Login />
    </AuthProvider>
  );
}

export default App;
