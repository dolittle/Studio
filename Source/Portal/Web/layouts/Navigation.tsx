// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { INavLink, INavLinkGroup, Nav } from 'office-ui-fabric-react';
import { withViewModel } from '@shared/mvvm';
import { NavigationViewModel } from './NavigationViewModel';
import { NavigationGroup } from '@shared/portal';

export const Navigation = withViewModel(NavigationViewModel, ({ viewModel }) => {
    const groups = mapToNavLinkGroup(viewModel.groups);

    return (
        <Nav groups={groups}></Nav>
    );
});
function mapToNavLinkGroup(navigationGroups: NavigationGroup[]) {
    return navigationGroups.map((_) => {
        return {
            name: _.name,
            links: _.items.map((i) => {
                return {
                    name: i.name,
                    key: i.name,
                } as INavLink;
            }),
        } as INavLinkGroup;
    });
}
