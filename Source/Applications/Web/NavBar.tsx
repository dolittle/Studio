// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { withViewModel } from '@shared/mvvm';
import React from 'react';
import { NavBarViewModel } from './NavBarViewModel';

export type NavBarProps = {
    handleNavbarActionButtonTriggered?: () => void;
};

export const NavBar = withViewModel<NavBarViewModel, NavBarProps>(
    NavBarViewModel,
    ({ viewModel, props }) => {
        viewModel.handleNavbarActionButtonTriggered = props.handleNavbarActionButtonTriggered;
        return <></>;
    }
);
