import React from 'react';
import { Button } from './components/Button/Button';
import { themeOptions as darkThemeOptions } from './muiDarkTheme';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

function App() {
    const darkTheme = createTheme(darkThemeOptions);
    return <div>Nothing to see here.</div>;
}

export default App;
