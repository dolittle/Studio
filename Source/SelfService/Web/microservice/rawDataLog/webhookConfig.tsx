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

import { BasicAuthComponent } from './basicAuthComponent';
import { BearerAuthComponent } from './bearerAuthComponent';
import { ConnectorWebhookConfig, MicroserviceBusinessMomentAdaptor } from '../../api/index';

const textFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { width: 300 } };
const stackTokens = { childrenGap: 15 };


type WebhooksConfigProps = {
    domain: string
    action: string
    ms?: MicroserviceBusinessMomentAdaptor
    onSave?: (ms: MicroserviceBusinessMomentAdaptor) => void;
};
// TODO how to pass in

export const WebhooksConfig: React.FunctionComponent<WebhooksConfigProps | undefined> = (props) => {
    const domain = props!.domain;
    const onSave = props!.onSave!;
    const action = props!.action!;
    const ms = props!.ms!;
    const connector = ms.extra.connector.config as ConnectorWebhookConfig;
    console.log('connector', connector);
    //
    const { connectorId } = useParams() as any;
    let actionText = 'Create';

    switch (action) {
        case 'insert':
            actionText = 'Create';
            break;
        case 'upsert':
            actionText = 'Save';
            break;

    }

    const [authOptionState, setAuthOptionState] = React.useState(connector.kind);
    const [configState, setConfigState] = React.useState(connector.config);

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
                //connector.config = {} as ConnectorWebhookConfigBasic;
                setConfigState({
                    username: '',
                    password: '',
                });
                //// TODO I am sure there is a better way
                //connector.config.username = '';
                //connector.config.password = '';
                break;
            case 'bearer':
                //connector.config = {} as ConnectorWebhookConfigBearer;
                //connector.config.token = '';
                setConfigState({
                    token: ''
                });

                break;
            default:
                console.error('Kind not supported', connector.kind);
                connector.config = {};
        }

        setAuthOptionState(option!.key as string);
    };

    const onUpdateConfig = (data: any) => {
        ms.extra.connector.config = data;
    };

    return (
        <Stack tokens={stackTokens}>
            <h1>Webhooks configuration:</h1>
            <Stack horizontal tokens={stackTokens}>
                <Label>Webhook name</Label>
                <TextField
                    styles={textFieldStyles}
                    defaultValue={ms.name}
                    onChange={(e, v) => {
                        ms.name = v!;
                    }}
                />
            </Stack>

            <Stack horizontal tokens={stackTokens}>
                <Label>Endpoint</Label>
                <TextField
                    styles={textFieldStyles}
                    defaultValue={domain}
                    disabled
                />
                <span>/</span>
                <TextField
                    styles={textFieldStyles}
                    defaultValue={ms.extra.ingress.path.substring(1)}
                    onChange={(e, v) => {
                        ms.extra.ingress.path = `/${v!}`;
                    }}
                />
            </Stack>

            <Stack horizontal tokens={stackTokens}>
                <Label>Authentication</Label>

                <Dropdown placeholder="Select"
                    defaultSelectedKey={authOptionState}
                    options={authenticationOptions}
                    onChange={authTypeChanged}
                    dropdownWidth="auto"
                />
            </Stack>

            {authOptionState === 'basic' && (
                <BasicAuthComponent {...connector.config} onUpdate={onUpdateConfig} />
            )}

            {authOptionState === 'bearer' && (
                <BearerAuthComponent {...connector.config} onUpdate={onUpdateConfig} />
            )}

            <Stack horizontal horizontalAlign="end" tokens={stackTokens}>
                <PrimaryButton text={actionText} onClick={() => onSave(ms)} />
            </Stack>
        </Stack>
    );
};

