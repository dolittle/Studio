// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.


// TODO how to load the logs?
// TODO validate the data
// TODO change action button from create to save

import React from 'react';

import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';

import { WebhooksConfig } from '../configuration/WebhooksConfiguration';
import { Config as RestConfig } from '../configuration/RestConfiguration';
import { MicroserviceBusinessMomentAdaptor, createMicroservice, MicroserviceBusinessMomentAdaptorConnector, uriWithAppPrefix } from '../store';
import { Guid } from '@dolittle/rudiments';

const stackTokens = { childrenGap: 15 };

type Props = {
    applicationId: string
    tenantId?: string
    environment: string
};

export const Microservice: React.FunctionComponent<Props> = (props) => {
    const _props = props!;
    const applicationId = _props.applicationId;
    const environment = _props.environment;
    const microserviceId = Guid.create().toString();

    const fromStore = {
        domain: 'freshteapot-taco.dolittle.cloud',
        domainPrefix: 'freshteapot-taco',
        businessmomentsadaptor: {
            image: '453e04a74f9d42f2b36cd51fa2c83fa3.azurecr.io/businessmomentsadaptor:latest',
        },
        runtime: {
            image: 'dolittle/runtime:5.6.0'
        }
    };

    const ms = {
        dolittle: {
            applicationId,
            tenantId: _props.tenantId, // TODO I am not sure I want this
            microserviceId,
        },
        name: 'Webhook-101',
        kind: 'buisness-moments-adaptor',
        environment,
        extra: {
            headImage: fromStore.businessmomentsadaptor.image,
            runtimeImage: fromStore.runtime.image,
            ingress: {
                path: '/api/webhooks-ingestor',
                pathType: 'Prefix',
                domainPrefix: fromStore.domainPrefix,
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
            }
        }
    } as MicroserviceBusinessMomentAdaptor;

    const onSave = (ms: MicroserviceBusinessMomentAdaptor): void => {
        console.log('onSave', ms);

        createMicroservice(ms.kind, ms).then(data => {
            window.location.href = uriWithAppPrefix(`/application/${applicationId}`);
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
                    <WebhooksConfig domain={fromStore.domain} action='insert' ms={ms} onSave={onSave} />
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
