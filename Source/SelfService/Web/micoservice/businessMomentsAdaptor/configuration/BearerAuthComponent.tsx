// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import { TextField } from '@fluentui/react/lib/TextField';
import { Stack } from '@fluentui/react/lib/Stack';
import { Label } from '@fluentui/react/lib/Label';

import { ConnectorWebhookConfigBearer } from '../../../store';

const stackTokens = { childrenGap: 15 };

export const BearerAuthComponent: React.FunctionComponent<ConnectorWebhookConfigBearer> = (props) => {
    const token = props!.token;
    return (
        <>
            <Stack horizontal tokens={stackTokens}>
                <Label>Token</Label>
                <TextField defaultValue={token} />
            </Stack>
        </>
    );
};
