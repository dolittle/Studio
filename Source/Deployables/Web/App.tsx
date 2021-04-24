// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { withViewModel } from '@dolittle/vanir-react';

import '@shared/styles/theme';
import './index.scss';
import { AppViewModel } from './AppViewModel';
import { Applications } from './applications/Applications';

export const App = withViewModel(AppViewModel, ({ viewModel }) => {

    return (
        <>
            <Applications />
        </>
    );
});
