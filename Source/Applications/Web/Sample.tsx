// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { withViewModel } from '@shared/mvvm';
import React from 'react';

import { PrimaryButton } from 'office-ui-fabric-react';

import { SampleViewModel } from './SampleViewModel';

export const Sample = withViewModel(SampleViewModel, ({ viewModel }) => {
    return (
        <PrimaryButton onClick={viewModel.create}>Create app</PrimaryButton>
    );
});
