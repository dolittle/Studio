// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { CircularProgress, Grid, SelectChangeEvent, Typography } from '@mui/material';
import { DropDownMenu } from '../../theme/dropDownMenu';
import { TextField as ThemedTextField } from '../../theme/textField';
import { Switch as ThemedSwitch } from '../../theme/switch';
import { Button as ThemedButton } from '../../theme/button';

import { Guid } from '@dolittle/rudiments';
import { saveSimpleMicroservice } from '../../stores/microservice';
import { MicroserviceSimple } from '../../api/index';
import { getLatestRuntimeInfo, getRuntimes } from '../../api/api';

import { HttpResponseApplication } from '../../api/application';
import { HeadArguments } from '../components/headArguments';


const styles = {
    data: {
        paddingBottom: 1,
        color: (theme) => theme.palette.text.secondary
    },
};

type Props = {
    application: HttpResponseApplication
    environment: string
};

export const Create: React.FunctionComponent<Props> = (props) => {
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    const _props = props!;
    const application = _props.application;
    const environment = _props.environment;

    const microserviceId = Guid.create().toString();

    const latestRuntimeInfo = getLatestRuntimeInfo();

    const ms = {
        dolittle: {
            applicationId: application.id,
            customerId: application.customerId,
            microserviceId,
        },
        name: 'Order',
        kind: 'simple',
        environment: _props.environment,
        extra: {
            // nginxdemos/hello:latest
            headImage: 'nginxdemos/hello:latest', //'dolittle/spinner:0.0.0', // Doesnt work
            headPort: 80,
            runtimeImage: latestRuntimeInfo.image,
            isPublic: false,
            ingress: {
                path: '/',
                pathType: 'Prefix',
            },
            headCommand: {
                command: [],
                args: []
            },
            connections: {
                m3Connector: false
            }
        }
    } as MicroserviceSimple;

    const environmentInfo = application.environments.find(_environment => _environment.name === environment)!;

    const [msId] = React.useState(ms.dolittle.microserviceId);
    const [msName, setMsName] = React.useState(ms.name);
    const [headImage, setHeadImage] = React.useState(ms.extra.headImage);
    const [headPort, setHeadPort] = React.useState(ms.extra.headPort);
    const [command, setCommand] = React.useState(ms.extra.headCommand.command);
    const [args, setArgs] = React.useState(ms.extra.headCommand.args);
    const [runtimeImage, setRuntimeImage] = React.useState(ms.extra.runtimeImage);
    const [isPublic, setIsPublic] = React.useState<boolean>(ms.extra.isPublic);
    const [showConnectionM3ConnectorOption, setShowConnectionM3ConnectorOption] = React.useState<boolean>(environmentInfo.connections.m3Connector);
    const [connectionM3Connector, setConnectionM3Connector] = React.useState(environmentInfo.connections.m3Connector);
    const [ingressPath, setIngressPath] = React.useState(ms.extra.ingress.path);
    const [isLoading, setIsLoading] = React.useState(false);

    const _onSave = async (ms: MicroserviceSimple): Promise<void> => {
        if (isNaN(headPort)) {
            enqueueSnackbar('HeadPort is not a valid port', { variant: 'error' });
            return;
        }

        ms.name = msName;
        ms.extra.headImage = headImage;
        ms.extra.headPort = headPort;
        ms.extra.runtimeImage = runtimeImage;
        ms.extra.isPublic = isPublic;
        ms.extra.ingress.path = ingressPath;
        ms.extra.headCommand.command = command;
        ms.extra.headCommand.args = args;
        ms.extra.connections = {
            m3Connector: connectionM3Connector
        };

        setIsLoading(true);
        try {
            await saveSimpleMicroservice(ms);
            const href = `/microservices/application/${application.id}/${environment}/overview`;
            history.push(href);
        } catch (e: unknown) {
            const message = (e instanceof Error) ? e.message : 'Something went wrong when saving microservice';
            enqueueSnackbar(message, { variant: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    const runtimeImageSelections = [
        ...getRuntimes().map(runtimeInfo => ({ value: runtimeInfo.image, displayValue: runtimeInfo.image })),
        {
            value: 'none',
            displayValue: 'None'
        }
    ];

    const handleRuntimeChange = (event: SelectChangeEvent<string>) => {
        const _runtimeImage = event.target.value;
        setRuntimeImage(_runtimeImage);
    };

    const handleIsPublicChanged = (ev: React.ChangeEvent<{}>, checked?: boolean) => {
        setIsPublic(checked ?? false);
    };

    const handleConnectionM3ConnectorChanged = (ev: React.ChangeEvent<{}>, checked?: boolean) => {
        setConnectionM3Connector(checked ?? false);
    };

    return (
        <>
            <Typography component='h2' variant='h5' style={{ marginTop: '1rem' }}>Create base microservice</Typography>
            <Grid container direction='column' alignContent='stretch' spacing={4} style={{ marginTop: '1rem', padding: '1rem' }}>
                <Grid item>
                    <ThemedTextField
                        id='name'
                        label='Name'
                        value={msName}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            const newValue = event.target.value!;
                            setMsName(newValue);
                        }}
                    />
                </Grid>

                <Grid item>
                    <ThemedTextField
                        id='uuid'
                        label='UUID'
                        value={msId}
                        readOnly
                    />
                </Grid>

                <Grid item>
                    <ThemedTextField
                        id='environment'
                        label='Environment'
                        placeholder="Dev"
                        value={ms.environment}
                        readOnly
                    />
                </Grid>

                <Grid item>
                    <ThemedTextField
                        id='headImage'
                        label='Head Image'
                        value={headImage}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            const newValue = event.target.value!;
                            setHeadImage(newValue);
                        }}
                    />
                </Grid>

                <Grid item>
                    <ThemedTextField
                        required
                        id='headPort'
                        label='Head Port'
                        type='number'
                        value={headPort.toString()}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            const newValue = parseInt(event.target.value!, 10);
                            setHeadPort(newValue);
                        }}
                    />
                </Grid>

                <Grid item>
                    <Typography component="p" sx={styles.data}>
                        Override the default ENTRYPOINT in Docker
                    </Typography>
                    <ThemedTextField
                        id='headCommand'
                        label='Head Command'
                        required={false}
                        value={command[0]}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            // currently we want to only support specifying one command/ENTRYPOINT
                            const newValue = event.target.value!;
                            setCommand([newValue]);
                        }}
                    />
                </Grid>

                <Grid item>
                    <Typography component="p" sx={styles.data}>
                        Override the default CMD in Docker
                    </Typography>
                    <HeadArguments args={args} setArgs={setArgs} />
                </Grid>

                <Grid item>
                    <DropDownMenu label='Runtime Image' items={runtimeImageSelections} value={runtimeImage} onChange={handleRuntimeChange}></DropDownMenu>
                </Grid>

                <Grid item>
                    <Typography component='h2' variant='h5'>Ingress</Typography>
                    <ThemedSwitch label={isPublic ? 'Public' : 'Private'} checked={isPublic} onChange={handleIsPublicChanged} />
                </Grid>
                {isPublic &&
                    <>
                        <Grid item>
                            <ThemedTextField
                                id="ingressPath"
                                label='Path'
                                placeholder="/"
                                value={ingressPath}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    const newValue = event.target.value!;
                                    setIngressPath(newValue);
                                }}
                            />
                        </Grid>

                        <Grid item>
                            <ThemedTextField
                                id="pathType"
                                label='PathType'
                                placeholder="Prefix"
                                value={ms.extra.ingress.pathType}
                                readOnly
                            />
                        </Grid>
                    </>
                }


                {showConnectionM3ConnectorOption &&
                    <>
                        <Grid item>
                            <Typography component='h2' variant='h5'>Connect to m3 Connector</Typography>
                            <ThemedSwitch label={connectionM3Connector ? 'yes' : 'no'} checked={connectionM3Connector} onChange={handleConnectionM3ConnectorChanged} />
                        </Grid>
                    </>
                }
            </Grid>

            <Grid container direction='row' justifyContent='flex-end'>
                {isLoading
                    ? <ThemedButton disabled>Creating<CircularProgress size='1.5rem' style={{ marginLeft: '0.5rem' }} /></ThemedButton>
                    : <ThemedButton onClick={() => _onSave(ms)}>Create</ThemedButton>
                }
            </Grid>
        </>
    );
};
