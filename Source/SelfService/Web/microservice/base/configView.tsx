// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import { useHistory } from 'react-router-dom';

import { Stack } from '@fluentui/react/lib/Stack';
import { Label } from '@fluentui/react/lib/Label';
import { TextField } from '@fluentui/react/lib/TextField';
import { PrimaryButton } from '@fluentui/react/lib/Button';

import { MicroserviceSimple } from '../../api/index';


const stackTokens = { childrenGap: 15 };

type Props = {
    microservice: MicroserviceSimple
};

export const ConfigView: React.FunctionComponent<Props> = (props) => {
    const _props = props!;
    const ms = _props.microservice;
    // TODO why am I seeing secretNamePrefix and not domainPrefix?
    return (
        <>
            <Stack tokens={stackTokens}>
                <h1>Microservice Specific</h1>
                <Label>UUID</Label>
                <TextField defaultValue={ms.dolittle.microserviceId} readOnly />

                <Label>Name</Label>
                <TextField defaultValue={ms.name} readOnly />

                <Label>Environment</Label>
                <TextField defaultValue={ms.environment} readOnly />

                <Label>Head Image</Label>
                <TextField defaultValue={ms.extra.headImage} readOnly />

                <Label>Runtime Image</Label>
                <TextField defaultValue={ms.extra.runtimeImage} readOnly />


                <h1>Ingress</h1>

                <Label>Path</Label>
                <TextField placeholder="/" defaultValue={ms.extra.ingress.path} readOnly />

                <Label>PathType</Label>
                <TextField defaultValue={ms.extra.ingress.pathType} readOnly />

                <Label>Domain Prefix</Label>
                <TextField placeholder="" defaultValue={ms.extra.ingress.domainPrefix} readOnly />
            </Stack>
        </>
    );
};

