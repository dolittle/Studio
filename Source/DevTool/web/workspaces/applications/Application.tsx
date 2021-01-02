// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { CommandBar, ICommandBarItemProps, FontIcon, Stack, Pivot, PivotItem } from '@fluentui/react';

import { default as styles } from './Application.module.scss';
import { theme } from '@shared/styles/theme';
import { Route, useHistory, useParams, useLocation, useRouteMatch } from 'react-router-dom';
import { Overview } from './Overview';
import { withViewModel } from '@dolittle/vanir-react';
import { ApplicationViewModel } from './ApplicationViewModel';
import { Mongo } from './Mongo';
import { Ingress } from './Ingress';
import { ApplicationProps } from './ApplicationProps';
import { Microservice } from './microservices/Microservice';

type ApplicationRouteParams = {
    applicationId: string;
};

export const Application = withViewModel<ApplicationViewModel, ApplicationProps>(ApplicationViewModel, ({ viewModel, props }) => {
    const location = useLocation();
    const history = useHistory();
    const { path, url } = useRouteMatch();
    viewModel.setWorkspace(props.workspace);

    const commandBarItems = [{
        key: 'start',
        text: 'Start',
        iconProps: {
            iconName: 'MSNVideosSolid'
        },
        onClick: () => { viewModel.start(); }

    }, {
        key: 'stop',
        text: 'Stop',
        iconProps: {
            iconName: 'CircleStopSolid'
        },
        onClick: () => { viewModel.stop(); }

    }] as ICommandBarItemProps[];

    // CircleStopSolid
    // CircleStop

    function linkClicked(item?: PivotItem, ev?: React.MouseEvent<HTMLElement>) {
        history.push(item?.props.itemKey!);
    }

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Stack>
                <div className={styles.header}>
                    <h2><FontIcon iconName="WebAppBuilderSlot" />&nbsp;{props.workspace.application.name}</h2>
                </div>
                <CommandBar style={{ width: '100%' }} items={commandBarItems} />
                <Pivot onLinkClick={linkClicked} style={{ backgroundColor: theme.palette.neutralTertiaryAlt }} selectedKey={location.pathname}>
                    <PivotItem headerText="Overview" itemKey={`${url}/overview`}></PivotItem>
                    <PivotItem headerText="Mongo" itemKey={`${url}/mongo`}></PivotItem>
                    <PivotItem headerText="Ingress" itemKey={`${url}/ingress`}></PivotItem>
                </Pivot>
            </Stack>
            <div className={styles.content}>
                <Route exact path={`${path}`}>
                    <Overview workspace={props.workspace} application={props.workspace.application} />
                </Route>
                <Route exact path={`${path}/overview`}>
                    <Overview workspace={props.workspace} application={props.workspace.application} />
                </Route>
                <Route exact path={`${path}/mongo`}>
                    <Mongo />
                </Route>
                <Route exact path={`${path}/ingress`}>
                    <Ingress />
                </Route>
                <Route path={`${path}/microservice/:microserviceId`}>
                    <Microservice workspace={props.workspace} application={props.workspace.application}/>
                </Route>
            </div>
        </div>
    );
});
