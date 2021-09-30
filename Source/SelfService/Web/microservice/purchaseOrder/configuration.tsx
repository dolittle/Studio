// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useSnackbar } from 'notistack';

import logoInfor from '../../images/infor.png'; // with import
import logoIFS from '../../images/ifs.png';
import logoSAP from '../../images/sap.png';

import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import {
    MicroservicePurchaseOrder,
    MicroserviceRawDataLogIngestorWebhookConfig,
    ConnectorWebhookConfigBasic,
} from '../../api/index';
import { getCredentialsFromBasicAuth, makeBasicAuth } from '../../utils/httpCredentials';
import { GeneratePassword } from './generatePassword';

type Props = {
    onSave: (microservice: MicroservicePurchaseOrder) => any;
    microservice: MicroservicePurchaseOrder;
};


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        button: {
            marginTop: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
        backButton: {
            'textTransform': 'uppercase',
            'marginTop': theme.spacing(1),
            'marginRight': theme.spacing(1),
            'color': '#93959F',
            'backgroundColor': 'inherit',
            '&:disabled': {
                backgroundColor: 'inherit',
                color: '#3B3D48',
            },
            '&:hover': {
                color: '#3B3D48',
                backgroundColor: 'inherit',
            },
        },
        nextButton: {
            'marginTop': theme.spacing(1),
            'marginRight': theme.spacing(1),
            'color': '#2C2B33',
            'backgroundColor': '#6678F6',
            '&:hover': {
                color: '#2C2B33',
                backgroundColor: '#6678F6',
            },
            '&:disabled': {
                backgroundColor: '#93959F',
                color: '#3B3D48',
            }
        },
        actionsContainer: {
            marginBottom: theme.spacing(2),
        },
        resetContainer: {
            padding: theme.spacing(3),
        },
        inactiveText: {
            color: '#93959F',
        },
        progressBar: {
            color: '#ff9366',
        },

        textField: { //https://stackoverflow.com/a/60461876 excellent resource
            '& .MuiOutlinedInput-input': {
                color: 'white'
            },
            '& .MuiInputLabel-root': {
                color: 'white'
            },
            '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                color: 'white',
                borderColor: 'white'
            },
            '&:hover .MuiOutlinedInput-input': {
                color: 'white'
            },
        },
        stepIcon: {
            'color': '#3B3D48',
            '&.MuiStepIcon-active': {
                color: '#6678F6'
            },
            '&.MuiStepIcon-completed': {
                color: '#6678F6'
            },
            '&.MuiStepIcon-active .MuiStepIcon-text': {
                fill: '#B3BBFB'
            },
            // TODO
            //'&.MuiStepIcon-completed path': {
            //    stroke: '#6678F6',
            //    fill: 'white',
            //    backgroundColor: 'red'
            //},
            '&.MuiStepIcon-root .MuiStepIcon-text': {
                fill: '#93959F'
            }
        }
    })
);

export const Configuration: React.FunctionComponent<Props> = (props) => {
    const { enqueueSnackbar } = useSnackbar();

    const _props = props!;
    const onSave = _props.onSave;

    const ms = _props.microservice;

    const isCreate = ms.name === '' ? true : false;
    const classes = useStyles();


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

    const webhookPrefix = `https://${ms.extra.ingress.host}/api/webhooks`;
    const webhookPoHead = 'm3/pohead';
    const webhookPoLine = 'm3/poline';

    const copyPOHeadUrl = async () => {
        try {
            await navigator.clipboard.writeText(`${webhookPrefix}/${webhookPoHead}`);
            enqueueSnackbar('POHEAD URL copied to clipboard.');
        } catch {
            enqueueSnackbar('Failed to copy POHEAD URL to clipboard.', { variant: 'error' });
        }
    };

    const copyPOLineUrl = async () => {
        try {
            await navigator.clipboard.writeText(`${webhookPrefix}/${webhookPoLine}`);
            enqueueSnackbar('POLINE URL copied to clipboard.');
        } catch {
            enqueueSnackbar('Failed to copy POLINE URL to clipboard.', { variant: 'error' });
        }
    };


    const allowMicroserviceName = (name): boolean => {
        return name === '' || name.includes(' ') ? false : true;
    };

    const allowUsername = (username): boolean => {
        const cleanedUsername = username.trim();
        return cleanedUsername === '' || cleanedUsername.includes(' ') ? false : true;
    };

    const allowPassword = (password): boolean => {
        return password === '' ? false : true;
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
                <img src={logoInfor} onClick={() => {
                    setErpSystem('infor');
                    setActiveNextButton(true);
                }} />

                <img src={logoIFS} onClick={() => {
                    enqueueSnackbar('Not yet supported, please reach out if interested to know when it will arrive');
                }} />
                <img src={logoSAP} onClick={() => {
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
                    id='microserviceName'
                    label='Name'
                    variant='outlined'
                    className={classes.textField}
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
                <span className={classes.inactiveText}>
                    {webhookPrefix} / m3/pohead
                </span >
                <Button color='primary' onClick={copyPOHeadUrl}>COPY TO CLIPBOARD</Button>

                <p>Webhook for purchase order line (POLINE)</p>
                <span className={classes.inactiveText}>
                    {webhookPrefix} / m3/poline
                </span >
                <Button color='primary' onClick={copyPOLineUrl}>COPY TO CLIPBOARD</Button>


                <p>Create username</p>
                <TextField
                    required
                    id='outlined-required'
                    label='Username'
                    variant='outlined'
                    className={classes.textField}
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
                    id='outlined-password-input'
                    type='password'
                    label='Password'
                    autoComplete='current-password'
                    variant='outlined'
                    className={classes.textField}
                    value={password}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const _password = event.target.value!;
                        setPassword(event.target.value!);

                        if (allowUsername(username) && allowPassword(_password)) {
                            setActiveNextButton(true);
                        } else {
                            setActiveNextButton(false);
                        }
                    }}
                />
                <GeneratePassword isCreate={isCreate} password={password} setPassword={setPassword} />
            </Typography >
        </>,
    ];


    const handleNext = async () => {
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

    const handleBack = () => {
        if (!isCreate && activeStep === 2) {
            enqueueSnackbar('You cannot make changes to the name of the integration type', { variant: 'error' });
            return;
        }

        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} orientation='vertical'>
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel StepIconProps={{
                            classes: { root: classes.stepIcon }
                        }}>
                            <span className={activeStep >= index ? '' : classes.inactiveText}>{label}</span>
                        </StepLabel>
                        <StepContent>
                            {stepsContent[index]}

                            <div className={classes.actionsContainer}>
                                <div>
                                    <Button
                                        variant='contained'
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.backButton}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        variant='contained'
                                        onClick={handleNext}
                                        disabled={!activeNextButton}
                                        className={classes.nextButton}
                                    >
                                        {activeStep === steps.length - 1
                                            ? 'Finish'
                                            : 'Next'}
                                    </Button>
                                </div>
                            </div>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
        </div>
    );
};
