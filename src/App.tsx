import { Login } from "./pages/login";
import "./App.css";
import { AuthProvider } from "./components/auth/auth-context";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RequiresAuth } from "./components/auth/requires-auth";
import { createTheme, ThemeProvider } from "@mui/material";
import { DeviceGroups } from "./pages/somfy/device-groups";
import { Devices } from "./pages/somfy/devices";

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
              <Route
                path="/"
                element={<Navigate to="/shutter/deviceGroups" />}
              />
              <Route path="/shutter/deviceGroups" element={<DeviceGroups />} />
              <Route path="/shutter/deviceGroup/:uid" element={<Devices />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
