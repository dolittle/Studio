// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { HttpResponseApplications2 } from '../api/api';
import { ApplicationInfo } from './info';

type Props = {
    application: HttpResponseApplications2
    info: any
};

export const ContainerRegistryInfoScreen: React.FunctionComponent<Props> = (props) => {
    return (
        <>
            <h1>Container Registry Info</h1>
            <ApplicationInfo {...props} />
        </>
    );
};
