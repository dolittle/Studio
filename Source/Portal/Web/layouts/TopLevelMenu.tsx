// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { Pivot, PivotItem } from '@fluentui/react';
import { useHistory, useLocation } from 'react-router-dom';
import { withViewModel } from '@dolittle/vanir-react';
import { TopLevelMenuViewModel } from './TopLevelMenuViewModel';

import './TopLevelMenu.scss';

export const TopLevelMenu = withViewModel<TopLevelMenuViewModel>(TopLevelMenuViewModel, ({ viewModel }) => {
    const location = useLocation();
    const history = useHistory();

    function linkClicked(item?: PivotItem, ev?: React.MouseEvent<HTMLElement>) {
        viewModel.beforeNavigating();

        history.push(item?.props.itemKey!);
    }

    return (
        <div className="top-level-menu">
            <Pivot onLinkClick={linkClicked} selectedKey={location.pathname}>
                <PivotItem headerText="Home" itemKey="/"></PivotItem>
                <PivotItem headerText="Deployables" itemKey="/deployables/"></PivotItem>
                <PivotItem headerText="Events" itemKey="/events/"></PivotItem>
                <PivotItem headerText="Data" itemKey="/data/"></PivotItem>
            </Pivot>
        </div>
    );
});
