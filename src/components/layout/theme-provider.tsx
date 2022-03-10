import { createTheme, PaletteMode, Theme, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { createContext, ReactElement, useContext, useState } from 'react';

const defaultTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

export const ThemeContext = createContext({
  theme: defaultTheme,
  toggleDarkMode: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

export interface ThemeProviderProps {
  children: ReactElement;
  storage: Pick<Storage, 'setItem' | 'getItem'>;
}

export const ThemeProvider = ({ children, storage }: ThemeProviderProps) => {
  const getPaletteModeFromLocalStorage = () => {
    const mode = storage.getItem('theme.palette.mode');

    if (['light', 'dark'].includes(mode ?? '')) {
      return mode as PaletteMode;
    }

    return undefined;
  };

  const [theme, setTheme] = useState<Theme>(
    createTheme({
      ...defaultTheme,
      palette: {
        mode: getPaletteModeFromLocalStorage() || 'light',
      },
    })
  );

  const toggleDarkMode = () => {
    const newMode = theme.palette.mode === 'light' ? 'dark' : 'light';

    storage.setItem('theme.palette.mode', newMode);

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
