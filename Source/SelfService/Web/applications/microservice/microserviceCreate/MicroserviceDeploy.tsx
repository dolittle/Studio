// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { useNavigate, useLocation } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { Guid } from '@dolittle/rudiments';

import { Typography } from '@mui/material';

import { Button, Form, LoadingSpinnerFullPage } from '@dolittle/design-system';

import { saveSimpleMicroserviceWithStore } from '../../stores/microservice';

import { MicroserviceSimple, MicroserviceFormParameters } from '../../../apis/solutions/index';
import { getLatestRuntimeInfo } from '../../../apis/solutions/api';
import { HttpResponseApplication } from '../../../apis/solutions/application';

import { ContainerImageFields } from '../components/form/containerImageFields';
import { HasM3ConnectorField } from '../components/form/hasM3ConnectorField';
import { PublicUrlFields } from '../components/form/publicUrlFields';
import { SetupFields } from '../components/form/setupFields';

export type MicroserviceDeployProps = {
    application: HttpResponseApplication;
};

export const MicroserviceDeploy = ({ application }: MicroserviceDeployProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { enqueueSnackbar } = useSnackbar();

    const availableEnvironments = application.environments.map(env => env.name);

    const [selectedEnvironment, setSelectedEnvironment] = useState(availableEnvironments[0]);
    const [isLoading, setIsLoading] = useState(false);

    const environmentInfo = application.environments.find(env => env.name === selectedEnvironment);
    const hasM3ConnectorOption = environmentInfo?.connections?.m3Connector;

    const frag = new URLSearchParams(location.hash.slice(1));

    const handleDeployMicroservice = async (values: MicroserviceFormParameters) => {
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

        const result = await saveSimpleMicroserviceWithStore(newMicroservice, application);

        // TODO ERROR: Temporary solution to hide response error.
        if (result) {
            enqueueSnackbar(`Microservice '${values.microserviceName}' has been deployed.`);
            const href = `/microservices/application/${application.id}/view/${microserviceId}/${values.developmentEnvironment}}`;
            navigate(href);
        } else {
            //enqueueSnackbar('Something went wrong when saving microservice.', { variant: 'error' });

            // Remove these lines when the deploy microservice API is fixed.
            //enqueueSnackbar('This feature may not work properly at this time. We apologize for the inconvenience.');
            const href = `/microservices/application/${application.id}/overview`;
            navigate(href);
        }
    };

    return (
        <>
            {isLoading && <LoadingSpinnerFullPage />}

            <Typography variant='h1' sx={{ mt: 3, mb: 4 }}>Deploy Base Microservice</Typography>

            <Form<MicroserviceFormParameters>
                initialValues={{
                    microserviceName: '',
                    developmentEnvironment: selectedEnvironment,
                    runtimeVersion: getLatestRuntimeInfo().image,
                    headImage: frag.get('head-image') || '', // nginxdemos/hello:latest
                    headPort: 80,
                    entrypoint: '',
                    isPublic: false,
                    headArguments: [],
                    ingressPath: '',
                    hasM3Connector: false,
                }}
                sx={{ 'ml': 3, '& .MuiFormControl-root': { my: 1 } }}
                onSubmit={handleDeployMicroservice}
            >
                <SetupFields environments={availableEnvironments} onEnvironmentSelect={setSelectedEnvironment} />
                <ContainerImageFields />
                <PublicUrlFields />
                {hasM3ConnectorOption && <HasM3ConnectorField />}
                <Button variant='filled' label='Deploy microservice' type='submit' startWithIcon='RocketLaunch' sx={{ mt: 1 }} />
            </Form>
        </>
    );
};
