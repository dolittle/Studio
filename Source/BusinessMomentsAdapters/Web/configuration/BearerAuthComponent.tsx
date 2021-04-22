import React from 'react';
import { TextField } from '@fluentui/react/lib/TextField';
import { Stack } from '@fluentui/react/lib/Stack';
import { Label } from '@fluentui/react/lib/Label';

const stackTokens = { childrenGap: 15 };

export const BearerAuthComponent: React.FunctionComponent = () => {

    return (
        <>
            <Stack horizontal tokens={stackTokens}>
                <Label>Token</Label>
                <TextField />
            </Stack>
        </>
    );
};
