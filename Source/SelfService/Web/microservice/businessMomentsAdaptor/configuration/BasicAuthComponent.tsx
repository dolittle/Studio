// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import { TextField, ITextFieldStyles } from '@fluentui/react/lib/TextField';
import { Label } from '@fluentui/react/lib/Label';
import { Stack } from '@fluentui/react/lib/Stack';

const textFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { width: 300 } };
const stackTokens = { childrenGap: 15 };

type Props = {
    username?: string
    password?: string
    onUpdate?: (data: any) => void;
};

export const BasicAuthComponent: React.FunctionComponent<Props> = (props) => {
    const username = props!.username!;
    const password = props!.password!;
    const onUpdate = props!.onUpdate!;

    const [usernameState, setUsernameState] = React.useState(username);
    const [passwordState, setPasswordState] = React.useState(password);

    return (
        <>
            <Stack horizontal tokens={stackTokens}>
                <Label>Username</Label>
                <TextField
                    styles={textFieldStyles}
                    defaultValue={usernameState}
                    onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
                        setUsernameState(newValue as string);
                        onUpdate({
                            username: newValue,
                            password: passwordState
                        });
                    }}
                />
            </Stack>

            <Stack horizontal tokens={stackTokens}>
                <Label>Password</Label>
                <TextField
                    styles={textFieldStyles}
                    defaultValue={passwordState}
                    onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
                        setPasswordState(newValue as string);
                        onUpdate({
                            username: usernameState,
                            password: newValue
                        });
                    }}
                />
            </Stack>
        </>
    );
};
