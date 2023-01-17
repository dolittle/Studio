// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useSnackbar } from 'notistack';

import { Box, Typography } from '@mui/material';
import { RocketLaunch } from '@mui/icons-material';

import { Guid } from '@dolittle/rudiments';
import { Button, Form, Input, Link, LoadingSpinner, Select, Switch, Tooltip } from '@dolittle/design-system';

import { saveSimpleMicroservice } from '../stores/microservice';

import { MicroserviceSimple, MicroserviceFormParameters } from '../api/index';
import { getLatestRuntimeInfo, getRuntimes } from '../api/api';
import { HttpResponseApplication } from '../api/application';

import { HasM3ConnectorField } from './components/form/hasM3ConnectorField';
import { HeadArguments } from './components/form/headArguments';
import { getRuntimeNumberFromString } from './helpers';

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

const runtimeDescription = `By using the Dolittle runtime you'll have access to storage through event sourcing and be able to 
communicate with other microservices through the event horizon with the Dolittle SDK.`;

const portDescription = `By default, your mircroservice will be hosted on port 80 within the secure Dolittle cluster, 
but this can be overridden if your image requires it.`;

const EntrypointDescription = () =>
    <>
        If you would like to override your container image ENTRYPOINT,
        you can do so in this field. You can find more information on ENTRYPOINTS and CMD ARGUMENETS <Link
            href='https://docs.docker.com/engine/reference/builder/#understand-how-cmd-and-entrypoint-interact'
            target
            ariaLabel='Understand how CMD and ENTRYPOINT interact which opens in a new window.'
            message='here'
            color='secondary'
        />.
    </>;

const PublicUrlFieldDescription = () =>
    <>
        Dolittle will generate a public URL for you. If you would like to specify a subpath, please enter one here. If you would
        like custom handling of the path and subpaths, please reach
        out to <Link href='mailto: support@dolittle.com' message='Dolittle support' color='secondary' /> after you&#39;ve deployed the service.
    </>;

type CreateMicroserviceProps = {
    application: HttpResponseApplication;
    environment: string;
};

export const CreateMicroservice = ({ application, environment }: CreateMicroserviceProps) => {
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();

    const [isLoading, setIsLoading] = useState(false);
    const [headCommandArgs, setHeadCommandArgs] = useState<string[]>([]);
    const [showPublicUrlInfo, setShowPublicUrlInfo] = useState(false);
    const [showM3ConnectorInfo, setShowM3ConnectorInfo] = useState(false);
    const [showEntrypointInfo, setShowEntrypointInfo] = useState(false);

    const environmentInfo = application.environments.find(env => env.name === environment)!;
    const hasM3ConnectorOption = environmentInfo?.connections?.m3Connector || false;
    const latestRuntimeNumber = getRuntimeNumberFromString(getLatestRuntimeInfo().image);
    const runtimeNumberSelections = [
        ...getRuntimes().map(runtimeInfo => ({ value: getRuntimeNumberFromString(runtimeInfo.image) })), { value: 'None' }
    ];

    const handleCreateMicroservice = async (values: MicroserviceFormParameters) => {
        setIsLoading(true);

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
                    // Removes empty values from array.
                    args: headCommandArgs.filter(entry => entry.trim() !== '')
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
            setIsLoading(false);
        }
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <>
            <Typography variant='h1'>Deploy Base Microservice</Typography>

            <Form<MicroserviceFormParameters>
                initialValues={{
                    microserviceName: '',
                    developmentEnvironment: environment,
                    runtimeVersion: latestRuntimeNumber,
                    headImage: '',
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
                    <Typography variant='subtitle2' sx={{ mb: 2 }}>Configuration Setup</Typography>

                    <Input id='microserviceName' label='Microservice Name' required />
                    <Input id='developmentEnvironment' label='Development Environment' disabled />

                    <Tooltip
                        id='runtime-version-tooltip'
                        tooltipTitle='Runtime'
                        tooltipText={runtimeDescription}
                        open={showEntrypointInfo}
                        handleOpen={() => setShowEntrypointInfo(true)}
                        handleClose={() => setShowEntrypointInfo(false)}
                    >
                        <Select
                            id='runtimeVersion'
                            label='Runtime Version'
                            options={runtimeNumberSelections}
                            onOpen={() => setShowEntrypointInfo(true)}
                            required
                        />
                    </Tooltip>
                </Box>

                <Box sx={styles.formSections}>
                    <Typography variant='subtitle2' sx={{ mb: 2 }}>Container Image Settings</Typography>

                    <Tooltip id='image-tooltip' tooltipTitle='Image Name' tooltipText='Please provide the container image name for your microservice.'>
                        <Input
                            id='headImage'
                            label='Image Name'
                            required
                            sx={{ width: 500 }}
                        />
                    </Tooltip>

                    <Tooltip id='port-tooltip' tooltipTitle='Port' tooltipText={portDescription}>
                        <Input
                            id='headPort'
                            label='Port'
                            required
                            pattern={{
                                value: /^[0-9]+$/,
                                message: 'Please enter a valid port number.'
                            }}
                        />
                    </Tooltip>

                    <Tooltip id='entrypoint-tooltip' tooltipTitle='Entrypoint' tooltipText={<EntrypointDescription />}>
                        <Input id='entrypoint' label='Entrypoint' />
                    </Tooltip>

                    <HeadArguments cmdArgs={headCommandArgs} setCmdArgs={setHeadCommandArgs} />
                </Box>

                <Box sx={styles.formSections}>
                    <Typography variant='subtitle2'>Public Microservice</Typography>

                    <Switch
                        id='isPublic'
                        label='Expose to a public URL'
                        onChange={() => setShowPublicUrlInfo(!showPublicUrlInfo)}
                    />

                    {showPublicUrlInfo &&
                        <Tooltip id='public-url-tooltip' tooltipTitle='PATH' tooltipText={<PublicUrlFieldDescription />}>
                            <Input
                                id='ingressPath'
                                label='Path'
                                startAdornment='/'
                                placeholder='leave blank for default path'
                                sx={{ width: 226 }}
                            />
                        </Tooltip>
                    }
                </Box>

                {hasM3ConnectorOption &&
                    <HasM3ConnectorField
                        hasM3Connector={showM3ConnectorInfo}
                        setHasM3Connector={() => setShowM3ConnectorInfo(!showM3ConnectorInfo)}
                        sx={styles.formSections}
                    />
                }

                <Button
                    variant='filled'
                    label='Deploy microservice'
                    size='medium'
                    type='submit'
                    startWithIcon={<RocketLaunch />}
                    sx={{ mt: 1 }}
                />
            </Form>
        </>
    );
};
