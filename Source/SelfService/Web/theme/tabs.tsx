// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import MuiTabs from '@material-ui/core/Tabs';
import MuiTab from '@material-ui/core/Tab';



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
})((props: TabsProps) => <MuiTabs {...props} TabIndicatorProps={{ children: <span /> }} />);

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
        },
    }),
)((props: TabProps) => <MuiTab disableRipple {...props} />);
