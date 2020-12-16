// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { withViewModel } from '@shared/MVVM';

import { RoutingViewModel } from './RoutingViewModel';
import { Switch, useHistory, useLocation } from 'react-router-dom';

export interface RoutingProps {
    children: React.ReactNode[] | React.ReactNode;
}

export const Routing = withViewModel<RoutingViewModel, RoutingProps>(RoutingViewModel, ({ viewModel, props }) => {
    const location = useLocation();
    const history = useHistory();

    console.log('Routing');
    viewModel.callback = (path: string) => {
        history.push(path);
        console.log('Pushed history : '+path);
    };

    if (viewModel.currentPath !== location.pathname) {
        //history.push(viewModel.currentPath);
    }

    return (
        <>
            {props.children}
        </>
    );
});