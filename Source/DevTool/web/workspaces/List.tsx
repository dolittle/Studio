// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { withViewModel } from '@dolittle/vanir-react';
import { ListViewModel } from './ListViewModel';
import { IconButton, Stack, StackItem, Nav, INavLink, INavLinkGroup } from '@fluentui/react';
import { Dialog } from '../dialogs';
import { useHistory } from 'react-router-dom';
import { CreateMicroserviceDialog } from './CreateMicroserviceDialog';
import { useDialog, DialogResult } from '../dialogs/useDialog';
import { CreateApplicationDialog, ICreateApplicationDialogInput, ICreateApplicationDialogOutput } from './CreateApplicationDialog';


export const List = withViewModel(ListViewModel, ({ viewModel }) => {
    const history = useHistory();
    const [showCreateMicroserviceDialog, createMicroServiceDialogProps] = useDialog((result, output) => {
        if (result === DialogResult.Success) {
        }
    });
    const [showCreateApplicationDialog, createApplicationDialogProps] = useDialog<ICreateApplicationDialogInput, ICreateApplicationDialogOutput>((result, output?) => {
        if (result === DialogResult.Success && output) {
            viewModel.createApplication(output.path, output.name, output.tenant, output.license, output.containerRegistry, output.portal);
        }
    });

    const openWorkspace = async () => {
        const directory = await Dialog.showOpenDialog();
        if (directory?.length > 0) {
            viewModel.directoryAdded(directory);
        }
    };
    const createApplication = async () => {
        const directory = await Dialog.showOpenDialog();
        if (directory?.length > 0) {
            showCreateApplicationDialog({ path: directory });
        }
    };
    const createMicroservice = async () => {
        showCreateMicroserviceDialog();
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
                        viewModel.setCurrentApplication(_.application);
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
            <CreateMicroserviceDialog {...createMicroServiceDialogProps} />
            <CreateApplicationDialog {...createApplicationDialogProps} />
        </>
    );
});