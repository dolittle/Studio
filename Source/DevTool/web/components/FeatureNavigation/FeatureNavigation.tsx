// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { Pivot, PivotItem } from '@fluentui/react';

import { useLocation, useHistory, useRouteMatch, Route } from 'react-router-dom';
import { theme } from '@shared/styles/theme';
import { withViewModel } from '@dolittle/vanir-react';
import { FeatureNavigationViewModel } from './FeatureNavigationViewModel';

export const FeatureNavigation = withViewModel(FeatureNavigationViewModel, ({ viewModel }) => {
    const location = useLocation();
    const history = useHistory();

    function linkClicked(item?: PivotItem, ev?: React.MouseEvent<HTMLElement>) {
        history.push(item?.props.itemKey!);
    }
    return (
        <Pivot onLinkClick={linkClicked} style={{ backgroundColor: theme.palette.neutralTertiaryAlt }} selectedKey={location.pathname}>
            {viewModel.links.map(_ => {
                return (
                    <PivotItem key={_.link} headerText={_.name} itemKey={_.link} />
                );
            })}
        </Pivot>
    );
});
