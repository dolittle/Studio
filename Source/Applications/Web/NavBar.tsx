// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { withViewModel } from '@shared/mvvm';
import { ActionBar, ActionBarAction, NavigationGroup } from '@shared/portal';
import React from 'react';
import { ApplicationModel } from './ApplicationModel';
import { NavBarViewModel } from './NavBarViewModel';

export type NavBarProps = {
    applications?: ApplicationModel[];
    handleNavbarActionButtonTriggered?: () => void;
};

export const NavBar = withViewModel<NavBarViewModel, NavBarProps>(
    NavBarViewModel,
    ({ viewModel, props }) => {
        const navigationItems = props.applications?.map(
            (app) => ({ name: app.name, items: [{ name: 'Default' }] } as NavigationGroup)
        );

        const actionBarStructure = {
            button: new ActionBarAction('New Application', 'Add', () =>
                props?.handleNavbarActionButtonTriggered?.()
            ),
            placement: 'bottom',
        } as ActionBar;

        viewModel.setNavigation(navigationItems ?? []);
        viewModel.setActionBar(actionBarStructure);

        return <></>;
    }
);
