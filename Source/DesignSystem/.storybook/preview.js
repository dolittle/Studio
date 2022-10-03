import React from "react"
import { themeDark } from '../theme';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material'

export const decorators = [
  Story => (
    <ThemeProvider theme={themeDark}>
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
