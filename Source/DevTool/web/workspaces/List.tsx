// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { withViewModel } from '@dolittle/vanir-react';
import { ListViewModel } from './ListViewModel';
import { IconButton, Stack, StackItem, Nav, INavLink, INavLinkGroup } from '@fluentui/react';
import { Dialog } from '../dialogs';
import { useHistory } from 'react-router-dom';

export const List = withViewModel(ListViewModel, ({ viewModel }) => {
    const history = useHistory();

    const openWorkspace = async () => {
        const directory = await Dialog.showOpenDialog();
        if (directory?.length > 0) {
            viewModel.directoryAdded(directory);
        }
    };
    const createApplication = async () => {
        const directory = await Dialog.showOpenDialog();
    };
    const createMicroservice = async () => {
    };

    const navigationGroups = viewModel.workspaces.map(_ => {
        return {
            key: _.application.id,
            name: _.application.name,
            links: _.microservices.map(ms => {
                return {
                    key: ms.id,
                    name: ms.name,
                    onClick: () => {
                        history.push(`/microservice/${ms.id}`);
                        viewModel.setCurrentMicroservice(ms);
                    }
                } as INavLink;
            })
        } as INavLinkGroup;
    });

    return (
        <>
            <Stack verticalAlign='space-between' style={{ minHeight: '100%' }}>
                <StackItem>
                    <Stack horizontal tokens={{ childrenGap: 5 }}>
                        <IconButton iconProps={{ iconName: 'Home' }} title="Home" onClick={() => history.push('/')} />
                        <IconButton iconProps={{ iconName: 'OpenFolderHorizontal' }} title="Open workspace" onClick={openWorkspace} />
                        <IconButton iconProps={{ iconName: 'ExploreContent' }} title="Create application" onClick={createApplication} />
                        <IconButton iconProps={{ iconName: 'WebAppBuilderFragmentCreate' }} title="Create microservice" onClick={createMicroservice} />
                    </Stack>
                </StackItem>
                <StackItem verticalFill={true} grow={1} >
                    <div>
                        <Nav groups={navigationGroups} />
                    </div>
                </StackItem>
                <StackItem>
                    (C)2020 Dolittle
                </StackItem>
            </Stack>
        </>
    );
});