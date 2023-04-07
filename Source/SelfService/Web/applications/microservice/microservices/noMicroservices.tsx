// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { NoEntityView } from '../../../components/noEntityView/noEntityView';

type NoMicroservicesProps = {
    onCreate: () => void;
};

export const NoMicroservices = ({ onCreate }: NoMicroservicesProps) =>
    <NoEntityView
        title='No microservices deployed yet...'
        createEntityProps={{
            createEntityText: 'Deploy new microservice',
            createEntityIcon: 'RocketLaunch',
            onCreateEntity: onCreate,
        }}
        description='After you deploy your first microservice it will appear here.'
        subDescription={`To deploy a new microservice click on the 'deploy a microservice' button or 'deploy new' tab at the top.`}
    />;
