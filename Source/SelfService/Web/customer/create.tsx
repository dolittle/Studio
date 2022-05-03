// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useHistory } from 'react-router-dom';


import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';

import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';

import { Box, Grid } from '@mui/material';
import { Button } from '../theme/button';
import { TextField as ThemedTextField } from '../theme/textField';
import { createCustomer, HttpCustomerRequest } from '../api/customer';


type Props = {

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
<<<<<<< HEAD

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
=======
>>>>>>> main
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



export const Create: React.FunctionComponent<Props> = (props) => {
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();

    const steps = [
        'Provide a name',
    ];

    const [activeStep, setActiveStep] = React.useState(0);
    const [customerName, setCustomerName] = React.useState('');

    const [activeNextButton, setActiveNextButton] = React.useState(false);
    const todoOnClick = () => {
        enqueueSnackbar('TODO');
    };

    const stepsContent = [
        <>
            <Typography component={'span'}>
                <p>
                    Customer Name
                </p>
            </Typography>
            <Grid
                container
                direction='row'
                justifyContent='flex-start'
                alignItems='center'
            >
                <ThemedTextField
                    required
                    id='customerName'
                    label='Name'
<<<<<<< HEAD
                    variant='outlined'
                    sx={styles.textField}
=======
>>>>>>> main
                    value={customerName}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setCustomerName(event.target.value!);
                        setActiveNextButton(true);
                    }}
                />
            </Grid>
        </>,
    ];


    const handleNext = async (event: React.MouseEvent<HTMLElement>) => {
        const input: HttpCustomerRequest = {
            name: customerName,
        };
        try {
            const data = await createCustomer(input);
            console.log(data);
            enqueueSnackbar('Customer created', { variant: 'info' });
        } catch (error) {
            enqueueSnackbar('Error creating customer', { variant: 'error' });
        }
        return;
    };


    return (
        <>
            <h1>Create Customer Screen</h1>
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
                                        <Button
                                            onClick={() => {
                                                const href = `/admin/customers`;
                                                history.push(href);
                                            }}
                                        >
                                            Back
                                        </Button>

                                        <Button
                                            onClick={handleNext}
                                            disabled={!activeNextButton}
                                        >
                                            {activeStep === steps.length - 1
                                                ? 'Click to create'
                                                : 'Next'}
                                        </Button>
                                    </div>
                                </Box>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
            </Box>
        </>
    );
};
