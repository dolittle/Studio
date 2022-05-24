// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { createTheme, PaletteOptions } from '@mui/material/styles';
import { TypographyOptions } from '@mui/material/styles/createTypography';

declare module '@mui/material/styles' {
    interface TypographyVariants {
        monospace: React.CSSProperties;
    }

    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        monospace?: React.CSSProperties;
    }
}

declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        monospace: true;
    }
}

const typography: TypographyOptions = {
    fontFamily: '"Rubik", "Open sans", "Arial", sans-serif',
    fontWeightMedium: 500,
    h1: {
        fontSize: '1.625rem', //26px
        fontWeight: 800,
    },
    h2: {
        fontSize: '1.5rem', //24px
        fontWeight: 500,
    },
    h3: {
        fontSize: '1.375rem', //22px
        fontWeight: 500,
    },
    h4: {
        fontSize: '1.25rem', //20px
        fontWeight: 500,
    },
    h5: {
        fontSize: '1.25rem', //20px
        fontWeight: 300,
    },
    h6: {
        fontSize: '1rem', //16px
        fontWeight: 300,
        textTransform: 'uppercase',
    },
    subtitle1: {
        fontSize: '1.25rem', //20px
        fontWeight: 500,
    },
    subtitle2: {
        fontSize: '1.125rem', //18px
        fontWeight: 500,
    },
    body1: {
        fontSize: '1rem', //16px
    },
    body2: {
        fontSize: '0.875rem', //14px
    },
    button: {
        fontSize: '0.875rem', //14px
    },
    caption: {
        fontSize: '0.75rem', //12px
    },
    overline: {
        fontSize: '0.625rem', //10px
    },
    monospace: {
        fontSize: '0.825rem', //13px
        fontWeight: 400,
        fontFamily: 'Roboto Mono',
    },
};
const darkPalette: PaletteOptions = {
    mode: 'dark',
    primary: {
        main: '#8C9AF8',
        light: '#b3bbfb',
        dark: '#6678f6',
        contrastText: '#191A21',
    },
    secondary: {
        main: '#76E8DB',
        light: '#A3EFE7',
        dark: '#48E0CF',
        contrastText: '#191A21',
    },
    background: {
        default: '#0F1014',
        paper: '#191A21',
    },
    text: {
        disabled: '#93959f',
        // hint: '#CECFD0',
        primary: '#fafafa',
        secondary: '#cecfd0',
    },
    error: {
        main: '#F88C8C',
        light: '#FBB3B3',
        dark: '#F66666',
        contrastText: '#191A21',
    },
    warning: {
        main: '#FF9366',
        light: '#FFB799',
        dark: '#FF6F33',
        contrastText: '#191A21',
    },
    info: {
        main: '#8cd0f8',
        light: '#A3D9F9',
        dark: '#70a6c6',
        contrastText: '#191A21',
    },
    success: {
        main: '#76e8a2',
        light: '#91EDB5',
        dark: '#5EBA82',
        contrastText: '#191A21',
    },
    divider: '#2C2B33',
};
export const themeDark = createTheme({
    palette: darkPalette,
    typography,
});
