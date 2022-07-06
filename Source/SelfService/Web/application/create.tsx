// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useHistory } from 'react-router-dom';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import RemoveIcon from '@mui/icons-material/HighlightOff';



import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import Checkbox from '@mui/material/Checkbox';

import { Box, Grid } from '@mui/material';
import { TextField } from '../theme/textField';
import { ButtonText } from '../theme/buttonText';
import { Button } from '../theme/button';
import { createApplication, HttpApplicationRequest, HttpApplicationEnvironment } from '../api/application';
import { ShortInfo } from '../api/api';
import { Guid } from '@dolittle/rudiments';


type Props = {};


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
        padding: 2,
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


export const Create: React.FunctionComponent<Props> = (props) => {
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const newApplicationId = Guid.create().toString();
    const steps = [
        'Provide a name',
        'Provide contact info',
        'Setup Environments'
    ];


    const [activeStep, setActiveStep] = React.useState(0);
    const [application, setApplication] = React.useState({
        id: newApplicationId,
        name: '',
    } as ShortInfo);
    const [contactName, setContactName] = React.useState('');
    const [contactEmail, setContactEmail] = React.useState('');
    const [environments, setEnvironments] = React.useState([
        {
            name: 'Production',
            shortName: 'Prod',
            checked: true,
            customerTenants: [Guid.create().toString()] as string[]
        },
        {
            name: 'Development',
            shortName: 'Dev',
            checked: true,
            customerTenants: [Guid.create().toString()] as string[]
        },
        {
            name: 'Test',
            shortName: 'Test',
            checked: true,
            customerTenants: [Guid.create().toString()] as string[]
        },
    ]);

    const [activeNextButton, setActiveNextButton] = React.useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newEnvironments = [...environments];
        newEnvironments[index].checked = event.target.checked;
        setEnvironments(newEnvironments);
        checkTenantIdValidity();
    };

    const handleAddTenant = (event: React.MouseEvent<HTMLElement>, environmentIndex: number) => {
        const newEnvironments = [...environments];
        newEnvironments[environmentIndex].customerTenants.push(Guid.create().toString());
        setEnvironments(newEnvironments);
        checkTenantIdValidity();
    };

    const handleRemoveTenant = (event: React.MouseEvent<HTMLElement>, environmentIndex: number, tenantIndex: number) => {
        const newEnvironments = [...environments];
        newEnvironments[environmentIndex].customerTenants.splice(tenantIndex, 1);
        setEnvironments(newEnvironments);
        checkTenantIdValidity();
    };

    const handleCustomerTenantId = (event: React.ChangeEvent<HTMLInputElement>, environmentIndex: number, tenantIndex: number) => {
        const newEnvironments = [...environments];
        newEnvironments[environmentIndex].customerTenants[tenantIndex] = event.target.value;
        setEnvironments(newEnvironments);
        checkTenantIdValidity();
    };

    const checkTenantIdValidity = () => {
        let isValid = true;
        environments
            .filter(e => e.checked)
            .forEach(environment => {
                const atLeastOneCustomerTenant = environment.customerTenants.length === 0;
                if (atLeastOneCustomerTenant) {
                    isValid = false;
                    return;
                }

                environment.customerTenants.forEach(tenant => {
                    let parsed: Guid;
                    try {
                        parsed = Guid.parse(tenant);
                    } catch (error) {
                        isValid = false;
                        return;
                    }
                    if (parsed.toString().includes('NaN') || tenant.length !== 36) {
                        isValid = false;
                        return;
                    }
                });
            });

        if (environments.every(e => !e.checked)) {
            isValid = false;
        }

        setActiveNextButton(isValid);
    };


    const stepsContent = [
        <>
            <Typography component='span'>
                <p>
                    Let’s name your application
                </p>
            </Typography>
            <Grid
                container
                direction='row'
                justifyContent='flex-start'
                alignItems='center'
            >
                <TextField
                    required
                    id='applicationId'
                    label='Application ID'
                    value={application.id}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const _application = { ...application };
                        _application.id = event.target.value!;
                        setApplication(_application);
                        setActiveNextButton(true);
                    }}
                />

                <TextField
                    required
                    id='applicationName'
                    label='Name'
                    value={application.name}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const _application = { ...application };
                        _application.name = event.target.value!;
                        setApplication(_application);
                        setActiveNextButton(true);
                    }}
                />
            </Grid>
        </>,
        <>
            <Typography component='span'>
                <p>
                    Who should we contact regarding important updates for your application?
                </p>
                <TextField
                    required
                    id='contactName'
                    label='Contact Name'
                    value={contactName}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const _name = event.target.value!;
                        setContactName(_name);
                        setActiveNextButton(true);
                    }}
                />

                <TextField
                    required
                    id='contactEmail'
                    label='Email'
                    value={contactEmail}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const _name = event.target.value!;
                        setContactEmail(_name);
                        setActiveNextButton(true);
                    }}
                />

            </Typography>
        </>,
        <>
            <Typography component='span'>
                <p>
                    Select at least (1) environment for your application or create a custom named one.*
                </p>
                {environments.map((environment, environmentIndex) => (
                    <>
                        <FormGroup>
                            <FormControlLabel key={environment.shortName}
                                control={
                                    <Checkbox
                                        checked={environment.checked}
                                        onChange={(event) => handleChange(event, environmentIndex)}
                                        name={environment.shortName}
                                    />
                                }
                                label={environment.name}
                            />
                        </FormGroup>
                        {environment.checked && (
                            <>
                                <Box flexDirection='column' display='flex' justifyContent='flex-start' style={{ gap: '1rem' }}>
                                    {environment.customerTenants.map((tenant, tenantIndex) => (
                                        <Box display='flex' justifyContent='flex-start' style={{ gap: '1rem' }} key={tenantIndex}>
                                            <TextField
                                                id={'uuid' + tenantIndex.toString()}
                                                label='UUID'
                                                value={tenant}
                                                onChange={(event) => handleCustomerTenantId(event, environmentIndex, tenantIndex)}
                                                size='small'
                                            />
                                            {tenantIndex !== 0 && (
                                                <ButtonText
                                                    onClick={(event) => handleRemoveTenant(event, environmentIndex, tenantIndex)}
                                                    buttonType='secondary'
                                                    size='small'
                                                    startIcon={<RemoveIcon />}
                                                >
                                                    Remove
                                                </ButtonText>
                                            )}
                                        </Box>
                                    ))}
                                </Box>
                                <ButtonText
                                    onClick={(event) => handleAddTenant(event, environmentIndex)}
                                    buttonType='secondary'
                                    size='small'
                                    withIcon
                                >
                                    Add tenant
                                </ButtonText>
                            </>
                        )}
                    </>
                ))}
            </Typography >
        </>,
    ];


    const handleNext = async (event: React.MouseEvent<HTMLElement>) => {
        if (activeStep === 2) {
            const input: HttpApplicationRequest = {
                id: application.id,
                name: application.name,
                environments: environments
                    .filter(e => e.checked)
                    .map(e => ({
                        name: e.shortName,
                        customerTenants: e.customerTenants.map(t => ({ id: t }))
                    } as HttpApplicationEnvironment)),
            };
            try {
                await createApplication(input);
                // redirect to build
                const href = `/application/building/${application.id}`;
                history.push(href);

                enqueueSnackbar('Application created', { variant: 'info' });
            } catch (error) {
                enqueueSnackbar('Error creating application', { variant: 'error' });
            }
            return;
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = (event: React.MouseEvent<HTMLElement>) => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <>
            <Typography variant='h1' my={2}>Create Application Screen</Typography>
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
