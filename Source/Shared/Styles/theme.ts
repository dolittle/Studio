// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { createTheme, loadTheme } from '@fluentui/react/lib/Styling';
import { initializeIcons } from '@uifabric/icons';

import '@shared/styles/theme.scss';

initializeIcons();

export const theme = createTheme({
    palette: {
        themePrimary: '#f8f8f8',
        themeLighterAlt: '#f8f8f8',
        themeLighter: '#f9f9f9',
        themeLight: '#fafafa',
        themeTertiary: '#fbfbfb',
        themeSecondary: '#fcfcfc',
        themeDarkAlt: '#fcfcfc',
        themeDark: '#fdfdfd',
        themeDarker: '#fefefe',
        neutralLighterAlt: '#0b0b0b',
        neutralLighter: '#151515',
        neutralLight: '#252525',
        neutralQuaternaryAlt: '#2f2f2f',
        neutralQuaternary: '#373737',
        neutralTertiaryAlt: '#595959',
        neutralTertiary: '#fafafa',
        neutralSecondary: '#fbfbfb',
        neutralPrimaryAlt: '#fcfcfc',
        neutralPrimary: '#f8f8f8',
        neutralDark: '#fdfdfd',
        black: '#fefefe',
        white: '#000000'
    }
});

loadTheme(theme);
