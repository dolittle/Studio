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
    fontWeightMedium: 400,
    h1: {
        fontSize: '1.625rem', //26px
        fontWeight: 500,
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
        fontSize: '0.75rem', //12px
    },
    caption: {
        fontSize: '0.75rem', //12px
    },
    overline: {
        fontSize: '0.625rem', //10px
    },
    monospace: {
        fontSize: '0.8125rem', //13px
        fontWeight: 400,
        fontFamily: 'Roboto Mono',
    },
};
const darkPalette: PaletteOptions = {
    mode: 'dark',
    primary: {
        main: '#8C9AF8',
        light: '#B3BBFB',
        dark: '#6678F6',
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
        disabled: '#93959F',
        primary: '#FAFAFA',
        secondary: '#CECFD0',
    },
    error: {
        main: '#F66666',
        light: '#FBB3B3',
        dark: '#C55252',
        contrastText: '#191A21',
    },
    warning: {
        main: '#FF9366',
        light: '#FFB799',
        dark: '#FF6F33',
        contrastText: '#191A21',
    },
    info: {
        main: '#8CD0F8',
        light: '#C0FFFF',
        dark: '#599FC5',
        contrastText: '#191A21',
    },
    success: {
        main: '#76E8A2',
        light: '#91EDB5',
        dark: '#5EBA82',
        contrastText: '#191A21',
    },
    divider: '#2C2B33',
};
const customComponentStyles: {} = {
    MuiDataGrid: {
        styleOverrides: {
            root: {
                '.MuiDataGrid-row': {
                    cursor: 'pointer'
                },
                '.MuiDataGrid-columnSeparator': {
                    display: 'none'
                },
                '.MuiDataGrid-columnHeader:focus': {
                    outline: 'none'
                },
                '.MuiDataGrid-columnHeader:focus-within': {
                    outline: 'none'
                },
                '.MuiDataGrid-columnHeaderDraggableContainer': {
                    outline: 'none'
                },
                '.MuiDataGrid-cell:focus-within': {
                    outline: 'none'
                },
                '.MuiIconButton-root': {
                    'visibility': 'visible',
                    ':hover': {
                        backgroundColor: 'transparent'
                    }
                },
                '.MuiDataGrid-sortIcon': {
                    color: 'rgba(255, 255, 255, 0.38);',
                    width: '1.25rem',
                    height: '1.25rem'
                },
                '.MuiDataGrid-columnHeader:not(.MuiDataGrid-columnHeader--sorted) .MuiDataGrid-sortIcon': {
                    opacity: 1
                }
            },
        },
    },
};
export const themeDark = createTheme({
    palette: darkPalette,
    typography,
    components: customComponentStyles
});
