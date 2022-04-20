// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { Theme } from '@mui/material/styles';
import withStyles from '@mui/styles/withStyles';
import createStyles from '@mui/styles/createStyles';
import MuiTabs from '@mui/material/Tabs';
import MuiTab from '@mui/material/Tab';
import { CSSProperties } from '@mui/styles';

interface TabsProps {
    value: number;
    onChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
}

export const Tabs = withStyles({
    indicator: {
        'display': 'flex',
        'justifyContent': 'center',
        'backgroundColor': 'transparent',
        '& > span': {
            maxWidth: 40,
            width: '100%',
            backgroundColor: '#6678F6',
        },
    },
})((props: React.PropsWithChildren<TabsProps>) => <MuiTabs {...props} TabIndicatorProps={{ children: <span /> }} />);

interface TabProps {
    label: string;
}

export const Tab = withStyles((theme: Theme) =>
    createStyles({
        root: {
            'textTransform': 'none',
            'color': '#fff',
            'fontWeight': theme.typography.fontWeightRegular,
            'fontSize': theme.typography.pxToRem(15),
            'marginRight': theme.spacing(1),
            '&:focus': {
                opacity: 1,
            },
        } as CSSProperties,
    }),
)((props: TabProps) => <MuiTab disableRipple {...props} />);
