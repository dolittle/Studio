// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { INav, INavLink, INavLinkGroup, Nav } from 'office-ui-fabric-react';
import { withViewModel } from '@shared/mvvm';
import { NavigationViewModel } from './NavigationViewModel';

export const Navigation = withViewModel(NavigationViewModel, ({ viewModel }) => {
    const groups = viewModel.groups.map(_ => {
        return {
            name: _.name,
            links: _.items.map(i => {
                return {
                    name: i.name,
                    key: i.name
                } as INavLink;
            })
        } as INavLinkGroup;
    });

    return (
        <Nav groups={groups}></Nav>
    );
});
