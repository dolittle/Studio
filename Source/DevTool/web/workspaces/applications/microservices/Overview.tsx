// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Application, Microservice } from '@dolittle/vanir-common';
import React from 'react';
import { TextField, Stack, IStackStyles, IStackProps, FontIcon } from '@fluentui/react';
import { Workspace, MicroservicePorts } from '../../../../common/workspaces';

const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };
const stackTokens = { childrenGap: 50 };
const columnProps: Partial<IStackProps> = {
    tokens: { childrenGap: 15 },
    styles: { root: { width: 300 } },
};


export const Overview = (props: { workspace?: Workspace, application?: Application, microservice?: Microservice }) => {
    if (!props.workspace || !props.application || !props.microservice) {
        return (<></>);
    }

    const ports = props.workspace?.microservicePorts?.find(_ => _.id === props.microservice!.id) || MicroservicePorts.default;

    return (
        <>
            <Stack tokens={stackTokens} horizontal styles={stackStyles}>
                <Stack {...columnProps} >
                    <TextField label="Identifier" readOnly value={props.microservice.id} />
                    <TextField label="Name" readOnly value={props.microservice.name} />
                    <TextField label="Version" readOnly value={props.microservice.version} />
                </Stack>
                <Stack {...columnProps} >
                    <TextField label="Backend Port" readOnly value={ports.backend.toString()} />
                    <TextField label="Web Port" readOnly value={ports.web.toString()} />
                    <TextField label="Runtime Port" readOnly value={ports.runtime.toString()} />
                    <TextField label="Metrics Port" readOnly value={ports.metrics.toString()} onRenderSuffix={() => (<span style={{cursor: 'pointer'}} onClick={() => alert('hello')}><FontIcon iconName="Globe" /></span>)} />
                </Stack>
            </Stack>
        </>
    );
};
