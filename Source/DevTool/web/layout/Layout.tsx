// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { Pivot, CommandBar, Stack, FontIcon, PivotItem, ICommandBarItemProps } from '@fluentui/react';

import { default as styles } from './Layout.module.scss';
import { useLocation, useHistory, useRouteMatch, Route } from 'react-router-dom';
import { theme } from '@shared/styles/theme';
import { Home } from '../Home';
import { Workspace } from '../workspaces/Workspace';

export const Layout = () => {
    const location = useLocation();
    const history = useHistory();
    const { path, url } = useRouteMatch();

    const commandBarItems = [{
        key: 'start',
        text: 'Start',
        iconProps: {
            iconName: 'MSNVideosSolid'
        },
        onClick: () => { }

    }, {
        key: 'stop',
        text: 'Stop',
        iconProps: {
            iconName: 'CircleStopSolid'
        },
        onClick: () => { }

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
                    <h2><FontIcon iconName="WebAppBuilderSlot" />&nbsp;Blah</h2>
                </div>
                <CommandBar style={{ width: '100%' }} items={commandBarItems} />
                <Pivot onLinkClick={linkClicked} style={{ backgroundColor: theme.palette.neutralTertiaryAlt }} selectedKey={location.pathname}>

                    <PivotItem headerText="Overview" itemKey={`${url}/overview`}></PivotItem>
                    <PivotItem headerText="Mongo" itemKey={`${url}/mongo`}></PivotItem>
                    <PivotItem headerText="Ingress" itemKey={`${url}/ingress`}></PivotItem>
                </Pivot>
            </Stack>
            <div className={styles.content}>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/workspace/:workspaceId">
                    <Workspace />
                </Route>
            </div>
        </div>
    );
};
