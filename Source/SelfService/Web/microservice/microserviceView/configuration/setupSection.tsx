// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useSnackbar } from 'notistack';

import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import { DeleteRounded, EditRounded, ExpandCircleDownRounded, SaveRounded, RestartAltRounded } from '@mui/icons-material';

import { Button } from '@dolittle/design-system/atoms/Button';
import { Form, Input, Select, SwitchToggle } from '@dolittle/design-system/atoms/Forms';

import { canDeleteMicroservice, deleteMicroservice, MicroserviceStore } from '../../../stores/microservice';

import { HttpResponseApplication } from '../../../api/application';
import { getRuntimes } from '../../../api/api';

import { microserviceRestart } from '../helpers';
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

const runtimeVersions: { value: string }[] = [];

type SetupSectionProps = {
    application: HttpResponseApplication;
    applicationId: string;
    environment: string;
    microserviceId: string;
    currentMicroservice: MicroserviceStore;
};

export type SetupSectionParameters = {
    microserviceName: string;
    developmentEnvironment: string;
    imageName: string;
    port: number;
    entrypoint: string;
    ingressPath: string;
};

export const SetupSection = ({ application, applicationId, environment, microserviceId, currentMicroservice }: SetupSectionProps) => {
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();

    const environmentInfo = application.environments.find(_environment => _environment.name === environment)!;
    const canDelete = canDeleteMicroservice(application.environments, environment, microserviceId);

    const { edit: { extra: {
        headCommand,
        runtimeImage,
        headImage,
        ingress
    } } } = currentMicroservice;

    const [setupPanelExpanded, setSetupPanelExpanded] = useState(true);
    const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false);
    const [formIsNotEditable, setFormIsNotEditable] = useState(true);
    const [hasPublicURL, setHasPublicURL] = useState(currentMicroservice.edit?.extra?.isPublic || false);
    const [selectedRuntimeImage, setSelectedRuntimeImage] = useState('');
    const [useM3Connector, setHasM3Connetcor] = useState(environmentInfo.connections?.m3Connector || false);
    const [headCommandArgs, setHeadCommandArgs] = useState<string[]>(headCommand?.args || []);

    useEffect(() => {
        getRuntimes().forEach(runtime => {
            runtimeVersions.push({ value: runtime.image.replace(/dolittle\/runtime:/gi, '') });
        });
        runtimeVersions.push({ value: 'None' });

        setSelectedRuntimeImage(runtimeImage?.replace(/dolittle\/runtime:/gi, '') || 'None');
    }, []);

    const handleRestart = async () => {
        await microserviceRestart({ applicationId, environment, microserviceId, enqueueSnackbar });
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

        enqueueSnackbar(`${currentMicroservice.name} has been deleted.`, { variant: 'info' });
        const href = `/microservices/application/${applicationId}/${environment}/overview`;
        history.push(href);
    };

    return (
        <Box>
            <AlertDialog
                open={deleteDialogIsOpen}
                onClose={() => setDeleteDialogIsOpen(false)}
                handleDeletionConfirm={handleDelete}
            />

            <Accordion
                expanded={setupPanelExpanded}
                onChange={() => setSetupPanelExpanded(!setupPanelExpanded)}
                sx={{
                    backgroundColor: 'transparent',
                    backgroundImage: 'none',
                    pt: 1.875
                }}>
                <AccordionSummary
                    expandIcon={<ExpandCircleDownRounded sx={{ color: 'text.secondary' }} />}
                    aria-controls='setup-content'
                    id='setup-content'
                    sx={{
                        'flexDirection': 'row-reverse',
                        'p': 0,
                        '& .MuiAccordionSummary-expandIconWrapper': {
                            transform: 'rotate(180deg)',
                        },
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
                            disabled={formIsNotEditable}
                            startWithIcon={<EditRounded fontSize='small' />}
                            //onClick={() => setFormIsNotEditable(false)}
                            sx={{ mr: 2.5 }}
                        />
                        <Button
                            variant='text'
                            label='save'
                            disabled={formIsNotEditable}
                            startWithIcon={<SaveRounded fontSize='small' />}
                            //onClick={() => setFormIsNotEditable(true)}
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
                            onClick={() => setDeleteDialogIsOpen(true)}
                        />
                    </Box>

                    <Form<SetupSectionParameters>
                        initialValues={{
                            microserviceName: currentMicroservice.name,
                            developmentEnvironment: environment,
                            imageName: headImage || '',
                            port: 80,
                            entrypoint: '',
                            ingressPath: ingress.path?.replace(/\//, '') || ''
                        }}
                        sx={styles.form}
                    >
                        <Box sx={styles.formSections}>
                            <Typography variant='subtitle1' sx={{ mb: 2 }}>Configuration Setup</Typography>

                            <Input id='microserviceName' label='Microservice Name' required disabled />
                            <Input id='developmentEnvironment' label='Development Environment' disabled />

                            <Select
                                id='runtimeVersion'
                                label='Runtime Version*'
                                options={runtimeVersions}
                                value={selectedRuntimeImage}
                                required
                                disabled={formIsNotEditable}
                                onChange={(event) => setSelectedRuntimeImage(event.target.value)}
                                sx={{ width: 220 }}
                            />
                        </Box>

                        <Box sx={styles.formSections}>
                            <Typography variant='subtitle2' sx={{ mb: 2 }}>Container Image Settings</Typography>

                            <Input id='imageName' label='Image Name' required disabled={formIsNotEditable} sx={{ width: 500 }} />
                            <Input id='port' label='Port' required disabled={formIsNotEditable} />
                            <Input id='entrypoint' label='Entrypoint' disabled={formIsNotEditable} />

                            <HeadArguments cmdArgs={headCommandArgs} setCmdArgs={setHeadCommandArgs} disabled={formIsNotEditable} />
                        </Box>

                        <Box sx={styles.formSections}>
                            <Typography variant='subtitle2'>Public Microservice</Typography>

                            <SwitchToggle
                                title='Expose to a public URL'
                                disabled={formIsNotEditable}
                                checked={hasPublicURL}
                                onChange={(event) => setHasPublicURL(event.target.checked)}
                                sx={{ my: 2.5 }}
                            />

                            {hasPublicURL &&
                                <Input
                                    id="ingressPath"
                                    label='Path'
                                    disabled={formIsNotEditable}
                                    startAdornment='/'
                                    placeholder='leave blank for default path'
                                    sx={{ width: 226 }}
                                />
                            }
                        </Box>

                        {useM3Connector &&
                            <Box sx={styles.formSections}>
                                <Typography variant='subtitle2'>Connect to M3</Typography>

                                <SwitchToggle
                                    title='Make M3 configuration available to microservice'
                                    disabled={formIsNotEditable}
                                    checked={useM3Connector}
                                    onChange={(event) => setHasM3Connetcor(event.target.checked)}
                                    sx={{ mt: 2.5 }}
                                />

                                {/* TODO: Needs some list?
                                <Typography variant='body2' sx={{ ml: 6, mt: 1 }}>
                                    Enabling this will mount these files to the deployed microservice:
                                </Typography> */}
                            </Box>
                        }
                    </Form>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};
