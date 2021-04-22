// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import { Label } from '@fluentui/react/lib/Label';
import { TextField, ITextFieldStyles } from '@fluentui/react/lib/TextField';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { Stack } from '@fluentui/react/lib/Stack';
import { IDropdownOption } from '@fluentui/react';
import { PrimaryButton } from '@fluentui/react/lib/Button';

import { BasicAuthComponent } from './BasicAuthComponent';
import { BearerAuthComponent } from './BearerAuthComponent';

const textFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { width: 300 } };
const stackTokens = { childrenGap: 15 };

export const WebhooksConfig: React.FunctionComponent = () => {
    const [authOptionState, setAuthOptionState] = React.useState('');

    const authenticationOptions: IDropdownOption[] = [
        { key: 'bearer', text: 'Bearer Token' },
        { key: 'basic', text: 'Basic (username and password)' }
    ];

    const authTypeChanged = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => {
        setAuthOptionState(option!.key as string);
    };

    return (
        <Stack tokens={stackTokens}>
            <h1>Webhooks configuration:</h1>
            <Stack horizontal tokens={stackTokens}>
                <Label>Webhook name</Label>
                <TextField
                    styles={textFieldStyles}
                />
            </Stack>

            <Stack horizontal tokens={stackTokens}>
                <Label>Endpoint</Label>
                <TextField
                    styles={textFieldStyles}
                />
                <span>/</span>
                <TextField
                    styles={textFieldStyles}
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
                <BasicAuthComponent />
            )}

            {authOptionState === 'bearer' && (
                <BearerAuthComponent />
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
