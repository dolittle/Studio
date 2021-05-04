// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import { TextField, ITextFieldStyles } from '@fluentui/react/lib/TextField';
import { Label } from '@fluentui/react/lib/Label';
import { Stack } from '@fluentui/react/lib/Stack';

import { ConnectorWebhookConfigBasic } from '../store';

const textFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { width: 300 } };
const stackTokens = { childrenGap: 15 };

export const BasicAuthComponent: React.FunctionComponent<ConnectorWebhookConfigBasic> = (props) => {
    const username = props!.username;
    const password = props!.password;

    return (
        <>
            <Stack horizontal tokens={stackTokens}>
                <Label>Username</Label>
                <TextField
                    styles={textFieldStyles}
                    defaultValue={username}
                />
            </Stack>

            <Stack horizontal tokens={stackTokens}>
                <Label>Password</Label>
                <TextField
                    styles={textFieldStyles}
                    defaultValue={password}
                />
            </Stack>
        </>
    );
};
