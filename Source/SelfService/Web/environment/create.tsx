// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Stack } from '@fluentui/react/lib/Stack';
import { TextField, ITextFieldStyles } from '@fluentui/react/lib/TextField';

import { Label } from '@fluentui/react/lib/Label';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { HttpInputApplicationEnvironment, HttpResponseApplication } from '../api/api';
import { useGlobalContext } from '../stores/notifications';

const textFieldStyles: Partial<ITextFieldStyles> = { fieldGroup: { width: 300 } };
const stackTokens = { childrenGap: 15 };

type Props = {
    application: HttpResponseApplication
};

export const Create: React.FunctionComponent<Props> = (props) => {
    // TODO Get from application
    const { setNotification } = useGlobalContext();
    const tenantId = 'TODO';
    const { applicationId } = useParams() as any;

    const fromStore = {
        environment: 'Dev',
        domainPrefix: 'freshteapot-taco',
        domainSuffix: '.dolittle.cloud',
    };

    const [environment, setEnvironment] = useState(fromStore.environment);
    const [domainPrefix, setDomainPrefix] = useState(fromStore.domainPrefix);
    const [domainSuffix, setDomainSuffix] = useState(fromStore.domainSuffix);
    // Super ugly hack

    useEffect(() => {
        setNotification('TODO: Create environment', 'info');
    }, []);
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
                    // TODO Check if environment exists
                    setNotification('TODO: Create environment', 'info');
                })} />

            </Stack>
        </>
    );
};
