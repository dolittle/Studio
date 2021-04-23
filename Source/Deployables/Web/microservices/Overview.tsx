// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { PrimaryButton, IContextualMenuProps } from '@fluentui/react';
import { withViewModel } from '@dolittle/vanir-react';
import { OverviewViewModel } from './OverviewViewModel';

export const Overview = withViewModel(OverviewViewModel, ({ viewModel }) => {
    const microserviceTypesMenu: IContextualMenuProps = {
        items: viewModel.microserviceTypes.map(_ => {
            return {
                key: _.id,
                name: _.name
            }
        })
    };

    return (
        <>
            <PrimaryButton menuProps={microserviceTypesMenu}>
                Create...
            </PrimaryButton>
        </>
    );
});

