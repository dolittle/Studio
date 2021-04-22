import React from 'react';
import { TextField, ITextFieldStyles } from '@fluentui/react/lib/TextField';
import { Label } from '@fluentui/react/lib/Label';
import { Stack } from '@fluentui/react/lib/Stack';

const textFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { width: 300 } };

export const BasicAuthComponent: React.FunctionComponent = () => {

    return (
        <div>
            <h1>Hello basic auth</h1>
            <Stack horizontal>
                <Label>Username</Label>
                <TextField styles={textFieldStyles} />
            </Stack>

            <Stack horizontal>
                <Label>Password</Label>
                <TextField styles={textFieldStyles} />
            </Stack>
        </div>
    );
};
