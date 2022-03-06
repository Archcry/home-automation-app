import { Login } from "./pages/login";
import "./App.css";
import { AuthProvider } from "./components/auth/auth-context";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RequiresAuth } from "./components/auth/requires-auth";
import { Home } from "./pages/home";

declare global {
  interface Window {
    _env_: { [key: string]: string };
  }
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<RequiresAuth redirectTo="/login" />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
