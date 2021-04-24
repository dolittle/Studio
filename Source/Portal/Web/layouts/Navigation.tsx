// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { INavLink, INavLinkGroup, Nav } from '@fluentui/react';
import { withViewModel } from '@dolittle/vanir-react';
import { NavigationViewModel } from './NavigationViewModel';
import { NavigationGroup } from '@dolittle/vanir-web';

export const Navigation = withViewModel(NavigationViewModel, ({ viewModel }) => {
    const groups = mapToNavLinkGroup(viewModel.groups, viewModel);

    return (
        <Nav groups={groups}></Nav>
    );
});
function mapToNavLinkGroup(navigationGroups: NavigationGroup[], viewModel: NavigationViewModel) {
    return navigationGroups.map((_) => {
        return {
            name: _.name,
            links: _.items.map((i) => {
                return {
                    name: i.name,
                    key: i.name,
                    onClick: (e, item) => {
                        if (i.path) {
                            viewModel.navigateTo(i.path);
                        }
                    }
                } as INavLink;
            }),
            onHeaderClick: () => viewModel.groupClicked(_)
        } as INavLinkGroup;
    });
}
