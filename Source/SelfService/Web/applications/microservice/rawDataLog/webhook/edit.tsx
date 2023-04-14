// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { Label } from '@fluentui/react/lib/Label';
import { TextField, ITextFieldStyles } from '@fluentui/react/lib/TextField';
import { Stack } from '@fluentui/react/lib/Stack';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { IDropdownOption } from '@fluentui/react';

import { Button } from '@dolittle/design-system';

import { MicroserviceRawDataLogIngestorWebhookConfig, ConnectorWebhookConfigBasic } from '../../../../apis/solutions/index';
import { BasicAuthComponent } from '../../../../components/basicAuthComponent';
import { BearerAuthComponent } from '../../../../components/bearerAuthComponent';

import { trimPrefix, trimSuffix } from '../../../../utils/helpers';
import { makeBasicAuth, makeBearer } from '../../../../utils/httpCredentials';

const textFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { width: 300 } };
const stackTokens = { childrenGap: 15 };

export type EditProps = {
    domain: string;
    ingressPath: string;
    webhook: MicroserviceRawDataLogIngestorWebhookConfig;
    onAfterSave: (webhooks: MicroserviceRawDataLogIngestorWebhookConfig) => Promise<void>;
};

const defaultAuthType = 'Basic';

export const Edit = (props: EditProps) => {
    const currentWebhook = props!.webhook;
    let domain = props!.domain;
    let ingressPath = props!.ingressPath;
    const onAfterSave = props!.onAfterSave;

    domain = trimSuffix(domain, '/');
    ingressPath = trimPrefix(ingressPath, '/');
    ingressPath = trimSuffix(ingressPath, '/');

    const urlPrefix = `${domain}/${ingressPath}`;
    const actionText = 'Save';
    const authInfo = getAuthInfo(currentWebhook.authorization);

    const [authOptionState, setAuthOptionState] = useState(authInfo[0]);
    const [config, setConfig] = useState(authInfo);
    const [webhook, setWebhook] = useState(currentWebhook);

    const authenticationOptions: IDropdownOption[] = [
        { key: 'Bearer', text: 'Bearer Token' },
        { key: 'Basic', text: 'Basic (username and password)' }
    ];

    const authTypeChanged = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => {
        // TODO Need to update the config for this kind as well
        switch (option!.key) {
            case 'Basic':
                setConfig(['Basic', '']);
                break;
            case 'Bearer':
                setConfig(['Bearer', '']);
                break;
        }

        setWebhook({
            ...webhook,
            authorization: '',
        });
        setAuthOptionState(option!.key as string);
    };

    const onUpdateConfig = (data: any) => {
        switch (authOptionState) {
            case 'Bearer':
                setWebhook({
                    ...webhook,
                    authorization: makeBearer(data),
                });
                return;
            case 'Basic':
                setWebhook({
                    ...webhook,
                    authorization: makeBasicAuth(data as ConnectorWebhookConfigBasic),
                });
                return;
        }
    };

    return (
        <>
            <Stack horizontal tokens={stackTokens}>
                <Label>Entity type / Kind</Label>
                <TextField
                    styles={textFieldStyles}
                    value={webhook.kind}
                    onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
                        let kind = newValue!;
                        if (kind === '') {
                            kind = webhook.uriSuffix;
                        }

                        setWebhook({
                            ...webhook,
                            kind,
                        });
                    }}
                />
            </Stack>

            <Stack horizontal tokens={stackTokens}>
                <Label>Endpoint</Label>
                <TextField
                    styles={textFieldStyles}
                    defaultValue={urlPrefix}
                    readOnly
                />
                <span>/</span>
                <TextField
                    styles={textFieldStyles}
                    value={webhook.uriSuffix}
                    onChange={(event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
                        const uriSuffix = newValue!;
                        let kind = webhook.kind;
                        if (kind === '' || kind === webhook.uriSuffix) {
                            kind = uriSuffix;
                        }

                        setWebhook({
                            ...webhook,
                            uriSuffix,
                            kind,
                        });
                    }}
                />
            </Stack>

            <Stack horizontal tokens={stackTokens}>
                <Label>Authentication</Label>

                <Dropdown placeholder="Select"
                    defaultSelectedKey={authOptionState}
                    options={authenticationOptions}
                    onChange={authTypeChanged}
                    dropdownWidth="auto"
                />
            </Stack>

            {authOptionState === 'Basic' && (
                <BasicAuthComponent {...getUsernameAndPasswordFromBasicAuth(config[1])} onUpdate={onUpdateConfig} />
            )}

            {authOptionState === 'Bearer' && (
                <BearerAuthComponent token={config[1]} onUpdate={onUpdateConfig} />
            )}

            <Stack horizontal horizontalAlign="end" tokens={stackTokens}>
                <Button label={actionText} onClick={() => onAfterSave(webhook)} />
            </Stack>
        </>
    );
};

function getAuthInfo(data: string): string[] {
    try {
        const parts = data.split(' ');
        const authType = parts[0].toLowerCase();
        parts.shift();
        const authData = parts.join(' ');
        if (authType === 'basic') {
            return ['Basic', authData];
        }

        if (authType === 'bearer') {
            return ['Bearer', authData];
        }
        throw Error();
    } catch (e) {
        return [defaultAuthType, ''];
    }
};

function getUsernameAndPasswordFromBasicAuth(data: string): ConnectorWebhookConfigBasic {
    try {
        const parts = atob(data).split(':');
        return {
            username: parts[0],
            password: parts[1],
        } as ConnectorWebhookConfigBasic;
    } catch (e) {
        return {
            username: '',
            password: '',
        } as ConnectorWebhookConfigBasic;
    }
};
