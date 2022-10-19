// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useSnackbar } from 'notistack';

import { canDeleteMicroservice, deleteMicroservice } from '../../../stores/microservice';

import { Button } from '@dolittle/design-system/atoms/Button/Button';
import { Form, Input, Select } from '@dolittle/design-system/atoms/Forms';

import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import { DeleteRounded, EditRounded, ExpandCircleDownRounded, SaveRounded, RestartAltRounded } from '@mui/icons-material';

import { MicroserviceRestart } from '../helpers';
import { AlertDialog } from './AlertDialog';

export const SetupSection = ({ application, applicationId, environment, microservice, microserviceId }: any) => {
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();

    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    const handleDialogOpen = () => {
        setDialogIsOpen(true);
    };

    const handleDialogClose = () => {
        setDialogIsOpen(false);
    };

    const canDelete = canDeleteMicroservice(application.environments, environment, microserviceId);
    const msName = microservice.name;

    if (!microservice) {
        const href = `/microservices/application/${applicationId}/${environment}/overview`;
        history.push(href);
        return null;
    }

    const handleRestart = async () => {
        await MicroserviceRestart({ applicationId, environment, microserviceId, enqueueSnackbar });
    };

    const handleDelete = async () => {
        // Add loading state?
        if (!canDelete) {
            enqueueSnackbar('Deleting microservice is disabled', { variant: 'error' });
            return;
        }

        const success = await deleteMicroservice(applicationId, environment, microserviceId);

        if (!success) {
            enqueueSnackbar('Failed to delete microservice', { variant: 'error' });
            return;
        }

        enqueueSnackbar('Microservice deleted', { variant: 'info' });
        const href = `/microservices/application/${applicationId}/${environment}/overview`;
        history.push(href);
    };

    return (
        <>
            <AlertDialog open={dialogIsOpen} onClose={handleDialogClose} handleDeletionConfirm={handleDelete} />

            <Accordion expanded sx={{
                'backgroundColor': 'transparent',
                'backgroundImage': 'none',
                'pt': 1.875,
                '& .MuiAccordionSummary-content': {
                    ml: 1.25
                },
                '& .MuiAccordionSummary-content.Mui-expanded': {
                    ml: 1.25
                }
            }}>
                <AccordionSummary
                    expandIcon={<ExpandCircleDownRounded />}
                    aria-controls='setup-content'
                    id='setup-content'
                    sx={{
                        'flexDirection': 'row-reverse',
                        'p': 0,
                        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
                            transform: 'rotate(0deg)',
                        },
                    }}
                >
                    <Typography variant='subtitle1'>Configuration Setup</Typography>
                </AccordionSummary>

                <AccordionDetails>
                    <Box sx={{ mb: 3 }}>
                        <Button variant='text' disabled label='edit' startWithIcon={<EditRounded fontSize='small' />} sx={{ fontSize: 12, mr: 2.5 }} />
                        <Button variant='text' disabled label='save' startWithIcon={<SaveRounded fontSize='small' />} sx={{ fontSize: 12, mr: 2.5 }} />
                        <Button
                            variant='text'
                            label='Restart Microservice'
                            startWithIcon={<RestartAltRounded fontSize='small' />}
                            onClick={handleRestart}
                            sx={{ fontSize: 12, mr: 2.5 }}
                        />
                        <Button
                            variant='text'
                            label='Delete Microservice'
                            startWithIcon={<DeleteRounded fontSize='small' />}
                            onClick={handleDialogOpen}
                            sx={{ fontSize: 12 }}
                        />
                    </Box>

                    <Typography>Configuration Setup</Typography>

                    <Form
                        initialValues={{
                            MicroserviceName: '',
                        }}
                        sx={{ mt: 3, display: 'flex', flexDirection: 'column' }}
                    >
                        <Input id='microservice-name' label='Microservice Name' required disabled />
                        <Input id='development-environment' label='Development Environment' required disabled />

                        <Select id='runtime-version' label='Runtime Version*' />
                    </Form>
                </AccordionDetails>
            </Accordion>
        </>
    );
};
