// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import { TextField, ITextFieldStyles } from '@fluentui/react/lib/TextField';
import { Stack } from '@fluentui/react/lib/Stack';

const textFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { width: 300 } };
const narrowTextFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { width: 100 } };
const stackTokens = { childrenGap: 15 };

export const TextFieldControlledExample: React.FunctionComponent = () => {
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

    return (
        <Stack tokens={stackTokens}>
            <h1>Webhook configuration:</h1>
            <TextField
                label="Basic controlled TextField"
                value={firstTextFieldValue}
                onChange={onChangeFirstTextFieldValue}
                styles={textFieldStyles}
            />
            <TextField
                label="Controlled TextField limiting length of value to 5"
                value={secondTextFieldValue}
                onChange={onChangeSecondTextFieldValue}
                styles={narrowTextFieldStyles}
            />
        </Stack>
    );
};
