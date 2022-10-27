// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useSnackbar } from 'notistack';

import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import {
    DeleteRounded,
    EditRounded,
    ExpandCircleDownRounded,
    SaveRounded,
    RestartAltRounded
} from '@mui/icons-material';

import { Button } from '@dolittle/design-system/atoms/Button/Button';
import { Form, Input, Select, SwitchLabels } from '@dolittle/design-system/atoms/Forms';

import { canDeleteMicroservice, deleteMicroservice } from '../../../stores/microservice';

import { MicroserviceSimple } from '../../../api/index';

import { MicroserviceRestart } from '../helpers';
import { AlertDialog } from './AlertDialog';
import { HeadArguments } from '../../components/headArguments';

const styles = {
    form: {
        'mt': 3,
        '& .MuiFormControl-root': {
            'my': 1,
            '& fieldset': {
                borderStyle: 'dashed'
            }
        },
        '.MuiFormControlLabel-root': {
            ml: 0
        }
    },
    formSections: {
        mb: 4,
        display: 'flex',
        flexDirection: 'column'
    }
};

const runtimeVersions = [
    {
        value: '8.6.0'
    },
    {
        value: '6.1.0'
    },
    {
        value: 'None'
    }
];

export const SetupSection = ({ application, applicationId, environment, microservice, microserviceId }: any) => {
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();

    const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false);
    const [isNotEditable, setIsNotEditable] = useState(false);

    const currentMicroserviceData = {
        dolittle: {
            applicationId: application.id,
            customerId: application.customerId,
            microserviceId,
        },
        name: 'Order',
        kind: 'simple',
        environment,
        extra: {
            headImage: 'nginxdemos/hello:latest',
            headPort: 80,
            runtimeImage: 'image',
            isPublic: false,
            ingress: {
                path: '',
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

    const [args, setArgs] = useState(currentMicroserviceData.extra.headCommand.args);
    const [exposedToPublic, setExposedToPublic] = useState(false);

    const canDelete = canDeleteMicroservice(application.environments, environment, microserviceId);
    const microserviceName = microservice.name;

    /* if (!microservice) {
        const href = `/microservices/application/${applicationId}/${environment}/overview`;
        history.push(href);
        return null;
    }; */

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

    const handleDialogOpen = () => {
        setDeleteDialogIsOpen(true);
    };

    const handleDialogClose = () => {
        setDeleteDialogIsOpen(false);
    };

    return (
        <>
            <AlertDialog open={deleteDialogIsOpen} onClose={handleDialogClose} handleDeletionConfirm={handleDelete} />

            <Accordion expanded sx={{
                backgroundColor: 'transparent',
                backgroundImage: 'none',
                pt: 1.875
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
                    <Typography variant='subtitle1' sx={{ ml: 1.25 }}>Configuration Setup</Typography>
                </AccordionSummary>

                <AccordionDetails>
                    <Box>
                        <Button
                            variant='text'
                            label='edit'
                            disabled={!isNotEditable}
                            startWithIcon={<EditRounded fontSize='small' />}
                            onClick={() => setIsNotEditable(false)}
                            sx={{ mr: 2.5 }}
                        />
                        <Button
                            variant='text'
                            disabled={isNotEditable}
                            label='save'
                            startWithIcon={<SaveRounded fontSize='small' />}
                            onClick={() => setIsNotEditable(true)}
                            sx={{ mr: 2.5 }}
                        />
                        <Button
                            variant='text'
                            label='Restart Microservice'
                            startWithIcon={<RestartAltRounded fontSize='small' />}
                            onClick={handleRestart}
                            sx={{ mr: 2.5 }}
                        />
                        <Button
                            variant='text'
                            label='Delete Microservice'
                            startWithIcon={<DeleteRounded fontSize='small' />}
                            onClick={handleDialogOpen}
                        />
                    </Box>

                    <Form
                        initialValues={{
                            microserviceName,
                            developmentEnvironment: environment,
                            runtimeVersion: microservice.extra?.runtimeImage?.replace(/dolittle\/runtime:/gi, '') || 'None',
                            imageName: microservice?.extra?.headImage || '',
                            port: '80',
                            entrypoint: '',
                            ingressPath: microservice?.extra?.ingressPath || ''
                        }}
                        sx={styles.form}
                    >
                        <Box sx={styles.formSections}>
                            <Typography variant='subtitle1' sx={{ mb: 2 }}>Configuration Setup</Typography>

                            <Input id='microserviceName' label='Microservice Name' required disabled={isNotEditable} />
                            <Input id='developmentEnvironment' label='Development Environment' disabled />

                            <Select
                                id='runtimeVersion'
                                label='Runtime Version*'
                                options={runtimeVersions}
                                value={microservice.extra?.runtimeImage?.replace(/dolittle\/runtime:/gi, '') || 'None'}
                                required
                                disabled={isNotEditable}
                                sx={{ width: 220 }}
                            />
                        </Box>

                        <Box sx={styles.formSections}>
                            <Typography variant='subtitle2' sx={{ mb: 2 }}>Container Image Settings</Typography>

                            <Input id='imageName' label='Image Name' sx={{ width: 500 }} />
                            <Input id='port' label='Port' required disabled={isNotEditable} />
                            <Input id='entrypoint' label='Entrypoint' disabled={isNotEditable} />

                            <HeadArguments args={args} setArgs={setArgs} />
                        </Box>

                        <Box sx={styles.formSections}>
                            <Typography variant='subtitle2'>Public Microservice</Typography>

                            <SwitchLabels
                                title='Expose to a public URL'
                                disabled={isNotEditable}
                                checked={exposedToPublic}
                                onChange={(event) => setExposedToPublic(event.target.checked)}
                                sx={{ my: 2.5 }}
                            />

                            {exposedToPublic &&
                                <Input
                                    id="ingressPath"
                                    label='Path'
                                    startAdornment='/'
                                    placeholder='leave blank for default path'
                                />
                            }
                        </Box>

                        <Box sx={styles.formSections}>
                            <Typography variant='subtitle2'>Connect to M3</Typography>

                            <SwitchLabels
                                title='Make M3 configuration available to microservice'
                                defaultChecked={microservice?.extra?.connections?.m3Connector}
                                disabled={isNotEditable}
                                sx={{ mt: 2.5 }}
                            />

                            <Typography variant='body2' sx={{ ml: 6, mt: 1 }}>
                                Enabling this will mount these files to the deployed microservice:
                            </Typography>
                        </Box>
                    </Form>
                </AccordionDetails>
            </Accordion>
        </>
    );
};
