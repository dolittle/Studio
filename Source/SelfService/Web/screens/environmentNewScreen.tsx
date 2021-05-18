// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Stack } from '@fluentui/react/lib/Stack';
import { TextField, ITextFieldStyles } from '@fluentui/react/lib/TextField';

import { getTenant } from '../store';
import { Label } from '@fluentui/react/lib/Label';
import { PrimaryButton } from '@fluentui/react/lib/Button';

const textFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { width: 300 } };
const stackTokens = { childrenGap: 15 };

export const EnvironmentNewScreen: React.FunctionComponent = () => {
    const tenantId = getTenant();
    const { applicationId } = useParams() as any;

    const fromStore = {
        environment: 'Dev',
        domainPrefix: 'freshteapot-taco',
        domainSuffix: '.dolittle.cloud',
    };

    const [environment, setEnvironment] = useState(fromStore.environment);
    const [domainPrefix, setDomainPrefix] = useState(fromStore.domainPrefix);
    const [domainSuffix, setDomainSuffix] = useState(fromStore.domainSuffix);

    return (
        <>
            <h1>Environment New Screen</h1>

            <Stack tokens={stackTokens}>
                <Label>Name</Label>
                <TextField defaultValue={environment} onChange={(e, v) => {
                    setEnvironment(v!);
                }} />

                <Label>Domain</Label>
                <Stack horizontal tokens={stackTokens}>
                    <TextField
                        placeholder="hello"
                        styles={textFieldStyles}
                        defaultValue={domainPrefix}
                        onChange={(e, v) => {
                            setDomainPrefix(v!);
                        }}
                    />
                    <TextField
                        styles={textFieldStyles}
                        defaultValue={domainSuffix}
                        disabled
                    />
                </Stack>

                <PrimaryButton text="Create" onClick={(e => {
                    // TODO create environment in the backend.
                    const host = `${domainPrefix}${domainSuffix}`;

                    const input = {
                        tenantId,
                        applicationId,
                        name: environment,
                        domainPrefix,
                        host,
                    } as any;

                    // TODO Check if environment exists
                    console.log('create environment');
                    console.log(input);
                })} />

            </Stack>
        </>
    );
};
