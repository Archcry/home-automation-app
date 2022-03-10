import { createTheme, Theme, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { createContext, ReactElement, useContext, useState } from 'react';

const defaultTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export const ThemeContext = createContext({
  theme: { ...defaultTheme },
  toggleDarkMode: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactElement }) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  const toggleDarkMode = () => {
    setTheme(
      createTheme({
        ...theme,
        palette: {
          mode: theme.palette.mode === 'light' ? 'dark' : 'light',
        },
      })
    );
  };

  return (
    <ThemeContext.Provider value={{ theme: theme, toggleDarkMode }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
