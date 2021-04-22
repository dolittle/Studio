// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import { TextField, ITextFieldStyles } from '@fluentui/react/lib/TextField';
import { Label } from '@fluentui/react/lib/Label';
import { Stack } from '@fluentui/react/lib/Stack';

const textFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { width: 300 } };
const stackTokens = { childrenGap: 15 };

export const BasicAuthComponent: React.FunctionComponent = () => {
    return (
        <>
            <Stack horizontal tokens={stackTokens}>
                <Label>Username</Label>
                <TextField styles={textFieldStyles} />
            </Stack>

            <Stack horizontal tokens={stackTokens}>
                <Label>Password</Label>
                <TextField styles={textFieldStyles} />
            </Stack>
        </>
    );
};
