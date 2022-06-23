import React from 'react';
import { themeOptions as darkThemeOptions } from './muiDarkTheme';
import { ThemeProvider, createTheme } from '@mui/material/styles';

function App() {
  const darkTheme = createTheme(darkThemeOptions);
  return <></>;
}

export default App;
