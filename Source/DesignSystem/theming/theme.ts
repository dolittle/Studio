// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import type { DataGridProComponents } from '@mui/x-data-grid-pro/themeAugmentation';

import { Components, createTheme, PaletteOptions } from '@mui/material/styles';
import { TypographyOptions } from '@mui/material/styles/createTypography';

declare module '@mui/material/styles' {
    interface TypographyVariants {
        monospace: React.CSSProperties;
    }

    interface TypographyVariantsOptions {
        monospace?: React.CSSProperties;
    }

    interface Palette {
        outlineborder: Palette['divider'];
    }

    interface PaletteOptions {
        outlineborder?: PaletteOptions['divider'];
    }
};

declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        monospace: true;
    }
};

declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
        fullwidth: true;
    }
};

export const typography: TypographyOptions = {
    fontFamily: '"Rubik", "Open sans", "Arial", sans-serif',
    fontWeightMedium: 400,
    body1: {
        fontSize: '1rem', //16px
        lineHeight: '1.25rem', //20px
        fontWeight: 400,
    },
    body2: {
        fontSize: '0.875rem', //14px
        lineHeight: '1.25rem', //20px
        fontWeight: 400,
    },
    subtitle1: {
        fontSize: '1.125rem', //18px
        lineHeight: '1.5rem', //24px
        fontWeight: 400,
    },
    subtitle2: {
        fontSize: '1rem', //16px
        lineHeight: '1.375rem', //22px
        fontWeight: 600,
    },
    caption: {
        fontSize: '0.75rem', //12px
        lineHeight: '0.75rem', //12px
        fontWeight: 400,
        letterSpacing: '0.03rem',
    },
    overline: {
        fontSize: '0.625rem', //10px
        lineHeight: '0.75rem', //12px
        fontWeight: 400,
        textTransform: 'uppercase',
    },
    h1: {
        fontSize: '1.625rem', //26px
        lineHeight: '1.75rem', //28px
        fontWeight: 500,
    },
    h2: {
        fontSize: '1.5rem', //24px
        lineHeight: '1.625rem', //26px
        fontWeight: 500,
        letterSpacing: '-0.03125rem' //0.5px
    },
    h3: {
        fontSize: '1.375rem', //22px
        lineHeight: '1.5rem', //24px
        fontWeight: 500,
    },
    h4: {
        fontSize: '1.25rem', //20px
        lineHeight: '1.375rem', //22px
        fontWeight: 500,
    },
    h5: {
        fontSize: '1.25rem', //20px
        lineHeight: '1.375rem', //22px
        fontWeight: 300,
    },
    h6: {
        fontSize: '1rem', //16px
        lineHeight: '1.5rem', //24px
        fontWeight: 300,
        textTransform: 'uppercase',
    },
    button: {
        fontSize: '0.8125rem', //13px
        letterSpacing: '0.06em',
        fontWeight: 500,
        lineHeight: 'normal',
    },
    monospace: {
        fontSize: '0.8125rem', //13px
        fontWeight: 400,
        fontFamily: 'Roboto Mono',
    },
};

const palette: PaletteOptions = {
    mode: 'dark',
    primary: {
        main: '#8C9AF8',
        dark: '#6678F6',
        light: '#B3BBFB',
        contrastText: '#191A21',
    },
    secondary: {
        main: '#76E8DB',
        dark: '#48E0CF',
        light: '#A3EFE7',
        contrastText: '#191A21',
    },
    error: {
        main: '#F66666',
        dark: '#C55252',
        light: '#FBB3B3',
        contrastText: '#191A21',
    },
    warning: {
        main: '#FF9366',
        dark: '#FF6F33',
        light: '#FFB799',
        contrastText: '#191A21',
    },
    info: {
        main: '#8CD0F8',
        dark: '#599FC5',
        light: '#C0FFFF',
        contrastText: '#191A21',
    },
    success: {
        main: '#76E8A2',
        dark: '#5EBA82',
        light: '#91EDB5',
        contrastText: '#191A21',
    },
    text: {
        primary: '#FAFAFA',
        secondary: '#CECFD0',
        disabled: '#93959F',
    },
    background: {
        default: '#0F1014',
        paper: '#191A21',
    },
    action: {
        active: '#ffffff61',
    },
    divider: '#2C2B33E6',
    outlineborder: '#504D4D',
};

const components: Components & DataGridProComponents = {
    MuiAlert: {
        styleOverrides: {
            outlinedError: { borderColor: '#F66666' },
        },
    },
    MuiButton: {
        variants: [
            {
                props: { variant: 'fullwidth' },
                style: {
                    'backgroundColor': 'rgba(140, 154, 248, 0.08)',
                    'color': '#8C9AF8',
                    'width': '100%',
                    'minHeight': 30,
                    '&:hover': { backgroundColor: 'rgba(140, 154, 248, 0.15)' },
                },
            },
            {
                // Add a custom background color to the contained button variant with inherit color.
                props: { color: 'inherit', variant: 'contained' },
                style: {
                    'backgroundColor': '#616161',
                    '&:hover': { backgroundColor: '#757575' },
                },
            },
        ],
    },
    MuiDataGrid: {
        styleOverrides: {
            columnHeader: {
                ':focus': { outline: 'none' },
                ':focus-within': { outline: 'none' },
                '& .MuiIconButton-root': { marginLeft: 8 },
            },
            columnHeaders: {
                borderColor: 'rgba(226, 255, 97, 0.05)',
            },
            columnHeaderTitle: {
                fontWeight: 500,
                letterSpacing: '0.17px',
            },
            iconButtonContainer: {
                visibility: 'visible',
                width: 'unset',
            },
            columnSeparator: {
                display: 'none',
            },
            cell: {
                'whiteSpace': 'normal',
                'wordWrap': 'break-word',
                'borderColor': 'rgba(226, 255, 97, 0.05)',
                ':not(.MuiDataGrid-cell--editable)': {
                    ':focus': { outline: 'none' },
                },
            },
            cellContent: {
                paddingTop: 11,
                paddingBottom: 11,
            },
            row: {
                cursor: 'pointer',
            },
            footerContainer: {
                borderColor: 'rgba(226, 255, 97, 0.05)',
            },
            root: {
                'border': 'none',
                '& .MuiDataGrid-columnHeader:not(.MuiDataGrid-columnHeader--sorted) .MuiDataGrid-sortIcon': {
                    opacity: 1,
                },
                '& .MuiDataGrid-columnHeader:not(.MuiDataGrid-columnHeader--sorted):hover .MuiDataGrid-sortIcon': {
                    opacity: 1,
                },
                '& .MuiFormControl-root': {
                    width: '100%',
                },
            },
        },
    },
};

export const themeDark = createTheme({
    palette,
    typography,
    components,
});
