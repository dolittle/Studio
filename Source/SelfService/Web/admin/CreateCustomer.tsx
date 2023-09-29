// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { Box, Grid, Step, Stepper, StepContent, StepLabel, Typography } from '@mui/material';

import { TextField as ThemedTextField } from '../components/theme-legacy/textField';
import { Button } from '@dolittle/design-system';

import { createCustomer, HttpCustomerRequest } from '../apis/solutions/customer';

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

export const CreateCustomer = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const steps = [
        'Provide a name',
    ];

    const [activeStep, setActiveStep] = React.useState(0);
    const [customerName, setCustomerName] = React.useState('');

    const [activeNextButton, setActiveNextButton] = React.useState(false);

    const stepsContent = [
        <>
            <Typography>Customer Name</Typography>

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
                    value={customerName}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setCustomerName(event.target.value!);
                        setActiveNextButton(true);
                    }}
                />
            </Grid>
        </>
    ];

    const handleNext = async () => {
        const input: HttpCustomerRequest = {
            name: customerName,
        };

        try {
            const data = await createCustomer(input);
            enqueueSnackbar('Customer created', { variant: 'info' });
        } catch (error) {
            enqueueSnackbar('Error creating customer.', { variant: 'error' });
        }

        return;
    };

    return (
        <>
            <Typography variant='h1' my={2}>Create Customer Screen</Typography>
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
                                            label='Back'
                                            onClick={() => {
                                                const href = `/admin/customers`;
                                                navigate(href);
                                            }}
                                        />

                                        <Button
                                            label={activeStep === steps.length - 1 ? 'Click to create' : 'Next'}
                                            onClick={handleNext}
                                            disabled={!activeNextButton}
                                        />
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
