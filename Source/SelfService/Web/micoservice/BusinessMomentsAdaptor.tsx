// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.


// TODO how to load the logs?
// TODO validate the data
// TODO change action button from create to save

import React from 'react';

import { ITextFieldStyles } from '@fluentui/react/lib/TextField';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';

import { WebhooksConfig } from '../configuration/WebhooksConfiguration';
import { Config as RestConfig } from '../configuration/RestConfiguration';
import { Connector, MicroserviceBusinessMomentAdaptor, createMicroservice, MicroserviceBusinessMomentAdaptorConnector } from '../store';

const textFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { width: 300 } };
const stackTokens = { childrenGap: 15 };

export const Microservice: React.FunctionComponent = () => {
    const applicationId = '11b6cf47-5d9f-438f-8116-0d9828654657';
    const ms = {
        dolittle: {
            applicationId: '11b6cf47-5d9f-438f-8116-0d9828654657',
            tenantId: '453e04a7-4f9d-42f2-b36c-d51fa2c83fa3',
            microserviceId: '9f6a613f-d969-4938-a1ac-5b7df199bc41'
        },
        name: 'Webhook-101',
        kind: 'buisness-moments-adaptor',
        environment: 'Dev',
        extra: {
            headImage: '453e04a74f9d42f2b36cd51fa2c83fa3.azurecr.io/businessmomentsadaptor:latest',
            runtimeImage: 'dolittle/runtime:5.6.0',
            ingress: {
                path: '/api/webhooks-ingestor',
                pathType: 'Prefix'
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
            window.location.href = `/application/${applicationId}`;
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
                    <WebhooksConfig action='insert' ms={ms} onSave={onSave} />
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
