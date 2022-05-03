// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';

import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';

import { Box, Grid } from '@mui/material';

import {
    MicroservicePurchaseOrder,
    MicroserviceRawDataLogIngestorWebhookConfig,
    ConnectorWebhookConfigBasic,
} from '../../api/index';
import { getCredentialsFromBasicAuth, makeBasicAuth } from '../../utils/httpCredentials';
import { GeneratePassword } from './generatePassword';
import { Button } from '../../theme/button';
import { ButtonText } from '../../theme/buttonText';
import { TextField } from '../../theme/textField';
import { ErpIcon } from './erpIcon';

type Props = {
    onSave: (microservice: MicroservicePurchaseOrder) => any;
    microservice: MicroservicePurchaseOrder;
};


const styles = {
    root: {
        width: '100%',
    },
    button: {
        marginTop: 1,
        marginRight: 1,
    },
    actionsContainer: {
        marginBottom: 2,
    },
    resetContainer: {
        padding: 3,
    },
    inactiveText: {
        color: '#93959F',
    },
    progressBar: {
        color: '#ff9366',
    },
    stepIcon: {
        'color': '#3B3D48',
        '&.MuiStepIcon-root.Mui-active': {
            color: '#6678F6'
        },
        '&.MuiStepIcon-root.Mui-completed': {
            color: '#6678F6'
        },
        '&.MuiStepIcon-root.Mui-active .MuiStepIcon-text': {
            fill: '#B3BBFB'
        },
        '&.MuiStepIcon-root .MuiStepIcon-text': {
            fill: '#93959F'
        }
    }
};

