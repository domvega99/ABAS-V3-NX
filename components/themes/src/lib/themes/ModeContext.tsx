'use client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { createContext, useMemo, useState } from 'react';
import { basedarkTheme, baselightTheme } from './theme-colors/DefaultColors';
import { basedarkTheme2, baselightTheme2 } from './theme-colors/Theme2';

type ModeContextType = {
  mode: 'light' | 'dark';
  theme: 'theme1' | 'theme2';
  toggleMode: () => void;
  toggleTheme: () => void;
};

export const ModeContext = createContext<ModeContextType>({
  mode: 'light',
  theme: 'theme1',
  toggleMode: () => {},
  toggleTheme: () => {},
});

const ModeContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [theme, setTheme] = useState<'theme1' | 'theme2'>('theme1');

  // useEffect(() => {
  //   const storedMode = localStorage.getItem('mode') as 'light' | 'dark';
  //   const storedTheme = localStorage.getItem('theme') as 'theme1' | 'theme2';

  //   if (storedMode) {
  //     setMode(storedMode);
  //   }
  //   if (storedTheme) {
  //     setTheme(storedTheme);
  //   }
  // }, []);

  const toggleMode = () => {
    // const newMode = mode === 'light' ? 'dark' : 'light';
    // setMode(newMode);
    // localStorage.setItem('mode', newMode);
  };

  const toggleTheme = () => {
    // const newTheme = theme === 'theme1' ? 'theme2' : 'theme1';
    // setTheme(newTheme);
    // localStorage.setItem('theme', newTheme);
  };

  const themeObject = useMemo(() => {
    if (theme === 'theme1') {
      return createTheme(mode === 'light' ? baselightTheme : basedarkTheme);
    } else {
      return createTheme(mode === 'light' ? baselightTheme2 : basedarkTheme2);
    }
  }, [mode, theme]);

  return (
    <ModeContext.Provider value={{ mode, theme, toggleMode, toggleTheme }}>
      <ThemeProvider theme={themeObject}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ModeContext.Provider>
  );
};

export default ModeContextProvider;
