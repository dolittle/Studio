// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import { useParams } from 'react-router-dom';

import { Label } from '@fluentui/react/lib/Label';
import { TextField, ITextFieldStyles } from '@fluentui/react/lib/TextField';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { Stack } from '@fluentui/react/lib/Stack';
import { IDropdownOption } from '@fluentui/react';
import { PrimaryButton } from '@fluentui/react/lib/Button';

import { BasicAuthComponent } from './BasicAuthComponent';
import { BearerAuthComponent } from './BearerAuthComponent';
import { getConnector, Connector, ConnectorWebhookConfigBearer, ConnectorWebhookConfigBasic } from '../store';

const textFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { width: 300 } };
const stackTokens = { childrenGap: 15 };


type WebhooksConfigProps = {
    connector?: Connector
};
// TODO how to pass in

export const WebhooksConfig: React.FunctionComponent<WebhooksConfigProps | undefined> = (props) => {
    console.log(props, props!.connector);
    const { id } = useParams() as any;

    // TODO ugly going on here due to undefined
    const connector = id ? getConnector(id)! : {
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

    if (id && !connector) {
        // TODO I feel we need a better experience here, just adding base logic for now
        return (
            <h1>Connector could not be found</h1>
        );
    }

    const [authOptionState, setAuthOptionState] = React.useState(connector?.config.kind);

    let authenticationOptions: IDropdownOption[] = [
        { key: 'bearer', text: 'Bearer Token' },
        { key: 'basic', text: 'Basic (username and password)' }
    ];

    authenticationOptions = authenticationOptions.map(option => {
        const configKind = connector?.config.kind;
        if (configKind === option.key) {
            option.selected = true;
        }
        return option;
    });

    const authTypeChanged = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => {
        // TODO Need to update the config for this kind as well
        connector.config.kind = option!.key as string;

        switch (connector.config.kind) {
            case 'basic':
                // Not sure this is perfect
                connector.config.config = {} as ConnectorWebhookConfigBasic;
                // TODO I am sure there is a better way
                connector.config.config.username = '';
                connector.config.config.password = '';
                break;
            case 'bearer':
                connector.config.config = {} as ConnectorWebhookConfigBearer;
                connector.config.config.token = '';
                break;
            default:
                console.error('Kind not supported', connector.kind);
                connector.config.config = {};
        }

        setAuthOptionState(option!.key as string);
    };

    return (
        <Stack tokens={stackTokens}>
            <h1>Webhooks configuration:</h1>
            <Stack horizontal tokens={stackTokens}>
                <Label>Webhook name</Label>
                <TextField
                    styles={textFieldStyles}
                    defaultValue={connector?.name}
                    onChange={(e, v) => {
                        connector.name = v!;
                    }}
                />
            </Stack>

            <Stack horizontal tokens={stackTokens}>
                <Label>Endpoint</Label>
                <TextField
                    styles={textFieldStyles}
                    defaultValue="TODO"
                />
                <span>/</span>
                <TextField
                    styles={textFieldStyles}
                    defaultValue={connector?.config.uriPrefix}
                    onChange={(e, v) => {
                        connector.config.uriPrefix = v!;
                    }}
                />

                <PrimaryButton text="Copy to clipboard" onClick={_copyToClipboard} />
            </Stack>

            <Stack horizontal tokens={stackTokens}>
                <Label>Authentication</Label>

                <Dropdown placeholder="Select"
                    options={authenticationOptions}
                    onChange={authTypeChanged}
                    dropdownWidth="auto"
                />
            </Stack>

            {authOptionState === 'basic' && (
                <BasicAuthComponent {...connector!.config.config} />
            )}

            {authOptionState === 'bearer' && (
                <BearerAuthComponent {...connector!.config.config} />
            )}

            <Stack horizontal horizontalAlign="end" tokens={stackTokens}>
                <PrimaryButton text="Create" onClick={() => _onSave(connector)} />
            </Stack>
        </Stack>
    );
};

function _copyToClipboard(): void {
    console.log('copy to clipboard');
}

function _onSave(connector: Connector): void {
    console.log('onSave', connector);
}
