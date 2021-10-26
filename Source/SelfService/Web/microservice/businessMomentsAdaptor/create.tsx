// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.


// TODO how to load the logs?
// TODO validate the data
// TODO change action button from create to save

import React from 'react';
import { useHistory } from 'react-router-dom';

import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';

import { WebhooksConfig } from './configuration/WebhooksConfiguration';
import { Config as RestConfig } from './configuration/RestConfiguration';
import { getFirstIngressFromApplication, saveBusinessMomentsAdaptorMicroservice } from '../../stores/microservice';
import { MicroserviceBusinessMomentAdaptor } from '../../api/index';

import { HttpResponseApplications2 } from '../../api/api';
import { Guid } from '@dolittle/rudiments';

const stackTokens = { childrenGap: 15 };

type Props = {
    application: HttpResponseApplications2
    environment: string
};

export const Create: React.FunctionComponent<Props> = (props) => {
    const history = useHistory();
    const _props = props!;
    const application = _props.application;
    const environment = _props.environment;
    const ingressInfo = getFirstIngressFromApplication(application, environment);

    // TODO do something with
    const microserviceId = Guid.create().toString();

    const fromStore = {
        businessmomentsadaptor: {
            image: '453e04a74f9d42f2b36cd51fa2c83fa3.azurecr.io/businessmomentsadaptor:latest',
        },
        runtime: {
            image: 'dolittle/runtime:5.6.0'
        }
    };

    const ms = {
        dolittle: {
            applicationId: application.id,
            tenantId: application.tenantId,
            microserviceId,
        },
        name: 'Webhook-101',
        kind: 'business-moments-adaptor',
        environment,
        extra: {
            headImage: fromStore.businessmomentsadaptor.image,
            runtimeImage: fromStore.runtime.image,
            ingress: {
                path: '/api/webhooks-ingestor',
                pathType: 'Prefix',
                host: ingressInfo.host,
                domainPrefix: ingressInfo.domainPrefix
            },
            connector: {
                kind: 'webhook',
                config: {
                    kind: 'basic',
                    config: {
                        username: 'm3',
                        password: 'johncarmack'
                    }
                }
            },
            moments: [],
            entities: [],
        }
    } as MicroserviceBusinessMomentAdaptor;

    const onSave = (ms: MicroserviceBusinessMomentAdaptor): void => {
        saveBusinessMomentsAdaptorMicroservice(ms).then(data => {
            const href = `/microservices/application/${application.id}/${environment}/overview`;
            history.push(href);
        });
    };

    const [connectorTypeState, setConnectorTypeState] = React.useState('');

    const options: IChoiceGroupOption[] = [
        { key: 'webhook', text: 'webhook' },
        { key: 'rest', text: 'Rest' },
    ];

    function _onChange(ev?: React.FormEvent<HTMLElement | HTMLInputElement>, option?: IChoiceGroupOption): void {
        setConnectorTypeState(option!.key as string);
    }

    return (
        <>

            <Stack tokens={stackTokens}>
                <Text variant="xLarge" block>
                    Please choose a connector type:
                </Text>
                <ChoiceGroup defaultValue={connectorTypeState} options={options} onChange={_onChange} label="Pick connector type" required={true} />
            </Stack>

            {connectorTypeState === 'webhook' && (
                <Stack horizontal tokens={stackTokens}>
                    <WebhooksConfig domain={ingressInfo.host} action='insert' ms={ms} onSave={onSave} />
                </Stack>
            )}

            {connectorTypeState === 'rest' && (
                <Stack horizontal tokens={stackTokens}>
                    <RestConfig />
                </Stack>
            )}

        </>
    );
};
