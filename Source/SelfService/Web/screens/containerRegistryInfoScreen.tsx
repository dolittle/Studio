// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useParams } from 'react-router-dom';
import { HttpResponseApplications2 } from '../api/api';

import { ApplicationInfo } from '../application/info';

type Props = {
    application: HttpResponseApplications2
};

export const ContainerRegistryInfoScreen: React.FunctionComponent<Props> = (props) => {
    return (
        <>
            <h1>Container Registry Info</h1>
            <ApplicationInfo {...props} />
        </>
    );
};
