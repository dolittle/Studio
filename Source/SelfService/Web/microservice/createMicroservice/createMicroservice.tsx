// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useSnackbar } from 'notistack';

import { CircularProgress, Box, Grid, SelectChangeEvent, Typography } from '@mui/material';
import { RocketLaunch } from '@mui/icons-material';

import { Guid } from '@dolittle/rudiments';
import { Button, ConfirmDialog, Form, Input, Select, SwitchToggle } from '@dolittle/design-system';

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
    runtimeVersion: string;
    imageName: string;
    port: number;
    entrypoint: string;
    publicURL: boolean;
    ingressPath: string;
    M3Connector: boolean;
};

type CreateMicroserviceProps = {
    application: HttpResponseApplication;
    environment: string;
};

export const CreateMicroservice = ({ application, environment }: CreateMicroserviceProps) => {
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();

    const environmentInfo = application.environments.find(env => env.name === environment)!;

    const hasM3ConnectorOption = environmentInfo?.connections?.m3Connector || false;
    const latestRuntimeNumber = getRuntimeNumberFromString(getLatestRuntimeInfo().image);
    const runtimeNumberSelections = [
        ...getRuntimes().map(runtimeInfo => ({ value: getRuntimeNumberFromString(runtimeInfo.image) })), { value: 'None' }
    ];

    const [headCommandArgs, setHeadCommandArgs] = useState<string[]>([]);
    const [hasPublicUrl, setHasPublicUrl] = useState(false);
    //const [hasM3ConnectorOption, setHasM3ConnectorOption] = useState<boolean>(environmentInfo.connections.m3Connector);
    const [hasM3Connector, setHasM3Connector] = useState<boolean>(environmentInfo.connections.m3Connector);

    const handleCreateMicroservice = async (values: CreateMicroserviceParameters) => {
        //const microservice: MicroserviceSimple = {
        //id: Guid.create().toString(),
        //    name: values.microserviceName,
        //developmentEnvironment: values.developmentEnvironment,
        //runtimeVersion: values.runtimeVersion,
        //imageName: values.imageName,
        //port: values.port,
        //entrypoint: values.entrypoint,
        //publicURL: values.publicURL,
        //ingressPath: values.ingressPath,
        //M3Connector: values.M3Connector
        //};

        //await saveSimpleMicroservice(microservice);
        //enqueueSnackbar('Microservice created', { variant: 'success' });
        //history.push(`/applications/${application.id}/environments/${environment}/microservices`);
        console.log(values);
    };

    return (
        <>
            <Typography variant='h1'>Deploy Base Microservice</Typography>

            <Form<CreateMicroserviceParameters>
                initialValues={{
                    microserviceName: '',
                    runtimeVersion: latestRuntimeNumber,
                    imageName: '',
                    port: 80,
                    entrypoint: '',
                    publicURL: false,
                    ingressPath: '',
                    M3Connector: false
                }}
                sx={styles.form}
                onSubmit={handleCreateMicroservice}
            >
                <Box sx={styles.formSections}>
                    <Typography variant='subtitle1' sx={{ mb: 2 }}>Configuration Setup</Typography>

                    <Input id='microserviceName' label='Microservice Name' required />
                    <Input id='developmentEnvironment' label={environment} disabled />

                    <Select
                        id='runtimeVersion'
                        label='Runtime Version'
                        options={runtimeNumberSelections}
                        required
                    />
                </Box>

                <Box sx={styles.formSections}>
                    <Typography variant='subtitle2' sx={{ mb: 2 }}>Container Image Settings</Typography>

                    <Input id='imageName' label='Image Name' required sx={{ width: 500 }} />
                    <Input id='port' label='Port' required />
                    <Input id='entrypoint' label='Entrypoint' />

                    <HeadArguments cmdArgs={headCommandArgs} setCmdArgs={setHeadCommandArgs} />
                </Box>

                <Box sx={styles.formSections}>
                    <Typography variant='subtitle2'>Public Microservice</Typography>
                    <SwitchToggle id='publicURL' label='Expose to a public URL' onChange={() => setHasPublicUrl(!hasPublicUrl)} />

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

                {!hasM3ConnectorOption &&
                    <Box sx={styles.formSections}>
                        <Typography variant='subtitle2'>Connect to M3</Typography>
                        <SwitchToggle
                            id='M3Connector'
                            label='Make M3 configuration available to microservice'
                            onChange={() => setHasM3Connector(!hasM3Connector)}
                        />

                        {hasM3Connector &&
                            <>
                                <Typography variant='body2' sx={{ ml: 6, mt: 1 }}>
                                    Enabling this will mount these files to the deployed microservice:
                                </Typography>

                                <Box sx={{ ml: 6, mt: 2, lineHeight: '20px' }}>
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
