// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { Tab as MuiTab, Tabs as MuiTabs } from '@mui/material';

const styles = {
    tabs: {
        '& .MuiTabs-indicator': {
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'transparent'
        },
        '& .MuiTabs-indicatorSpan': {
            maxWidth: '40px',
            width: '100%',
            backgroundColor: 'primary.main'
        }
    },
    tab: {
        'color': 'text.secondary',
        'fontWeight': 500,
        'fontSize': 13,
        'letterSpacing': '0.06em',
        '&:first-of-type': {
            mr: 8
        },
        '&.Mui-selected': {
            color: 'primary.main'
        }
    }
};

export type Tab = {
    label: string
    render: () => React.ReactNode
    sx?: any
};

export type TabsProps = {
    tabs: Tab[]
    sx?: any
};

export const Tabs = (props: TabsProps) => {
    const [currentTab, setCurrentTab] = useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setCurrentTab(newValue);
    };

    return (
        <>
            <MuiTabs
                TabIndicatorProps={
                    { children: <span className="MuiTabs-indicatorSpan" /> }
                }
                value={currentTab}
                onChange={handleChange}
                sx={{ ...styles.tabs, ...props.sx }}
            >
                {props.tabs.map((tab, key) =>
                    <MuiTab
                        key={key}
                        id={`tabpanel-${key}`}
                        aria-labelledby={`tab-${key}`}
                        disableRipple
                        label={tab.label}
                        sx={{ ...styles.tab, ...tab.sx }}
                    />
                )}
            </MuiTabs>
            {props.tabs[currentTab]?.render()}
        </>
    );
};
