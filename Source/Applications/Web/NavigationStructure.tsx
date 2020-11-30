// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Navigation, NavigationActionBar, NavigationButton, NavigationGroup } from '@shared/portal';
import React from 'react';
import { container } from 'tsyringe';
import { ApplicationModel } from './ApplicationModel';

export type NavigationStructureProps = {
    applications?: ApplicationModel[];
    handleNavbarActionButtonClick?: () => void;
};

export function NavigationStructure(props: NavigationStructureProps) {
    const navigation = container.resolve(Navigation);
    const navigationItems = props.applications?.map(
        (app) => ({ name: app.name, items: [{ name: 'Default' }] } as NavigationGroup)
    );

    // Will this create a new callback on every state change?
    // Does it matter?
    const navigationActionBar =  {
        button: new NavigationButton('New Application', 'Add', () =>
            props?.handleNavbarActionButtonClick?.()
        ),
        placement: 'bottom',
    } as NavigationActionBar;

    navigation.set(navigationItems ?? [], navigationActionBar);
    return <></>;
}
