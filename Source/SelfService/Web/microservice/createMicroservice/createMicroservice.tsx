// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useSnackbar } from 'notistack';

import { Box, Typography } from '@mui/material';
import { RocketLaunch } from '@mui/icons-material';

import { Guid } from '@dolittle/rudiments';
import { Button, ConfirmDialog, Form, Input, LoadingSpinner, Select, SwitchToggle } from '@dolittle/design-system';

import { DropDownMenu } from '../../theme/dropDownMenu';
import { TextField as ThemedTextField } from '../../theme/textField';
import { Button as ThemedButton } from '../../theme/button';

import { saveSimpleMicroservice } from '../../stores/microservice';

import { MicroserviceSimple } from '../../api/index';
import { getLatestRuntimeInfo, getRuntimes } from '../../api/api';
import { HttpResponseApplication } from '../../api/application';

import { HeadArguments } from '../components/headArguments';
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

type CreateMicroserviceParameters = {
    microserviceName: string;
    developmentEnvironment: string;
    runtimeVersion: string;
    headImage: string;
    headPort: number;
    entrypoint: string;
    isPublic: boolean;
    ingressPath: string;
    hasM3Connector: boolean;
};

type CreateMicroserviceProps = {
    application: HttpResponseApplication;
    environment: string;
};

export const CreateMicroservice = ({ application, environment }: CreateMicroserviceProps) => {
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();

    const environmentInfo = application.environments.find(env => env.name === environment)!;

    const [headCommandArgs, setHeadCommandArgs] = useState<string[]>([]);
    const [hasPublicUrl, setHasPublicUrl] = useState(false);
    const [hasM3Connector, setHasM3Connector] = useState(false);

    const hasM3ConnectorOption = environmentInfo?.connections?.m3Connector || false;
    const latestRuntimeNumber = getRuntimeNumberFromString(getLatestRuntimeInfo().image);
    const runtimeNumberSelections = [
        ...getRuntimes().map(runtimeInfo => ({ value: getRuntimeNumberFromString(runtimeInfo.image) })), { value: 'None' }
    ];

    const handleCreateMicroservice = async (values: CreateMicroserviceParameters) => {
        // setIsLoading(true);
        const microserviceId = Guid.create().toString();
        const { microserviceName, headImage, headPort, runtimeVersion, isPublic, ingressPath, entrypoint, hasM3Connector } = values;

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
                headPort,
                runtimeImage: runtimeVersion.toLowerCase(),
                isPublic,
                ingress: {
                    path: '/' + ingressPath,
                    pathType: 'Prefix'
                },
                headCommand: {
                    command: entrypoint.split(' '),
                    args: headCommandArgs
                },
                connections: {
                    m3Connector: hasM3Connector
                }
            }
        };

        try {
            await saveSimpleMicroservice(newMicroservice);
            const href = `/microservices/application/${application.id}/${environment}/view/${newMicroservice.dolittle.microserviceId}`;
            history.push(href);
        } catch (e: unknown) {
            const message = (e instanceof Error) ? e.message : 'Something went wrong when saving microservice.';
            enqueueSnackbar(message, { variant: 'error' });
        } finally {
            //setIsLoading(false);
        }
        console.log(newMicroservice);
    };

    return (
        <>
            <Typography variant='h1'>Deploy Base Microservice</Typography>

            <Form<CreateMicroserviceParameters>
                initialValues={{
                    microserviceName: '',
                    developmentEnvironment: environment,
                    runtimeVersion: latestRuntimeNumber,
                    headImage: 'nginxdemos/hello:latest',
                    headPort: 80,
                    entrypoint: '',
                    isPublic: false,
                    ingressPath: '',
                    hasM3Connector: false
                }}
                sx={styles.form}
                onSubmit={handleCreateMicroservice}
            >
                <Box sx={styles.formSections}>
                    <Typography variant='subtitle1' sx={{ mb: 2 }}>Configuration Setup</Typography>

                    <Input id='microserviceName' label='Microservice Name' required />
                    <Input id='developmentEnvironment' label='Development Environment' disabled />

                    <Select
                        id='runtimeVersion'
                        label='Runtime Version'
                        options={runtimeNumberSelections}
                        required
                    />
                </Box>

                <Box sx={styles.formSections}>
                    <Typography variant='subtitle2' sx={{ mb: 2 }}>Container Image Settings</Typography>

                    <Input
                        id='headImage'
                        label='Image Name'
                        required
                        sx={{ width: 500 }}
                    />

                    <Input
                        id='headPort'
                        label='Port'
                        pattern={{
                            value: /^[0-9]+$/,
                            message: 'Please enter a valid port number.'
                        }}
                        required
                    />

                    <Input id='entrypoint' label='Entrypoint' />

                    <HeadArguments cmdArgs={headCommandArgs} setCmdArgs={setHeadCommandArgs} />
                </Box>

                <Box sx={styles.formSections}>
                    <Typography variant='subtitle2'>Public Microservice</Typography>
                    <SwitchToggle id='isPublic' label='Expose to a public URL' onChange={() => setHasPublicUrl(!hasPublicUrl)} />

                    {hasPublicUrl &&
                        <Input
                            id='ingressPath'
                            label='Path'
                            startAdornment='/'
                            placeholder='leave blank for default path'
                            sx={{ width: 226 }}
                        />
                    }
                </Box>

                {hasM3ConnectorOption &&
                    <Box sx={styles.formSections}>
                        <Typography variant='subtitle2'>Connect to M3</Typography>
                        <SwitchToggle
                            id='hasM3Connector'
                            label='Make M3 configuration available to microservice'
                            onChange={() => setHasM3Connector(!hasM3Connector)}
                        />

                        {hasM3Connector &&
                            <>
                                <Typography variant='body2' sx={{ ml: 6, mt: 1 }}>
                                    Enabling this will mount these files to the deployed microservice:
                                </Typography>

                                <Box sx={{ ml: 6, mt: 2 }}>
                                    <Typography variant='body2'>/app/connection/kafka/ca.pem</Typography>
                                    <Typography variant='body2'>/app/connection/kafka/certificate.pem</Typography>
                                    <Typography variant='body2'>/app/connection/kafka/accessKey.pem</Typography>
                                </Box>
                            </>
                        }
                    </Box>
                }

                <Button variant='filled' label='Deploy microservice' size='medium' type='submit' startWithIcon={<RocketLaunch />} sx={{ mt: 1 }} />
            </Form>
        </>
    );
};
