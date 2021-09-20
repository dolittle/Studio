// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { useGlobalContext } from '../../stores/notifications';
import logoInfor from '../../images/infor.png'; // with import
import logoIFS from '../../images/ifs.png';
import logoSAP from '../../images/sap.png';

import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import LoopIcon from '@material-ui/icons/Loop';
import {
    MicroservicePurchaseOrder,
    MicroserviceRawDataLogIngestorWebhookConfig,
    ConnectorWebhookConfigBasic,
    ConnectorWebhookConfigBearer,
} from '../../api/index';

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
        actionsContainer: {
            marginBottom: theme.spacing(2),
        },
        resetContainer: {
            padding: theme.spacing(3),
        },
        inactiveText: {
            color: 'grey',
        },
        progressBar: {
            color: '#ff9366',
        },
    })
);
// TODO ask Liz about bearer token
export const Overview: React.FunctionComponent<Props> = (props) => {
    const { setNotification } = useGlobalContext();

    const _props = props!;
    const onSave = _props.onSave;

    const ms = _props.microservice;

    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [msName, setMsName] = React.useState('');
    const [erpSystem, setErpSystem] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const steps = [
        'Select ERP system',
        'Provide a name',
        'Configure ERP system',
        'Wait for data',
    ];

    // TODO change to data from platform-api
    const webhookPrefix = `https://${ms.extra.ingress.host}/api/webhooks`;
    const webhookPoHead = 'm3/pohead';
    const webhookPoLine = 'm3/poline';

    const copyPOHeadUrl = () => {
        navigator.clipboard.writeText(`${webhookPrefix}/${webhookPoHead}`);
    }

    const copyPOLineUrl = () => {
        navigator.clipboard.writeText(`${webhookPrefix}/${webhookPoLine}`);
    }

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
                    setNotification(`Pick infor`, 'info');
                    setErpSystem('infor');
                    setActiveStep(1);
                }} />

                <img src={logoIFS} onClick={() => {
                    setNotification(`Not yet supported, please reach out if interested to know when it will arrive`, 'info');
                }} />
                <img src={logoSAP} onClick={() => {
                    setNotification(`Not yet supported, please reach out if interested to know when it will arrive`, 'info');
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
                    value={msName}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setMsName(event.target.value!);
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
                    value={username}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        console.log('username', event.target.value!);
                        setUsername(event.target.value!);
                    }}
                />
                <p>Create Password</p>
                <TextField
                    id='outlined-password-input'
                    type='password'
                    label='Password'
                    autoComplete='current-password'
                    variant='outlined'
                    value={password}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        console.log('setPassword', event.target.value!);
                        setPassword(event.target.value!);
                    }}
                />
                <Button color='primary'>GENERATE AND COPY TO CLIPBOARD</Button>
            </Typography >
        </>,
        <>
            <Typography component={'span'}>
                <LoopIcon className={classes.progressBar} />
                <span className='waitForData'>WAITING FOR DATA</span>
                <br />
                <span>
                    It may take a few moments for data to start flowing. If studio cannot
                    connect to your ERP system, try trouble-shooting.
                </span>
                <Button color='primary'>TROUBLESHOOT</Button>
            </Typography>
        </>,
    ];

    const handleNext = async () => {
        if (activeStep === 0) {
            if (erpSystem === '') {
                setNotification('Please select an ERP system', 'error');
                return;
            }
        }

        if (activeStep === 2) {
            ms.name = msName;
            const authorization = makeBasicAuth({ username, password } as ConnectorWebhookConfigBasic);
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
            setNotification('Creating microservice', 'info');
            await onSave(ms);
            return;
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (

        <div className={classes.root}>
            <Stepper activeStep={activeStep} orientation='vertical'>
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                        <StepContent>
                            {stepsContent[index]}

                            <div className={classes.actionsContainer}>
                                <div>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.button}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        onClick={handleNext}
                                        className={classes.button}
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
            {activeStep === steps.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                    <Typography>All steps completed - you&apos;re finished</Typography>
                    <Button onClick={handleReset} className={classes.button}>
                        Reset
                    </Button>
                </Paper>
            )}
        </div>
    );
};

// TODO move to util as used in multiple places
function makeBasicAuth(data: ConnectorWebhookConfigBasic): string {
    const suffix = btoa(`${data.username}:${data.password}`);
    return `Basic ${suffix}`;
}

function makeBearer(data: ConnectorWebhookConfigBearer): string {
    return `Bearer ${data.token}`;
}
