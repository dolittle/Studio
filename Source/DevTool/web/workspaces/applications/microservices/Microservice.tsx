// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { CommandBar, ICommandBarItemProps, FontIcon, Stack, Pivot, PivotItem } from '@fluentui/react';

import { default as styles } from './Microservice.module.scss';
import { theme } from '@shared/styles/theme';
import { Route, useHistory, useParams, useLocation, useRouteMatch } from 'react-router-dom';
import { Overview } from './Overview';
import { Runtime } from './Runtime';
import { Backend } from './Backend';
import { Web } from './Web';
import { GraphQL } from './GraphQL';
import { Swagger } from './Swagger';
import { MicroserviceProps } from './MicroserviceProps';

type MicroserviceRouteParams = {
    microserviceId: string;
};

const NotSet = { id: '', name: 'NotSet', version: '', commit: '', built: '' };

export const Microservice = (props: MicroserviceProps) => {
    const location = useLocation();
    const history = useHistory();
    const { path, url } = useRouteMatch();
    const params = useParams<MicroserviceRouteParams>();
    const microservice = props.workspace.microservices.find(_ => _.id === params.microserviceId) || NotSet;

    const commandBarItems = [{
        key: 'blah',
        text: 'Start',
        iconProps: {
            iconName: 'MSNVideosSolid'
        },
        onClick: () => { }

    }] as ICommandBarItemProps[];

    function linkClicked(item?: PivotItem, ev?: React.MouseEvent<HTMLElement>) {
        history.push(item?.props.itemKey!);
    }

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Stack>
                <div className={styles.header}>
                    <h2><FontIcon iconName="WebAppBuilderSlot" />&nbsp;{props.application.name} / {microservice.name}</h2>
                </div>
                <CommandBar style={{ width: '100%' }} items={commandBarItems} />
                <Pivot onLinkClick={linkClicked} style={{ backgroundColor: theme.palette.neutralTertiaryAlt }} selectedKey={location.pathname}>
                    <PivotItem headerText="Overview" itemKey={`${url}/overview`}></PivotItem>
                    <PivotItem headerText="GraphQL" itemKey={`${url}/graphql`}></PivotItem>
                    <PivotItem headerText="Swagger" itemKey={`${url}/swagger`}></PivotItem>
                    <PivotItem headerText="Runtime" itemKey={`${url}/runtime`}></PivotItem>
                    <PivotItem headerText="Backend" itemKey={`${url}/backend`}></PivotItem>
                    <PivotItem headerText="Web" itemKey={`${url}/web`}></PivotItem>
                </Pivot>
            </Stack>
            <div className={styles.content}>
                <Route exact path={`${path}`}>
                    <Overview workspace={props.workspace} application={props.application} microservice={microservice} />
                </Route>
                <Route path={`${path}/overview`}>
                    <Overview workspace={props.workspace} application={props.application} microservice={microservice} />
                </Route>
                <Route path={`${path}/graphql`}>
                    <GraphQL application={props.application} microservice={microservice} />
                </Route>
                <Route path={`${path}/swagger`}>
                    <Swagger application={props.application} microservice={microservice} />
                </Route>
                <Route path={`${path}/runtime`}>
                    <Runtime />
                </Route>
                <Route path={`${path}/backend`}>
                    <Backend />
                </Route>
                <Route path={`${path}/web`}>
                    <Web />
                </Route>
            </div>
        </div>
    );
};
