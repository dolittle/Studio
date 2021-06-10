// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.


// TODO how to load the logs?
// TODO validate the data
// TODO change action button from create to save

import React from 'react';
import { useHistory } from 'react-router-dom';

import { Stack } from '@fluentui/react/lib/Stack';
import { Config } from './config';
import { saveRawDataLogIngestorMicroservice } from '../../stores/microservice';
import { MicroserviceRawDataLogIngestor } from '../../api/index';

import { HttpResponseApplications2 } from '../../api/api';

const stackTokens = { childrenGap: 15 };

type Props = {
    application: HttpResponseApplications2
    environment: string
    ms: MicroserviceRawDataLogIngestor
};

export const EditConfig: React.FunctionComponent<Props> = (props) => {
    const history = useHistory();
    const _props = props!;
    const application = _props.application;
    const environment = _props.environment;
    const ms = _props.ms;

    const onSave = (ms: MicroserviceRawDataLogIngestor): void => {
        saveRawDataLogIngestorMicroservice(ms).then(data => {
            const href = `/application/${application.id}/${environment}/microservices/overview`;
            history.push(href);
        });
    };

    return (
        <>
            <Stack horizontal tokens={stackTokens}>
                <Config domain={ms.extra.ingress.host} action='insert' ms={ms} onSave={onSave} />
            </Stack>
        </>
    );
};
