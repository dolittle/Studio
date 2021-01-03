// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { withViewModel, useDialog, DialogResult } from '@dolittle/vanir-react';
import { ListViewModel } from './ListViewModel';
import { IconButton, Stack, StackItem, Nav, INavLink, INavLinkGroup, Link, FontIcon } from '@fluentui/react';
import { Dialog } from '../dialogs';
import { useHistory } from 'react-router-dom';
import { CreateMicroserviceDialog, ICreateMicroserviceDialogOutput, ICreateMicroserviceDialogInput } from './CreateMicroserviceDialog';
import { CreateApplicationDialog, ICreateApplicationDialogInput, ICreateApplicationDialogOutput } from './CreateApplicationDialog';
import { Workspace } from '../../common/workspaces/Workspace';
import { default as styles } from './List.module.scss';
import { RunState } from '../../common/applications';


export const List = withViewModel(ListViewModel, ({ viewModel }) => {
    const history = useHistory();
    const [showCreateMicroserviceDialog, createMicroServiceDialogProps] = useDialog<ICreateMicroserviceDialogInput, ICreateMicroserviceDialogOutput>((result, output?) => {
        if (result === DialogResult.Success && output) {
            viewModel.createMicroservice(output.path, output.name, output.addWebFrontend);
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
    const createMicroservice = async (workspace: Workspace) => {
        showCreateMicroserviceDialog({
            path: workspace.path
        });
    };

    const getApplicationLinkFrom = (workspace: Workspace) => {
        return `/workspace/${workspace.id}/application/${workspace.application.id}`;
    };

    const navigationGroups = viewModel.workspaces.map(_ => {
        const applicationLink = getApplicationLinkFrom(_);

        return {
            name: _.application.name,
            groupData: _,
            links: _.microservices.map(ms => {
                const microserviceLink = `${applicationLink}/microservice/${ms.id}`;
                return {
                    key: microserviceLink,
                    name: ms.name,
                    onClick: () => {
                        history.push(microserviceLink);
                        viewModel.setCurrentApplication(_, _.application);
                        viewModel.setCurrentMicroservice(ms);
                    }
                } as INavLink;
            })
        } as INavLinkGroup;
    });

    const navigateToApplication = (group: INavLinkGroup) => {
        const workspace = group.groupData as Workspace;
        const link = getApplicationLinkFrom(workspace);
        history.push(link);
        viewModel.setCurrentApplication(workspace, workspace.application);
    };

    const RunStateButton = (props: { workspace: Workspace }): JSX.Element => {
        const runState = viewModel.getRunStateFor(props.workspace.application.id);
        const startButton = (<IconButton iconProps={{ iconName: 'MSNVideosSolid' }} title="Start application" onClick={() => viewModel.start(props.workspace)} />);
        const stopButton = (<IconButton iconProps={{ iconName: 'CircleStopSolid' }} title="Stop application" onClick={() => viewModel.stop(props.workspace)}/>);

        switch (runState) {
            case RunState.unknown:
            case RunState.stopped:
            case RunState.stopping: {
                return startButton;
            };

            case RunState.partial: {
                return stopButton;
            };

            case RunState.starting:
            case RunState.running: {
                return stopButton;
            };
        }

        return (<></>);
    };


    const renderGroupHeader = (group: INavLinkGroup): JSX.Element => {
        return (
            <div style={{ paddingRight: '1rem', paddingLeft: '1rem' }}>
                <Stack horizontal>
                    <StackItem grow={1}>
                        <Link onClick={() => navigateToApplication(group)}><h3 style={{ paddingTop: '0.15rem' }}>{group.name}</h3></Link>
                    </StackItem>
                    <StackItem>
                        <h3>
                            <Stack horizontal tokens={{ childrenGap: 5 }}>
                                <RunStateButton workspace={group.groupData as Workspace}/>
                                <IconButton iconProps={{ iconName: 'WebAppBuilderFragmentCreate' }} title="Create microservice" onClick={() => createMicroservice(group.groupData as Workspace)} />
                                <IconButton iconProps={{ iconName: 'Delete' }} title="Remove application" onClick={() => viewModel.remove((group.groupData as Workspace).path)} />
                            </Stack>
                        </h3>
                    </StackItem>
                </Stack>
            </div>
        );
    };

    const renderLink = (link: INavLink): JSX.Element => {
        return (
            <>
                <div>
                    {link.name}
                </div>
                <div className={styles.itemActions} onClick={() => alert('hello')}>
                    <FontIcon iconName='MSNVideosSolid' title="Start" />
                </div>
            </>
        );
    };

    return (
        <>
            <Stack verticalAlign='space-between' style={{ minHeight: '100%' }}>
                <StackItem>
                    <Stack horizontal>
                        <IconButton iconProps={{ iconName: 'Home' }} title="Home" onClick={() => history.push('/')} />
                        <IconButton iconProps={{ iconName: 'OpenFolderHorizontal' }} title="Open workspace" onClick={openWorkspace} />
                        <IconButton iconProps={{ iconName: 'ExploreContent' }} title="Create application" onClick={createApplication} />
                    </Stack>
                </StackItem>
                <StackItem verticalFill={true} grow={1} >
                    <Nav groups={navigationGroups}
                        onRenderGroupHeader={renderGroupHeader}
                        onRenderLink={renderLink}
                    />
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
