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

// This doesnt load :(
import logoInfor from '../../images/infor.png'; // with import
import logoIFS from '../../images/ifs.png';
import logoSAP from '../../images/sap.png';

import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { classes } from '../../theme/theme';
import LoopIcon from '@material-ui/icons/Loop';
import '../purchaseOrder/purchaseorder.scss';

type Props = {
    // onNameChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
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

export const Overview: React.FunctionComponent<Props> = (props) => {
    const _props = props!;
    // const onNameChange = _props.onNameChange;
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = [
        'Select ERP system',
        'Provide a name',
        'Configure ERP system',
        'Wait for data',
    ];

    const stepsContent = [
        <>
            <Typography>
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
                <img src={logoInfor} />
                <img src={logoIFS} />
                <img src={logoSAP} />
            </Grid>
        </>,
        <>
            <Typography>
                <p>
                    Establish a descriptive name for this microservice. A good example
                    might be, “supplier purchase orders”. This can always be changed
                    later.
                </p>
                <form className={classes.root} noValidate autoComplete='off'>
                    <TextField
                        id='microserviceName'
                        label='Name'
                        variant='outlined'
                        // className={classes.textField}
                        // onChange={onNameChange}
                    />
                </form>
            </Typography>
        </>,
        <>
            <Typography>
                <p>
                    The webhook endpoints are provided below. Each one will be established
                    separately in program CMS045 in M3, however, the same username and
                    password can be used for both endpoints.
                </p>
                <p>Webhook for purchase order head (POHEAD)</p>
                <span className={classes.inactiveText}>
                    https://dazzling-fayman.dolittle.io/api/webhooks / m3/pohead
                </span>
                <Button color='primary'>COPY TO CLIPBOARD</Button>

                <p>Webhook for purchase order line (POLINE)</p>
                <span className={classes.inactiveText}>
                    https://dazzling-fayman.dolittle.io/api/webhooks / m3/poline
                </span>
                <Button color='primary'>COPY TO CLIPBOARD</Button>

                <p>Create username</p>
                <TextField
                    required
                    id='outlined-required'
                    label='Username'
                    variant='outlined'
                />
                <p>Create Password</p>
                <TextField
                    id='outlined-password-input'
                    type='password'
                    label='Password'
                    autoComplete='current-password'
                    variant='outlined'
                />
                <Button color='primary'>GENERATE AND COPY TO CLIPBOARD</Button>
            </Typography>
        </>,
        <>
            <Typography>
                <LoopIcon className={classes.progressBar} />
                <span className='waitForData'>WAITING FOR DATA</span>
                <span>
                    It may take a few moments for data to start flowing. If studio cannot
                    connect to your ERP system, try trouble-shooting.
                </span>
                <Button color='primary'>TROUBLESHOOT</Button>
            </Typography>
        </>,
    ];

    const handleNext = () => {
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
