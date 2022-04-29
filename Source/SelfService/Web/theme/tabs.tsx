// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import MuiTabs from '@mui/material/Tabs';
import MuiTab from '@mui/material/Tab';

interface TabsProps {
    value: number;
    onChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
    children: React.ReactNode;
}

export const Tabs = (props: TabsProps) => <MuiTabs
    sx={{
        '& .MuiTabs-indicator': {
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'transparent',
        },
        '& .MuiTabs-indicatorSpan': {
            maxWidth: 40,
            width: '100%',
            backgroundColor: '#6678F6',
        }
    }}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    textColor='inherit'
    {...props}
/>;

interface TabProps {
    label: string;
}

export const Tab = (props: TabProps) => <MuiTab
    sx={{
        'textTransform': 'none',
        'color': '#fff',
        'fontWeight': (theme) => theme.typography.fontWeightRegular,
        'fontSize': (theme) => theme.typography.pxToRem(15),
        'marginRight': 1,
        '&:focus': {
            outline: '1px solid green',
            opacity: 1,
        },
    }}
    disableRipple
    {...props}
/>;
