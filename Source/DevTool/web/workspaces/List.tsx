// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { withViewModel } from '@dolittle/vanir-react';
import { ListViewModel } from './ListViewModel';
import { IconButton, Stack, StackItem, Nav, INavLink, INavLinkGroup } from '@fluentui/react';
import { Dialog } from '../dialogs';

export const List = withViewModel(ListViewModel, ({ viewModel }) => {
    const openWorkspace = async () => {
        const directory = await Dialog.showOpenDialog();
        if (directory?.length > 0) {
            viewModel.directoryAdded(directory);
        }
    };
    const createWorkspace = async () => {
        const directory = await Dialog.showOpenDialog();
    };

    const navigationGroups = viewModel.workspaces.map(_ => {
        return {
            key: _.application.id,
            name: _.application.name,
            links: _.microservices.map(ms => {
                return {
                    key: ms.id,
                    name: ms.name
                } as INavLink;
            })
        } as INavLinkGroup;
    });

    return (
        <>
            <Stack verticalAlign='space-between' style={{ minHeight: '100%' }}>
                <StackItem>
                    <Stack horizontal tokens={{ childrenGap: 5 }}>
                        <IconButton iconProps={{ iconName: 'OpenFolderHorizontal' }} title="Open workspace" onClick={openWorkspace} />
                        <IconButton iconProps={{ iconName: 'Add' }} title="Create workspace" onClick={createWorkspace} />
                    </Stack>
                </StackItem>
                <StackItem verticalFill={true} grow={1} >
                    <div>
                        <Nav groups={navigationGroups} />
                    </div>
                </StackItem>
                <StackItem>
                    The bottom
                </StackItem>
            </Stack>

        </>
    );
});