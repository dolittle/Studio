import React from 'react';

import '../theming/fonts';
import { themeDark } from '../theming/theme';

import { themes } from '@storybook/theming';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material'

export const decorators = [
    Story => (
        <ThemeProvider theme={themeDark}>
            <CssBaseline />
            {Story()}
        </ThemeProvider>
    ),
];

export const parameters = {
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
        disable: true,
    },
    docs: {
        theme: themes.dark,
    },
};
