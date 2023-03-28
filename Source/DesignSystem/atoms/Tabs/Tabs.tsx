// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { Tab as MuiTab, Tabs as MuiTabs, ButtonTypeMap, ExtendButtonBase } from '@mui/material';

const styles = {
    tabs: {
        'mb': 3.5,
        '& .MuiTabs-flexContainer': {
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
        },
        '& .MuiTabs-indicator': {
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'transparent',
        },
        '& .MuiTabs-indicatorSpan': {
            width: 1,
            maxWidth: 40,
            backgroundColor: 'primary.main',
            display: { xs: 'none', md: 'block' },
        },
    },
    tab: {
        'fontSize': 14,
        'mr': { xs: 0, md: 8 },
        'mb': { xs: 2, md: 0 },
        '&:last-child': { mr: 0 },
        'borderBottom': { xs: '2px solid', md: 'none' },
    },
};

type Tab = {
    /**
     * The label to display for the tab.
     */
    label: string;

    /**
     * The overrides prop gives you access to the underlying MuiButtonProps object, overriding the styles defined by the component and Material-UI.
     * @default undefined
     */
    overrides?: Partial<ExtendButtonBase<ButtonTypeMap>>;

    /**
     * The react element to render when the tab is selected.
     */
    render: () => React.ReactNode;
};

/**
 * The props for a {@link Tabs} component.
 */
export type TabsProps = {
    /**
     * The tabs to display.
     *
     * Create a tab by providing a `label` and a react element to `render`.
     */
    tabs: Tab[];

    /**
     * The index of the tab to pre select.
     * @default 0
     */
    selectedTab?: number;

    linkTab?: boolean;
};

/**
 * Tabs is a component that displays a set of tabs.
 * @param {TabsProps} props - The {@link TabsProps}.
 * @returns A {@link Tabs} component.
 */
export const Tabs = ({ tabs, selectedTab = 0 }: TabsProps) => {
    const [currentTab, setCurrentTab] = useState(selectedTab);

    // useEffect(() => {
    //     //const storedSelectedOption = parseInt(sessionStorage.getItem('selectedTab') || '0');
    //     setCurrentTab(selectedTab);
    // }, []);

    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setCurrentTab(newValue);
        //sessionStorage.setItem('selectedTab', newValue.toString());
    };

    return (
        <>
            <MuiTabs
                value={currentTab}
                onChange={handleTabChange}
                TabIndicatorProps={
                    { children: <span className='MuiTabs-indicatorSpan' /> }
                }
                sx={{ ...styles.tabs }}
            >
                {tabs.map((tab, index) =>
                    <MuiTab
                        key={index}
                        id={`tabpanel-${index}`}
                        aria-labelledby={`tab-${index}`}
                        label={tab.label}
                        disableRipple
                        sx={{ ...styles.tab }}
                        {...tab.overrides}
                    />
                )}
            </MuiTabs>
            {tabs[currentTab]?.render()}
        </>
    );
};
