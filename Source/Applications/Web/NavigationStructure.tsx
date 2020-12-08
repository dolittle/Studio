// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ActionBar, ActionBarBroker, ActionButton, Navigation, NavigationGroup } from '@shared/portal';
import React from 'react';
import { container } from 'tsyringe';
import { ApplicationModel } from './ApplicationModel';

export type NavigationStructureProps = {
    applications?: ApplicationModel[];
    handleNavbarActionButtonClick?: () => void;
};

export function NavigationStructure(props: NavigationStructureProps) {
    const navigation = container.resolve(Navigation);
    const actionBar = container.resolve(ActionBarBroker);
    const navigationItems = props.applications?.map(
        (app) => ({ name: app.name, items: [{ name: 'Default' }] } as NavigationGroup)
    );

    // Will this create a new callback on every state change?
    // Does it matter?
    const actionBarStructure =  {
        button: new ActionButton('New Application', 'Add', () =>
            props?.handleNavbarActionButtonClick?.()
        ),
        placement: 'bottom',
    } as ActionBar;

    navigation.set(navigationItems ?? []);
    actionBar.set(actionBarStructure);
    return <></>;
}
