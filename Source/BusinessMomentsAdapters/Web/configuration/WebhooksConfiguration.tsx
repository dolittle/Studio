// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import { Label } from '@fluentui/react/lib/Label';
import { TextField, ITextFieldStyles } from '@fluentui/react/lib/TextField';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { Stack } from '@fluentui/react/lib/Stack';
import { IDropdownOption } from '@fluentui/react';
import { BasicAuthComponent } from './BasicAuthComponent';
import { BearerAuthComponent } from './BearerAuthComponent';

//const [state, setState] = useState('authOptionState')


const textFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { width: 300 } };
const narrowTextFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { width: 100 } };
const stackTokens = { childrenGap: 15 };

export const WebhooksConfig: React.FunctionComponent = () => {
    const [authOptionState, setAuthOptionState] = React.useState('');

    const [firstTextFieldValue, setFirstTextFieldValue] = React.useState('');
    const [secondTextFieldValue, setSecondTextFieldValue] = React.useState('');
    const onChangeFirstTextFieldValue = React.useCallback(
        (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
            setFirstTextFieldValue(newValue || '');
        },
        [],
    );
    const onChangeSecondTextFieldValue = React.useCallback(
        (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
            if (!newValue || newValue.length <= 5) {
                setSecondTextFieldValue(newValue || '');
            }
        },
        [],
    );

    const authenticationOptions: IDropdownOption[] = [
        { key: 'bearer', text: 'Bearer Token' },
        { key: 'basic', text: 'Basic (username and password)' }
    ]

    const authTypeChanged = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => {
        setAuthOptionState(option!.key as string);
    };

    return (
        <Stack tokens={stackTokens}>
            <h1>Webhooks configuration:</h1>
            <Stack horizontal tokens={stackTokens}>
                <Label>Webhook name</Label>
                <TextField
                    value={firstTextFieldValue}
                    onChange={onChangeFirstTextFieldValue}
                    styles={textFieldStyles}
                />
            </Stack>

            <Stack horizontal tokens={stackTokens}>
                <Label>Endpoint</Label>
                <TextField
                    value={firstTextFieldValue}
                    onChange={onChangeFirstTextFieldValue}
                    styles={textFieldStyles}
                />
                <span>/</span>
                <TextField
                    value={firstTextFieldValue}
                    onChange={onChangeFirstTextFieldValue}
                    styles={textFieldStyles}
                />
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

            <TextField
                label="Controlled TextField limiting length of value to 5"
                value={secondTextFieldValue}
                onChange={onChangeSecondTextFieldValue}
                styles={narrowTextFieldStyles}
            />
        </Stack>
    );
};
