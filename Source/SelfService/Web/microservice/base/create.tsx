// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import { useHistory } from 'react-router-dom';

import { Stack } from '@fluentui/react/lib/Stack';
import { Label } from '@fluentui/react/lib/Label';
import { TextField } from '@fluentui/react/lib/TextField';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { Guid } from '@dolittle/rudiments';

import { getFirstIngressFromApplication, saveSimpleMicroservice } from '../../stores/microservice';
import { MicroserviceSimple } from '../../api/index';
import { HttpResponseApplications2, getLatestRuntimeInfo } from '../../api/api';
import { DropDownMenu } from '../../theme/dropDownMenu';

const stackTokens = { childrenGap: 15 };

type Props = {
    application: HttpResponseApplications2
    environment: string
};

export const Create: React.FunctionComponent<Props> = (props) => {
    const history = useHistory();
    const _props = props!;
    const application = _props.application;
    const environment = _props.environment;
    const ingressInfo = getFirstIngressFromApplication(application, environment);
    // TODO do something with
    const microserviceId = Guid.create().toString();

    const runtimeInfo = getLatestRuntimeInfo();

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
            headImage: 'nginxdemos/hello:latest', //'dolittle/spinner:0.0.0', // Doesnt work
            runtimeImage: runtimeInfo.image,
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
        saveSimpleMicroservice(ms).then(data => {
            const href = `/microservices/application/${application.id}/${environment}/overview`;
            history.push(href);
        });
    };

    const runtimeImageSelections = [
        {
            value: runtimeInfo.image,
            displayValue: runtimeInfo.image
        },
        {
            value: 'none',
            displayValue: 'None'
        }
    ];
    const handleRuntimeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const _runtimeImage = event.target.value as string;
        setRuntimeImage(_runtimeImage);
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
                <DropDownMenu items={runtimeImageSelections} value={runtimeImage} onChange={handleRuntimeChange}></DropDownMenu>

                <h1>Ingress</h1>

                <Label>Path</Label>
                <TextField placeholder="/" defaultValue={ingressPath} onChange={onChangeHandler(setIngressPath)} />

                <Label>PathType</Label>
                <TextField placeholder="Prefix" defaultValue={ms.extra.ingress.pathType} readOnly />

                <Label>Domain Prefix</Label>
                <TextField placeholder="" defaultValue={ingressDomainPrefix} onChange={onChangeHandler(setIngressDomainPrefix)} readOnly />
            </Stack>

            <Stack horizontal horizontalAlign="end" tokens={stackTokens}>
                <PrimaryButton text="Create" onClick={() => _onSave(ms)} />
            </Stack>
        </>
    );
};
