// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';

import { Label } from '@fluentui/react/lib/Label';
import { TextField, ITextFieldStyles } from '@fluentui/react/lib/TextField';
import { Stack } from '@fluentui/react/lib/Stack';

import { MicroserviceRawDataLogIngestor } from '../../api/index';

const textFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { width: 300 } };
const stackTokens = { childrenGap: 15 };

type WebhooksConfigProps = {
    microservice: MicroserviceRawDataLogIngestor
};

export const ConfigView: React.FunctionComponent<WebhooksConfigProps> = (props) => {
    const ms = props!.microservice;
    const domain = ms.extra.ingress.host;

    return (
        <Stack tokens={stackTokens}>
            <Stack horizontal tokens={stackTokens}>
                <Label>Webhook name</Label>
                <TextField
                    styles={textFieldStyles}
                    defaultValue={ms.name}
                    readOnly
                />
            </Stack>

            <Stack horizontal tokens={stackTokens}>
                <Label>Endpoint</Label>
                <TextField
                    styles={textFieldStyles}
                    defaultValue={domain}
                    readOnly
                />
                <span>/</span>
                <TextField
                    styles={textFieldStyles}
                    defaultValue={ms.extra.ingress.path.substring(1)}
                    readOnly
                />
            </Stack>
        </Stack>
    );
};

