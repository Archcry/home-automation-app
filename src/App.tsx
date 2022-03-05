import { Login } from "./components/auth/login";
import "./App.css";
import { AuthProvider } from "./components/auth/auth-context";

function App() {
  return (
    <AuthProvider>
      <Login />
    </AuthProvider>
  );
}

export default App;
