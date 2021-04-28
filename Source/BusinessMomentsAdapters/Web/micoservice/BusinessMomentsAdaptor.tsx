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
import { Connector } from '../store';


const textFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { width: 300 } };
const stackTokens = { childrenGap: 15 };

export const Microservice: React.FunctionComponent = () => {
    const [connectorTypeState, setConnectorTypeState] = React.useState('');

    const options: IChoiceGroupOption[] = [
        { key: 'webhook', text: 'webhook' },
        { key: 'rest', text: 'Rest' },
    ];

    function _onChange(ev?: React.FormEvent<HTMLElement | HTMLInputElement>, option?: IChoiceGroupOption): void {
        setConnectorTypeState(option!.key as string);
    }


    const connector = {
        id: '',
        name: '',
        kind: 'webhook',
        config: {
            domain: '',
            uriPrefix: '',
            kind: '',
            config: {}
        }
    } as Connector;

    return (
        <>
            <Stack tokens={stackTokens}>
                <Stack tokens={stackTokens}>
                    <Text variant="xLarge" block>
                        Please choose a connector type:
                    </Text>
                    <ChoiceGroup defaultValue={connectorTypeState} options={options} onChange={_onChange} label="Pick connector type" required={true} />
                </Stack>

                {connectorTypeState === 'webhook' && (
                    <Stack horizontal tokens={stackTokens}>
                        <WebhooksConfig connector={connector} />
                    </Stack>
                )}

                {connectorTypeState === 'rest' && (
                    <Stack horizontal tokens={stackTokens}>
                        <RestConfig />
                    </Stack>
                )}


            </Stack>
        </>
    );
};
