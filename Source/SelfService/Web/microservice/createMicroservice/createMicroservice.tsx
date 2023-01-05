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
            'my': 1
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

const runtimeVersionNumbers: { value: string; }[] = [];

type CreateMicroserviceParameters = {
    microserviceName: string;
    developmentEnvironment: string;
    imageName: string;
    port: number;
    entrypoint: string;
    ingressPath: string;
};

type CreateMicroserviceProps = {
    application: HttpResponseApplication;
    environment: string;
};

export const CreateMicroservice = ({ application, environment }: CreateMicroserviceProps) => {
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();

    const environmentInfo = application.environments.find(env => env.name === environment)!;
    const latestRuntimeVersion = getRuntimeNumberFromString(getLatestRuntimeInfo().image);

    const [currentRuntimeVersion, setCurrentRuntimeVersion] = useState('');
    const [headCommandArgs, setHeadCommandArgs] = useState<string[]>([]);
    const [hasPublicURL, setHasPublicURL] = useState(false);
    const [hasM3ConnectorOption, setHasM3ConnectorOption] = useState<boolean>(environmentInfo.connections.m3Connector);
    const [hasM3Connector, setHasM3Connector] = useState<boolean>(environmentInfo.connections.m3Connector);

    useEffect(() => {
        getRuntimes().map(version => runtimeVersionNumbers.push({
            value: getRuntimeNumberFromString(version.image)
        }));
        // Push 'None' as the last option in list.
        runtimeVersionNumbers.push({ value: 'None' });

        setCurrentRuntimeVersion(latestRuntimeVersion);
    }, [])

    return (
        <>
            <Typography variant='h1'>Deploy Base Microservice</Typography>

            <Form<CreateMicroserviceParameters>
                initialValues={{
                    microserviceName: '',
                    developmentEnvironment: environment,
                    imageName: '',
                    port: 80,
                    entrypoint: '',
                    ingressPath: ''
                }}
                sx={styles.form}
            >
                <Box sx={styles.formSections}>
                    <Typography variant='subtitle1' sx={{ mb: 2 }}>Configuration Setup</Typography>

                    <Input id='microserviceName' label='Microservice Name' required />
                    <Input id='developmentEnvironment' label='Development Environment' disabled />

                    <Select
                        id='runtimeVersion'
                        label='Runtime Version*'
                        options={runtimeVersionNumbers}
                        value={currentRuntimeVersion}
                        required
                        onChange={event => setCurrentRuntimeVersion(event.target.value)}
                        sx={{ width: 220 }}
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

                    <SwitchToggle
                        title='Expose to a public URL'
                        isChecked={hasPublicURL}
                        onChange={event => setHasPublicURL(event.target.checked)}
                        sx={{ my: 2.5 }}
                    />

                    {hasPublicURL &&
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
                            title='Make M3 configuration available to microservice'
                            isChecked={hasM3Connector}
                            onChange={event => setHasM3Connector(event.target.checked)}
                            sx={{ mt: 2.5 }}
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
