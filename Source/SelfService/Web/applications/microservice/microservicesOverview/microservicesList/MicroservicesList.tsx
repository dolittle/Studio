// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useHref } from 'react-router-dom';

import { Button } from '@dolittle/design-system';

import { MicroserviceObject } from '../../../../apis/solutions/api';
import { HttpResponseApplication } from '../../../../apis/solutions/application';

import { MicroservicesDataGrid } from './microservicesDataGrid';

export type MicroservicesViewProps = {
    application: HttpResponseApplication;
    microservices: MicroserviceObject[];
};

export const MicroservicesList = ({ application, microservices }: MicroservicesViewProps) => {
    const createMicroserviceHref = useHref(`/microservices/application/${application.id}/create`);

    return (
        <>
            <MicroservicesDataGrid application={application} microservices={microservices} />

            <Button
                label='Deploy New Microservice'
                variant='fullwidth'
                startWithIcon='RocketLaunch'
                href={createMicroserviceHref}
                sx={{ mt: 2 }}
            />
        </>
    );
};
