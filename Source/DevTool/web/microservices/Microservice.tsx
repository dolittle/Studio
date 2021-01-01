// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { CommandBar, ICommandBarItemProps, FontIcon, Stack, Pivot, PivotItem } from '@fluentui/react';

import { default as styles } from './Microservice.module.scss';
import { theme } from '@shared/styles/theme';
import { Route, useHistory, useParams, useLocation } from 'react-router-dom';
import { Overview } from './Overview';
import { Runtime } from './Runtime';
import { Backend } from './Backend';
import { Web } from './Web';
import { withViewModel } from '@dolittle/vanir-react';
import { MicroserviceViewModel } from './MicroserviceViewModel';
import { GraphQL } from './GraphQL';
import { Swagger } from './Swagger';

type MicroserviceRouteParams = {
    microserviceId: string;
};

export const Microservice = withViewModel(MicroserviceViewModel, ({ viewModel }) => {
    const location = useLocation();
    const history = useHistory();
    const params = useParams<MicroserviceRouteParams>();

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
                    <h2><FontIcon iconName="WebAppBuilderSlot" />&nbsp;{viewModel.application.name} / {viewModel.microservice.name}</h2>
                </div>
                <CommandBar style={{ width: '100%' }} items={commandBarItems} />
                <Pivot onLinkClick={linkClicked} style={{ backgroundColor: theme.palette.neutralTertiaryAlt }} selectedKey={location.pathname}>
                    <PivotItem headerText="Overview" itemKey={`/microservice/${params.microserviceId}/overview`}></PivotItem>
                    <PivotItem headerText="GraphQL" itemKey={`/microservice/${params.microserviceId}/graphql`}></PivotItem>
                    <PivotItem headerText="Swagger" itemKey={`/microservice/${params.microserviceId}/swagger`}></PivotItem>
                    <PivotItem headerText="Runtime" itemKey={`/microservice/${params.microserviceId}/runtime`}></PivotItem>
                    <PivotItem headerText="Backend" itemKey={`/microservice/${params.microserviceId}/backend`}></PivotItem>
                    <PivotItem headerText="Web" itemKey={`/microservice/${params.microserviceId}/web`}></PivotItem>
                </Pivot>
            </Stack>
            <div className={styles.content}>
                <Route exact path="/microservice/:microserviceId">
                    <Overview />
                </Route>
                <Route path="/microservice/:microserviceId/overview">
                    <Overview />
                </Route>
                <Route path="/microservice/:microserviceId/graphql">
                    <GraphQL application={viewModel.application} microservice={viewModel.microservice} />
                </Route>
                <Route path="/microservice/:microserviceId/swagger">
                    <Swagger />
                </Route>
                <Route path="/microservice/:microserviceId/runtime">
                    <Runtime />
                </Route>
                <Route path="/microservice/:microserviceId/backend">
                    <Backend />
                </Route>
                <Route path="/microservice/:microserviceId/web">
                    <Web />
                </Route>
            </div>
        </div>
    );
});
