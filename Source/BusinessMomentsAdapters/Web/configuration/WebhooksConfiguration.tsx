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
import { getConnector } from '../store';

const textFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { width: 300 } };
const stackTokens = { childrenGap: 15 };

export const WebhooksConfig: React.FunctionComponent = () => {
    const { id } = useParams() as any;


    const connector = getConnector(id);

    if (!connector) {
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
                />

                <PrimaryButton text="Copy to clipboard" onClick={_copyToClipboard} />
            </Stack>

            <Stack horizontal tokens={stackTokens}>
                <Label>Authentication</Label>

                <Dropdown placeholder="Select"
                    options={authenticationOptions}
                    onChange={authTypeChanged}
                />
            </Stack>

            {authOptionState === 'basic' && (
                <BasicAuthComponent {...connector!.config.config} />
            )}

            {authOptionState === 'bearer' && (
                <BearerAuthComponent {...connector!.config.config} />
            )}

            <Stack horizontal horizontalAlign="end" tokens={stackTokens}>
                <PrimaryButton text="Create" onClick={_alertClicked} />
            </Stack>
        </Stack>
    );
};

function _copyToClipboard(): void {
    console.log('copy to clipboard');
}

function _alertClicked(): void {
    alert('Clicked');
}
