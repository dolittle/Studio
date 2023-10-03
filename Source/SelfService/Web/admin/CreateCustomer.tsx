// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { Box, Grid, Step, Stepper, StepContent, StepLabel, Typography } from '@mui/material';

import { Button, TextField } from '@dolittle/design-system';

import { createCustomer, HttpCustomerRequest } from '../apis/solutions/customer';

import { PageTitle } from '../layout/PageTitle';

const styles = {
    root: {
        width: 1,
    },
    button: {
        mt: 1,
        mr: 1,
    },
    actionsContainer: {
        mb: 2,
    },
    resetContainer: {
        p: 3,
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
            color: '#6678F6',
        },
        '&.MuiStepIcon-root.Mui-completed': {
            color: '#6678F6',
        },
        '&.MuiStepIcon-root.Mui-active .MuiStepIcon-text': {
            fill: '#B3BBFB',
        },
        '&.MuiStepIcon-root .MuiStepIcon-text': {
            fill: '#93959F',
        },
    },
};

export const CreateCustomer = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [activeStep, setActiveStep] = useState(0);
    const [customerName, setCustomerName] = useState('');
    const [activeNextButton, setActiveNextButton] = useState(false);

    const steps = [
        'Provide a name',
    ];

    const stepsContent = [
        <>
            <Typography>Customer Name</Typography>

            <Grid container direction='row' justifyContent='flex-start' alignItems='center'>
                <TextField
                    id='customerName'
                    label='Name'
                    isRequired
                    value={customerName}
                    onValueChange={(event: React.ChangeEvent<HTMLInputElement>) => {
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
            enqueueSnackbar('Customer successfully created.');
        } catch (error) {
            enqueueSnackbar('Error creating customer.', { variant: 'error' });
        }

        return;
    };

    return (
        <>
            <PageTitle title='Create Customer' />

            <Box sx={styles.root}>
                <Stepper activeStep={activeStep} orientation='vertical'>
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel StepIconProps={{ sx: styles.stepIcon }}>
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