export const Configuration: React.FunctionComponent<Props> = (props) => {
    const { enqueueSnackbar } = useSnackbar();

    const _props = props!;
    const onSave = _props.onSave;
    const ms = _props.microservice;
    const isCreate = ms.name === '';
    const initStep = !isCreate ? 3 : 0;
    const initMicroserviceName = !isCreate ? ms.name : '';
    // TODO this can be replaced once we land https://app.asana.com/0/0/1201032430663748/f
    const initErpSystem = !isCreate ? 'infor' : '';

    const authorization = ms.extra.webhooks[0]?.authorization ? ms.extra.webhooks[0].authorization : '';
    const initCredentials = getCredentialsFromBasicAuth(authorization);

    const [activeStep, setActiveStep] = React.useState(initStep);
    const [msName, setMsName] = React.useState(initMicroserviceName);
    const [erpSystem, setErpSystem] = React.useState(initErpSystem);
    const [username, setUsername] = React.useState(initCredentials.username);
    const [password, setPassword] = React.useState(initCredentials.password);
    const [activeNextButton, setActiveNextButton] = React.useState(false);

    const steps = [
        'Select ERP system',
        'Provide a name',
        'Configure ERP system'
    ];

    const webhookPrefix = `https://TODO/api/webhooks`;
    const webhookPoHead = 'm3/pohead';
    const webhookPoLine = 'm3/poline';

    const copyPOHeadUrl = async (event: React.MouseEvent<HTMLElement>) => {
        try {
            await navigator.clipboard.writeText(`${webhookPrefix}/${webhookPoHead}`);
            enqueueSnackbar('POHEAD URL copied to clipboard.');
        } catch {
            enqueueSnackbar('Failed to copy POHEAD URL to clipboard.', { variant: 'error' });
        }
    };

    const copyPOLineUrl = async (event: React.MouseEvent<HTMLElement>) => {
        try {
            await navigator.clipboard.writeText(`${webhookPrefix}/${webhookPoLine}`);
            enqueueSnackbar('POLINE URL copied to clipboard.');
        } catch {
            enqueueSnackbar('Failed to copy POLINE URL to clipboard.', { variant: 'error' });
        }
    };

    const allowMicroserviceName = (name): boolean => {
        return !(name === '' || name.includes(' '));
    };

    const allowUsername = (username): boolean => {
        const cleanedUsername = username.trim();
        return !(cleanedUsername === '' || cleanedUsername.includes(' '));
    };

    const allowPassword = (password): boolean => {
        return password !== '';
    };

    const setPasswordAndCheckAction = (username: string, newPassword: string) => {
        setPassword(newPassword);

        if (allowUsername(username) && allowPassword(newPassword)) {
            setActiveNextButton(true);
        } else {
            setActiveNextButton(false);
        }
    };

    const stepsContent = [
        <>
            <Typography component={'span'}>
                <p>
                    Select the ERP system you have. Make sure you have access to the
                    system for the next two steps.
                </p>
            </Typography>
            <Grid
                container
                direction='row'
                justifyContent='flex-start'
                alignItems='center'
            >
                <ErpIcon kind='infor' onClick={() => {
                    setErpSystem('infor');
                    setActiveNextButton(true);
                }} />


                <ErpIcon kind='ifs' onClick={() => {
                    enqueueSnackbar('Not yet supported, please reach out if interested to know when it will arrive');
                }} />

                <ErpIcon kind='sap' onClick={() => {
                    enqueueSnackbar('Not yet supported, please reach out if interested to know when it will arrive');
                }} />
            </Grid>
        </>,
        <>
            <Typography component={'span'}>
                <p>
                    Establish a descriptive name for this microservice. A good example
                    might be, “supplier purchase orders”. This can always be changed
                    later.
                </p>
                <TextField
                    required
                    id='microserviceName'
                    label='Name'
                    value={msName}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const _name = event.target.value!;
                        setMsName(_name);

                        if (allowMicroserviceName(_name)) {
                            setActiveNextButton(true);
                        } else {
                            setActiveNextButton(false);
                        }

                    }}
                />
            </Typography>
        </>,
        <>
            <Typography component={'span'}>
                <p>
                    The webhook endpoints are provided below. Each one will be established
                    separately in program CMS045 in M3, however, the same username and
                    password can be used for both endpoints.
                </p>
                <p>Webhook for purchase order head (POHEAD)</p>
                <Box component='span' sx={styles.inactiveText}>
                    {webhookPrefix} / m3/pohead
                </Box >
                <ButtonText
                    withIcon={false}
                    onClick={copyPOHeadUrl}>
                    COPY TO CLIPBOARD
                </ButtonText>

                <p>Webhook for purchase order line (POLINE)</p>
                <Box component='span' sx={styles.inactiveText}>
                    {webhookPrefix} / m3/poline
                </Box>

                <ButtonText
                    withIcon={false}
                    onClick={copyPOLineUrl}>
                    COPY TO CLIPBOARD
                </ButtonText>

                <p>Create username</p>
                <TextField
                    required
                    id='outlined-required'
                    label='Username'
                    value={username}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const _username = event.target.value!;
                        setUsername(_username);

                        if (allowUsername(_username) && allowPassword(password)) {
                            setActiveNextButton(true);
                        } else {
                            setActiveNextButton(false);
                        }
                    }}
                />
                <p>Create Password</p>
                <TextField
                    required
                    id='outlined-password-input'
                    type='password'
                    label='Password'
                    autoComplete='current-password'
                    value={password}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setPasswordAndCheckAction(username, event.target.value!);
                    }}
                />

                <GeneratePassword password={password} setPassword={(newPassword) => {
                    setPasswordAndCheckAction(username, newPassword);
                }
                } />
            </Typography >
        </>,
    ];


    const handleNext = async (event: React.MouseEvent<HTMLElement>) => {
        // Only allow changes on isCreate
        if (isCreate) {
            if (activeStep === 0) {
                if (erpSystem === '') {
                    enqueueSnackbar('Please select an ERP system', { variant: 'error' });
                    return;
                }
            }
            if (activeStep === 1) {
                // Validate name
                if (!allowMicroserviceName(msName)) {
                    enqueueSnackbar('Your name cannot be empty, nor with spaces', { variant: 'error' });
                    return;
                }
            }
        }

        if (activeStep === 0) {
            if (!allowMicroserviceName(msName)) {
                setActiveNextButton(false);
            }
        }

        if (activeStep === 1) {
            if (!allowUsername(username) || !allowPassword(password)) {
                setActiveNextButton(false);
            }
        }


        if (activeStep === 2) {
            // Validate username
            if (!allowUsername(username)) {
                enqueueSnackbar('You need a username', { variant: 'error' });
                return;
            }

            // Validate password
            if (!allowPassword(password)) {
                enqueueSnackbar('We require a password', { variant: 'error' });
                return;
            }

            ms.name = msName;
            const authorization = makeBasicAuth({ username: username.trim(), password } as ConnectorWebhookConfigBasic);
            ms.extra.webhooks = [
                {
                    kind: webhookPoHead,
                    uriSuffix: webhookPoHead,
                    authorization,
                },
                {
                    kind: webhookPoLine,
                    uriSuffix: webhookPoLine,
                    authorization,
                }
            ] as MicroserviceRawDataLogIngestorWebhookConfig[];
            await onSave(ms);
            return;
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = (event: React.MouseEvent<HTMLElement>) => {
        if (!isCreate && activeStep === 2) {
            enqueueSnackbar('You cannot make changes to the name of the integration type', { variant: 'error' });
            return;
        }

        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Box sx={styles.root}>
            <Stepper activeStep={activeStep} orientation='vertical'>
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel StepIconProps={{
                            sx: styles.stepIcon
                        }}>
                            <Box component='span' sx={activeStep >= index ? {} : styles.inactiveText}>{label}</Box>
                        </StepLabel>
                        <StepContent>
                            {stepsContent[index]}

                            <Box sx={styles.actionsContainer}>
                                <div>
                                    <ButtonText
                                        onClick={handleBack}
                                        disabled={activeStep === 0}
                                        buttonType='secondary'
                                    >
                                        Back
                                    </ButtonText>

                                    <Button
                                        onClick={handleNext}
                                        disabled={!activeNextButton}
                                    >
                                        {activeStep === steps.length - 1
                                            ? 'Finish'
                                            : 'Next'}
                                    </Button>
                                </div>
                            </Box>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
};
