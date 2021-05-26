// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { Label } from '@fluentui/react/lib/Label';
import { TextField } from '@fluentui/react/lib/TextField';
import { MicroserviceSimple, createMicroservice } from '../store';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { Guid } from '@dolittle/rudiments';
import { HttpResponseApplications2 } from '../api';

const stackTokens = { childrenGap: 15 };

type Props = {
    application: HttpResponseApplications2
    environment: string
};

export const Microservice: React.FunctionComponent<Props> = (props) => {
    const _props = props!;
    const application = _props.application;
    const environment = _props.environment;
    const ingressInfo = application.environments.find(e => e.name === environment)!;

    // TODO do something with
    const microserviceId = Guid.create().toString();

    const ms = {
        dolittle: {
            applicationId: application.id,
            tenantId: application.tenantId,
            microserviceId,
        },
        name: 'Order',
        kind: 'simple',
        environment: _props.environment,
        extra: {
            // nginxdemos/hello:latest
            headImage: 'dolittle/spinner:0.0.0', // Doesnt work
            runtimeImage: 'dolittle/runtime:5.6.0',
            ingress: {
                path: '/',
                pathType: 'Prefix',
                host: ingressInfo.host,
                domainPrefix: ingressInfo.domainPrefix
            }
        }
    } as MicroserviceSimple;

    const [msName, setMsName] = React.useState(ms.name);
    const [headImage, setHeadImage] = React.useState(ms.extra.headImage);
    const [runtimeImage, setRuntimeImage] = React.useState(ms.extra.runtimeImage);
    const [ingressPath, setIngressPath] = React.useState(ms.extra.ingress.path);
    const [ingressDomainPrefix, setIngressDomainPrefix] = React.useState(ms.extra.ingress.domainPrefix);
    const onChangeHandler = (setter: React.Dispatch<React.SetStateAction<string>>): ((event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => void) => {
        return (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void => {
            {
                setter(newValue!);
            };
        };
    };


    const _onSave = (ms: MicroserviceSimple): void => {
        ms.name = msName;
        ms.extra.headImage = headImage;
        ms.extra.runtimeImage = runtimeImage;
        ms.extra.ingress.path = ingressPath;
        // TODO land the name we want here
        ms.extra.ingress.domainPrefix = ingressDomainPrefix;
        ms.extra.ingress.secretNamePrefix = ingressDomainPrefix;
        console.log('onSave', ms);
        createMicroservice(ms.kind, ms);
    };

    return (
        <>
            <Stack tokens={stackTokens}>
                <h1>Microservice Specific</h1>
                <Label>UUID</Label>
                <TextField defaultValue={ms.dolittle.microserviceId} readOnly />

                <Label>Name</Label>
                <TextField defaultValue={msName} onChange={onChangeHandler(setMsName)} />

                <Label>Environment</Label>
                <TextField placeholder="Dev" defaultValue={ms.environment} readOnly />

                <Label>Head Image</Label>
                <TextField defaultValue={headImage} onChange={onChangeHandler(setHeadImage)} />

                <Label>Runtime Image</Label>
                <TextField defaultValue={runtimeImage} onChange={onChangeHandler(setRuntimeImage)} />


                <h1>Ingress</h1>


                <Label>Path</Label>
                <TextField placeholder="/" defaultValue={ingressPath} onChange={onChangeHandler(setIngressPath)} />

                <Label>PathType</Label>
                <TextField placeholder="Prefix" defaultValue={ms.extra.ingress.pathType} readOnly />

                <Label>Domain Prefix</Label>
                <TextField placeholder="" defaultValue={ingressDomainPrefix} onChange={onChangeHandler(setIngressDomainPrefix)} />
            </Stack>

            <Stack horizontal horizontalAlign="end" tokens={stackTokens}>
                <PrimaryButton text="Create" onClick={() => _onSave(ms)} />
            </Stack>
        </>
    );
};

