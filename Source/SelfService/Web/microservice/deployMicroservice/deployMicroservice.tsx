// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSnackbar } from 'notistack';

import { Typography } from '@mui/material';
import { RocketLaunch } from '@mui/icons-material';

import { Guid } from '@dolittle/rudiments';
import { Button, Form, LoadingSpinner } from '@dolittle/design-system';

import { saveSimpleMicroservice } from '../../stores/microservice';

import { MicroserviceSimple, MicroserviceFormParameters } from '../../api/index';
import { getLatestRuntimeInfo, getRuntimes } from '../../api/api';
import { HttpResponseApplication } from '../../api/application';

import { HasM3ConnectorField } from '../components/form/hasM3ConnectorField';
import { SetupFields } from './setupFields';
import { ContainerImageFields } from './containerImageFields';
import { PublicUrlFields } from './publicUrlFields';
import { getRuntimeNumberFromString } from '../helpers';

const styles = {
    form: {
        'mt': 4.5,
        'ml': 3,
        '& .MuiFormControl-root': {
            my: 1
        },
        '.MuiFormControlLabel-root': {
            ml: 0
        }
    },
    formSections: {
        'mb': 4,
        'display': 'flex',
        'flexDirection': 'column',
        '&:last-child': {
            mb: 0
        }
    }
};

type DeployMicroserviceProps = {
    application: HttpResponseApplication;
    environment: string;
};

export const DeployMicroservice = ({ application, environment }: DeployMicroserviceProps) => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [showM3ConnectorInfo, setShowM3ConnectorInfo] = useState(false);

    const environmentInfo = application.environments.find(env => env.name === environment)!;
    const hasM3ConnectorOption = environmentInfo?.connections?.m3Connector || false;
    const latestRuntimeVersion = getLatestRuntimeInfo().image;
    const runtimeNumberSelections = [
        ...getRuntimes().map(runtimeInfo => ({
            value: runtimeInfo.image,
            displayValue: getRuntimeNumberFromString(runtimeInfo.image)
        })),
        {
            value: 'none',
            displayValue: 'None'
        }
    ];

    const handleCreateMicroservice = async (values: MicroserviceFormParameters) => {
        setIsLoading(true);

        const microserviceId = Guid.create().toString();
        const { microserviceName, headArguments, headImage, headPort, runtimeVersion, isPublic, ingressPath, entrypoint, hasM3Connector } = values;
        // Convert the head arguments to the format that the form expects.
        const headArgumentValues = headArguments.map(arg => arg.value);

        const newMicroservice: MicroserviceSimple = {
            dolittle: {
                applicationId: application.id,
                customerId: application.customerId,
                microserviceId
            },
            name: microserviceName,
            kind: 'simple',
            environment,
            extra: {
                headImage,
                headPort: parseInt(headPort.toString(), 10),
                runtimeImage: runtimeVersion,
                isPublic,
                ingress: {
                    path: '/' + ingressPath,
                    pathType: 'Prefix'
                },
                headCommand: {
                    command: entrypoint.length ? [entrypoint] : [],
                    args: headArgumentValues
                },
                connections: {
                    m3Connector: hasM3Connector
                }
            }
        };

        try {
            await saveSimpleMicroservice(newMicroservice);
            const href = `/microservices/application/${application.id}/${environment}/view/${newMicroservice.dolittle.microserviceId}`;
            navigate(href);
        } catch (e: unknown) {
            const message = (e instanceof Error) ? e.message : 'Something went wrong when saving microservice.';
            enqueueSnackbar(message, { variant: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Typography variant='h1'>Deploy Base Microservice</Typography>

            <Form<MicroserviceFormParameters>
                initialValues={{
                    microserviceName: '',
                    developmentEnvironment: environment,
                    runtimeVersion: latestRuntimeVersion,
                    headImage: '', //nginxdemos/hello:latest
                    headPort: 80,
                    entrypoint: '',
                    isPublic: false,
                    headArguments: [],
                    ingressPath: '',
                    hasM3Connector: false
                }}
                sx={styles.form}
                onSubmit={handleCreateMicroservice}
            >
                <SetupFields options={runtimeNumberSelections} sx={styles.formSections} />

                <ContainerImageFields sx={styles.formSections} />

                <PublicUrlFields sx={styles.formSections} />

                {hasM3ConnectorOption &&
                    <HasM3ConnectorField
                        hasM3Connector={showM3ConnectorInfo}
                        setHasM3Connector={() => setShowM3ConnectorInfo(!showM3ConnectorInfo)}
                        sx={styles.formSections}
                    />
                }

                {isLoading ? <LoadingSpinner /> : (
                    <Button
                        variant='filled'
                        label='Deploy microservice'
                        type='submit'
                        startWithIcon={<RocketLaunch />}
                        sx={{ mt: 1 }}
                    />
                )}
            </Form>
        </>
    );
};
