// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { Label } from '@fluentui/react/lib/Label';
import { TextField } from '@fluentui/react/lib/TextField';
import { MicroserviceSimple, createMicroservice } from '../store';
import { PrimaryButton } from '@fluentui/react/lib/Button';

const stackTokens = { childrenGap: 15 };

export const Microservice: React.FunctionComponent = () => {

    const ms = {
        dolittle: {
            applicationId: '11b6cf47-5d9f-438f-8116-0d9828654657',
            tenantId: '453e04a7-4f9d-42f2-b36c-d51fa2c83fa3',
            microserviceId: '9f6a613f-d969-4938-a1ac-5b7df199bc40'
        },
        name: 'Order',
        kind: 'simple',
        environment: 'Dev',
        extra: {
            headImage: '453e04a74f9d42f2b36cd51fa2c83fa3.azurecr.io/taco/order:1.0.6',
            runtimeImage: 'dolittle/runtime:5.6.0',
            ingress: {
                path: '/',
                pathType: 'Prefix'
            }
        }
    } as MicroserviceSimple;

    return (
        <>
            <Stack tokens={stackTokens}>
                <h1>Dolittle</h1>

                <Label>Tenant ID</Label>
                <TextField defaultValue={ms.dolittle.tenantId} />

                <Label>Application ID</Label>
                <TextField defaultValue={ms.dolittle.applicationId} />

            </Stack>

            <Stack tokens={stackTokens}>
                <h1>Microservice Specific</h1>

                <Label>Name</Label>
                <TextField defaultValue={ms.name} />


                <Label>UUID</Label>
                <TextField defaultValue={ms.dolittle.microserviceId} />

                <Label>Environment</Label>
                <TextField placeholder="Dev" defaultValue={ms.environment} />

                <Label>Head Image</Label>
                <TextField defaultValue={ms.extra.headImage} />

                <Label>Runtime Image</Label>
                <TextField defaultValue={ms.extra.runtimeImage} />


                <h1>Ingress</h1>


                <Label>Path</Label>
                <TextField placeholder="/" defaultValue={ms.extra.ingress.path} />

                <Label>PathType</Label>
                <TextField placeholder="Prefix" defaultValue={ms.extra.ingress.pathType} />
            </Stack>

            <Stack horizontal horizontalAlign="end" tokens={stackTokens}>
                <PrimaryButton text="Create" onClick={() => _onSave(ms)} />
            </Stack>
        </>
    );
};


function _onSave(ms: MicroserviceSimple): void {
    console.log('onSave', ms);
    createMicroservice(ms.kind, ms);
}
