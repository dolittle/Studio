// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useNavigate } from 'react-router-dom';

import { CreateButton } from '@dolittle/design-system';

import { MicroserviceObject } from '../../../../apis/solutions/api';
import { HttpResponseApplication } from '../../../../apis/solutions/application';

import { MicroservicesDataGrid } from './microservicesDataGrid';

export type MicroservicesViewProps = {
    application: HttpResponseApplication;
    microservices: MicroserviceObject[];
};

export const MicroservicesList = ({ application, microservices }: MicroservicesViewProps) => {
    const navigate = useNavigate();

    return (
        <>
            <MicroservicesDataGrid application={application} microservices={microservices} />
            <CreateButton label='Deploy New Microservice' onCreate={() => navigate(`/microservices/application/${application.id}/create`)} />
        </>
    );
};
