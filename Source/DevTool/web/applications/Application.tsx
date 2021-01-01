// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { CommandBar, ICommandBarItemProps, FontIcon, Stack, Pivot, PivotItem } from '@fluentui/react';

import { default as styles } from './Application.module.scss';
import { theme } from '@shared/styles/theme';
import { Route, useHistory, useParams, useLocation } from 'react-router-dom';
import { Overview } from './Overview';
import { withViewModel } from '@dolittle/vanir-react';
import { ApplicationViewModel } from './ApplicationViewModel';
import { Mongo } from './Mongo';
import { Ingress } from './Ingress';

type ApplicationRouteParams = {
    applicationId: string;
};

export const Application = withViewModel(ApplicationViewModel, ({ viewModel }) => {
    const location = useLocation();
    const history = useHistory();
    const params = useParams<ApplicationRouteParams>();

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
                    <h2><FontIcon iconName="WebAppBuilderSlot" />&nbsp;{viewModel.application?.name}</h2>
                </div>
                <CommandBar style={{ width: '100%' }} items={commandBarItems} />
                <Pivot onLinkClick={linkClicked} style={{ backgroundColor: theme.palette.neutralTertiaryAlt }} selectedKey={location.pathname}>
                    <PivotItem headerText="Overview" itemKey={`/application/${params.applicationId}/overview`}></PivotItem>
                    <PivotItem headerText="Mongo" itemKey={`/application/${params.applicationId}/mongo`}></PivotItem>
                    <PivotItem headerText="Ingress" itemKey={`/application/${params.applicationId}/ingress`}></PivotItem>
                </Pivot>
            </Stack>
            <div className={styles.content}>
                <Route exact path="/application/:applicationId">
                    <Overview />
                </Route>
                <Route exact path="/application/:applicationId/overview">
                    <Overview />
                </Route>
                <Route exact path="/application/:applicationId/mongo">
                    <Mongo />
                </Route>
                <Route exact path="/application/:applicationId/ingress">
                    <Ingress />
                </Route>
            </div>
        </div>
    );
});
