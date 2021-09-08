// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.


// TODO how to load the logs?
// TODO validate the data
// TODO change action button from create to save

import React from 'react';
import { Guid } from '@dolittle/rudiments';

import { MicroserviceRawDataLogIngestor } from '../../../api/index';
import { HttpResponseApplications2 } from '../../../api/api';
import { EditConfig } from './editConfig';

type Props = {
    application: HttpResponseApplications2
    environment: string
};

export const Create: React.FunctionComponent<Props> = (props) => {
    const _props = props!;
    const application = _props.application;
    const environment = _props.environment;
    const ingressInfo = application.environments.find(e => e.name === environment)!;
    const microserviceId = Guid.create().toString();

    const fromStore = {
        rawDataLogIngestor: {
            image: 'dolittle/platform-api:latest', // TODO change
        },
        runtime: {
            image: 'dolittle/runtime:6.1.0'
        }
    };

    const ms = {
        dolittle: {
            applicationId: application.id,
            tenantId: application.tenantId,
            microserviceId,
        },
        name: 'RawDataLogIngestor',
        kind: 'raw-data-log-ingestor',
        environment,
        extra: {
            headImage: fromStore.rawDataLogIngestor.image,
            runtimeImage: fromStore.runtime.image,
            ingress: {
                path: '/api/webhooks',
                pathType: 'Prefix',
                host: ingressInfo.host,
                domainPrefix: ingressInfo.domainPrefix
            },
            webhooks: [
                {
                    authorization: 'Bearer TODO',
                    uriSuffix: 'abc/abc',
                    kind: 'abc/abc',
                }
            ],
            webhookStatsAuthorization: 'Bearer TODO',
            writeTo: 'stdout',
        }
    } as MicroserviceRawDataLogIngestor;
    return (
        <>
            <EditConfig ms={ms} application={application} environment={environment} />
        </>
    );
};
