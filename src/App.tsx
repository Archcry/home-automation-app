import { Login } from "./pages/login";
import "./App.css";
import { AuthProvider } from "./components/auth/auth-context";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RequiresAuth } from "./components/auth/requires-auth";
import { Home } from "./pages/home";
import { createTheme, ThemeProvider } from "@mui/material";

declare global {
  interface Window {
    _env_: { [key: string]: string };
  }
}

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default App;
