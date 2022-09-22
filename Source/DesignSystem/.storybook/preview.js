import React from "react"
import { themeOptions as darkThemeOptions } from '../muiDarkTheme';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material'

const darkTheme =  createTheme(darkThemeOptions);

export const decorators = [
  Story => (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <Story />
    </ThemeProvider>
  ),
];

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
