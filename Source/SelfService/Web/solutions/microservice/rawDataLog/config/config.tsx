// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';

import { Label } from '@fluentui/react/lib/Label';
import { TextField, ITextFieldStyles } from '@fluentui/react/lib/TextField';
import { Stack } from '@fluentui/react/lib/Stack';
import { PrimaryButton } from '@fluentui/react/lib/Button';

import { MicroserviceRawDataLogIngestor } from '../../../../api/index';

const textFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { width: 300 } };
const stackTokens = { childrenGap: 15 };


type WebhooksConfigProps = {
    domain: string
    action: string
    ms: MicroserviceRawDataLogIngestor
    onSave?: (ms: MicroserviceRawDataLogIngestor) => Promise<void>;
};
// TODO how to pass in

export const Config: React.FunctionComponent<WebhooksConfigProps | undefined> = (props) => {
    const domain = props!.domain;
    const onSave = props!.onSave!;
    const action = props!.action!;
    const ms = props!.ms!;
    let actionText = 'Create';

    switch (action) {
        case 'insert':
            actionText = 'Create';
            break;
        case 'upsert':
            actionText = 'Save';
            break;

    }

    return (
        <Stack tokens={stackTokens}>
            <Stack horizontal tokens={stackTokens}>
                <Label>Webhook name</Label>
                <TextField
                    styles={textFieldStyles}
                    defaultValue={ms.name}
                    onChange={(e, v) => {
                        ms.name = v!;
                    }}
                />
            </Stack>

            <Stack horizontal tokens={stackTokens}>
                <Label>Endpoint</Label>
                <TextField
                    styles={textFieldStyles}
                    defaultValue={domain}
                    disabled
                />
                <span>/</span>
                <TextField
                    styles={textFieldStyles}
                    defaultValue={ms.extra.ingress.path.substring(1)}
                    onChange={(e, v) => {
                        ms.extra.ingress.path = `/${v!}`;
                    }}
                />
            </Stack>

            <Stack horizontal horizontalAlign="end" tokens={stackTokens}>
                <PrimaryButton text={actionText} onClick={() => {
                    (async () => {
                        await onSave(ms);
                    })();
                }} />
            </Stack>
        </Stack>
    );
};

