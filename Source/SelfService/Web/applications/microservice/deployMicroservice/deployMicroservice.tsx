// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { useNavigate, useLocation } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { Guid } from '@dolittle/rudiments';

import { Typography } from '@mui/material';

import { Button, Form, LoadingSpinner } from '@dolittle/design-system';

import { saveSimpleMicroservice } from '../../stores/microservice';

import { MicroserviceSimple, MicroserviceFormParameters } from '../../../apis/solutions/index';
import { getLatestRuntimeInfo } from '../../../apis/solutions/api';
import { HttpResponseApplication } from '../../../apis/solutions/application';

import { ContainerImageFields } from '../components/form/containerImageFields';
import { HasM3ConnectorField } from '../components/form/hasM3ConnectorField';
import { PublicUrlFields } from '../components/form/publicUrlFields';
import { SetupFields } from '../components/form/setupFields';

export type DeployMicroserviceProps = {
    application: HttpResponseApplication;
};

export const DeployMicroservice = ({ application }: DeployMicroserviceProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { enqueueSnackbar } = useSnackbar();

    const [isLoading, setIsLoading] = useState(false);

    // TODO ENV: Show always as 'false' while deploying and display option later in configuration?
    //const environmentInfo = application.environments.find(env => env.name === 'Dev')!;
    const hasM3ConnectorOption = false; // environmentInfo?.connections?.m3Connector || false;

    const availableEnvironments = application.environments.map(env => env.name);
    const latestRuntimeVersion = getLatestRuntimeInfo().image;

    const frag = new URLSearchParams(location.hash.slice(1));

    const handleCreateMicroservice = async (values: MicroserviceFormParameters) => {
        setIsLoading(true);

        const microserviceId = Guid.create().toString();
        // Convert the head arguments to the format that the form expects.
        const headArgumentValues = values.headArguments.map(arg => arg.value);

        const newMicroservice: MicroserviceSimple = {
            dolittle: {
                applicationId: application.id,
                customerId: application.customerId,
                microserviceId,
            },
            name: values.microserviceName,
            kind: 'simple',
            environment: values.developmentEnvironment,
            extra: {
                headImage: values.headImage,
                headPort: parseInt(values.headPort.toString(), 10),
                runtimeImage: values.runtimeVersion,
                isPublic: values.isPublic,
                ingress: {
                    path: '/' + values.ingressPath,
                    pathType: 'Prefix',
                },
                headCommand: {
                    command: values.entrypoint.length ? [values.entrypoint] : [],
                    args: headArgumentValues,
                },
                connections: {
                    m3Connector: values.hasM3Connector,
                },
            },
        };

        try {
            await saveSimpleMicroservice(newMicroservice);
            enqueueSnackbar(`Microservice '${values.microserviceName}' has been deployed.`);
            const href = `/microservices/application/${application.id}/view/${newMicroservice.dolittle.microserviceId}/${newMicroservice.environment}}`;
            navigate(href);
        } catch (error: unknown) {
            const message = (error instanceof Error) ? error.message : 'Something went wrong when saving microservice.';
            enqueueSnackbar(message, { variant: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Typography variant='h1' sx={{ mt: 3, mb: 4 }}>Deploy Base Microservice</Typography>

            <Form<MicroserviceFormParameters>
                initialValues={{
                    microserviceName: '',
                    developmentEnvironment: availableEnvironments[0],
                    runtimeVersion: latestRuntimeVersion,
                    headImage: frag.get('head-image') || '', // nginxdemos/hello:latest
                    headPort: 80,
                    entrypoint: '',
                    isPublic: false,
                    headArguments: [],
                    ingressPath: '',
                    hasM3Connector: false,
                }}
                sx={{ 'ml': 3, '& .MuiFormControl-root': { my: 1 } }}
                onSubmit={handleCreateMicroservice}
            >
                <SetupFields environments={availableEnvironments} />
                <ContainerImageFields />
                <PublicUrlFields />

                {hasM3ConnectorOption && <HasM3ConnectorField />}

                {isLoading ?
                    <LoadingSpinner /> :
                    <Button variant='filled' label='Deploy microservice' type='submit' startWithIcon='RocketLaunch' sx={{ mt: 1 }} />
                }
            </Form>
        </>
    );
};
