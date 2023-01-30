// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { ReactElement, useEffect, useState } from 'react';

import { Tab as MuiTab, Tabs as MuiTabs } from '@mui/material';

const styles = {
    tabs: {
        '& .MuiTabs-indicator': {
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'transparent'
        },
        '& .MuiTabs-indicatorSpan': {
            maxWidth: 40,
            width: 1,
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

type Tab = {
    label: string;
    render: () => React.ReactNode;
};

/**
 * The props for a {@link Tabs} component.
 */
export type TabsProps = {
    /**
     * Required. The tabs to display.
     * @type {Tab[]}
     */
    tabs: Tab[];
};

/**
 * @param {...TabsProps} props - The {@link TabsProps}.
 * @returns {ReactElement} A new {@link Tabs} component.
 * @example
 * <Tabs tabs={[{ label: 'First tab', render: () => <h1>Hello</h1> }, { label: 'Second tab', render: () => <h1>World</h1> }]} />
 */
export const Tabs = ({ tabs }: TabsProps): ReactElement => {
    const [currentTab, setCurrentTab] = useState(0);

    useEffect(() => {
        const storedSelectedOption = parseInt(sessionStorage.getItem('selectedTab') || '0');
        setCurrentTab(storedSelectedOption);
    }, []);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setCurrentTab(newValue);
        sessionStorage.setItem('selectedTab', newValue.toString());
    };

    return (
        <>
            <MuiTabs
                TabIndicatorProps={
                    { children: <span className='MuiTabs-indicatorSpan' /> }
                }
                value={currentTab}
                onChange={handleChange}
                sx={{ ...styles.tabs }}
            >
                {tabs.map((tab, key) =>
                    <MuiTab
                        key={key}
                        id={`tabpanel-${key}`}
                        aria-labelledby={`tab-${key}`}
                        disableRipple
                        label={tab.label}
                        sx={{ ...styles.tab }}
                    />
                )}
            </MuiTabs>
            {tabs[currentTab]?.render()}
        </>
    );
};
