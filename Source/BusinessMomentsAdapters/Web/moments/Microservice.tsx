// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.


// TODO how to load the logs?
// TODO validate the data
// TODO change action button from create to save

import React, { useEffect } from 'react';

import { TextField, ITextFieldStyles } from '@fluentui/react/lib/TextField';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { Stack } from '@fluentui/react/lib/Stack';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { Text, Pivot, PivotItem, IDropdownOption } from '@fluentui/react';
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';

import { WebhooksConfig } from '../configuration/WebhooksConfiguration';
import { Connector } from '../store';





const textFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { width: 300 } };
const stackTokens = { childrenGap: 15 };


export const Create: React.FunctionComponent = () => {
    const [connectorTypeState, setConnectorTypeState] = React.useState('webhook');

    const microserviceTypes: IDropdownOption[] = [
        { key: 'business-miner', text: 'Business Moment Adapter' },
        { key: 'static-site', text: 'Static Site' },
        { key: 'dolittle-microservice', text: 'Default Microservice' }
    ];

    const options: IChoiceGroupOption[] = [
        { key: 'webhook', text: 'webhook' },
        { key: 'rest', text: 'Rest' },
    ];

    function _onChange(ev?: React.FormEvent<HTMLElement | HTMLInputElement>, option?: IChoiceGroupOption): void {
        if (option?.key === 'rest') {
            alert('This feature will come in the future');
            return;
        }
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
                        What type of microservice would you like to create?
                    </Text>
                    <Dropdown placeholder="Select" defaultSelectedKey="business-miner"
                        options={microserviceTypes}
                    />

                    <Text variant="xLarge" block>
                        Please choose a connector type:
                    </Text>
                    <ChoiceGroup defaultSelectedKey="webhook" options={options} onChange={_onChange} label="Pick connector type" required={true} />
                </Stack>

                {connectorTypeState === 'webhook' && (
                    <Stack horizontal tokens={stackTokens}>
                        <WebhooksConfig connector={connector} />
                    </Stack>
                )}
            </Stack>
        </>
    );
};
