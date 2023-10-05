// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { useEffect, useId, useMemo } from 'react';
import { VisualizationSpec } from 'react-vega';
import { scheme } from 'vega';
import { TopLevelSpec } from 'vega-lite';

import { useTheme, Theme } from '@mui/material';
import { FontStyle, TypographyStyle } from '@mui/material/styles/createTypography';

import { colorSchemeFrom } from '../../atoms/Metrics/colors';

import { useSpecWithParams, Parameter, ParameterSetter, VariableParameter, VegaRef } from './params';

const fontSizeFrom = (size: string | number | undefined, rem: number) => {
    if (size === undefined) {
        return rem;
    }

    if (typeof size === 'number') {
        return size;
    }

    if (size.endsWith('em')) {
        return parseFloat(size) * rem;
    }

    return parseFloat(size) ?? rem;
};

const vegaFontFrom = (font: FontStyle | TypographyStyle, theme: Theme) => ({
    fontFamily: font.fontFamily,
    fontSize: fontSizeFrom(font.fontSize, theme.typography.htmlFontSize),
    fontWeight: 'fontWeight' in font ? font.fontWeight : font.fontWeightRegular,
});

const vegaThemeFrom = (theme: Theme) => {
    const typography = vegaFontFrom(theme.typography, theme);
    for (const variant in theme.typography) {
        if (typeof theme.typography[variant] !== 'object') continue;

        typography[variant] = vegaFontFrom(theme.typography[variant], theme);
    }

    const spacing = parseFloat(theme.spacing(1));

    const palette = {};
    for (const variant in theme.palette) {
        const color = theme.palette[variant];

        if (typeof color === 'string') {
            palette[variant] = color;
        }

        if (typeof color !== 'object') continue;

        if ('dark' in color && 'light' in color) {
            palette[variant] = color[theme.palette.mode];
        } else {
            palette[variant] = color;
        }
    }

    return { typography, spacing, palette };
};

const createThemeParams = (theme: Theme, specId: string): VariableParameter[] => {
    return [
        {
            name: 'theme',
            value: vegaThemeFrom(theme),
        },
        {
            name: 'colorscheme',
            value: specId,
        },
    ];
};
/**
 * Creates an immutable Vega-Lite spec with theming parameters and optional extra parameters, a React reference to use to link to a Vega component, and a setter-function to update parameters and re-render the visualisation.
 * The `theme` and `colorschema` parameters can then be used in the Vega-Lite spec to access MUI theme variables.
 * @param spec The Vega-Lite {@link TopLevelSpec} to be used.
 * @param params Optional list of extra {@link Parameter} to be added to the specification.
 * @returns A constant {@link VisualizationSpec} and {@link VegaRef} to pass to a {@link Vega} component, and a setter-function to use to update the parameters.
 */
export const useThemedSpec = (spec: TopLevelSpec, params?: Parameter[]): [VisualizationSpec, VegaRef, ParameterSetter] => {
    const specId = useId();
    const theme = useTheme();

    const initialParams = useMemo(() => {
        scheme(specId, [...colorSchemeFrom(theme)]);

        const themeParams: Parameter[] = createThemeParams(theme, specId);

        if (params !== undefined) {
            return themeParams.concat(params);
        }

        return themeParams;
    }, []);

    const result = useSpecWithParams(spec, initialParams);

    useEffect(() => {
        scheme(specId, [...colorSchemeFrom(theme)]);

        const setParameters = result[2];
        const updatedParams = createThemeParams(theme, specId);
        setParameters(updatedParams);

        return () => {
            scheme(specId, undefined);
        };
    }, [theme]);

    return result;
};
