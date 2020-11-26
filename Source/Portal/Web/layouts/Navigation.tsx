// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import {  Stack, StackItem, CommandBar, INav, INavLink, INavLinkGroup, Nav } from 'office-ui-fabric-react';
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
        <Stack verticalAlign="space-between"  style={{"minHeight": "100%"}}>
            <StackItem styles={{root: {overflow: 'auto'}}}>
                <Nav groups={groups}></Nav>
            </StackItem>
            <StackItem>
                <CommandBar items={[{key: '1234', text: 'CreateApplication', iconProps: { iconName: 'Add'}}]} />
            </StackItem>
        </Stack>
    );
});
