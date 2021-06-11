// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import { TextField } from '@fluentui/react/lib/TextField';
import { Stack } from '@fluentui/react/lib/Stack';
import { Label } from '@fluentui/react/lib/Label';

const stackTokens = { childrenGap: 15 };

type Props = {
    token: string
    onUpdate: (data: any) => void;
};

export const BearerAuthComponent: React.FunctionComponent<Props> = (props) => {
    const token = props!.token;
    const onUpdate = props!.onUpdate!;
    const [tokenState, setTokenState] = React.useState(token);

    return (
        <>
            <Stack horizontal tokens={stackTokens}>
                <Label>Token</Label>
                <TextField
                    defaultValue={token}
                    onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
                        setTokenState(newValue as string);
                        onUpdate({
                            token: newValue
                        });
                    }}
                />
            </Stack>
        </>
    );
};
