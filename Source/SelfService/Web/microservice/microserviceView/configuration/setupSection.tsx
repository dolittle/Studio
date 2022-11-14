// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useSnackbar } from 'notistack';

import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import { DeleteRounded, EditRounded, ExpandCircleDownRounded, SaveRounded, RestartAltRounded } from '@mui/icons-material';

import { Button } from '@dolittle/design-system/atoms/Button';
import { Form, Input, Select, SwitchToggle } from '@dolittle/design-system/atoms/Forms';
import { ConfirmDialog } from '@dolittle/design-system/atoms/ConfirmDialog/ConfirmDialog';

import { canDeleteMicroservice, deleteMicroservice, MicroserviceStore } from '../../../stores/microservice';

import { HttpResponseApplication } from '../../../api/application';
import { getRuntimes } from '../../../api/api';

import { HeadArguments } from '../../components/headArguments';
import { RestartMicroserviceDialog } from '../RestartMicroserviceDialog';
import { capitalize, removeFromString } from '../helpers';

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
        'mb': 4,
        'display': 'flex',
        'flexDirection': 'column',
        '&:last-child': {
            mb: 0
        }
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

    const microserviceInfo = currentMicroservice.edit?.extra;
    const runtimeVersionNumber = capitalize(removeFromString(microserviceInfo?.runtimeImage, /dolittle\/runtime:/gi));

    const [setupPanelExpanded, setSetupPanelExpanded] = useState(true);
    const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false);
    const [restartDialogIsOpen, setRestartDialogIsOpen] = useState(false);
    const [formIsNotEditable, setFormIsNotEditable] = useState(true);
    const [hasPublicURL, setHasPublicURL] = useState(microserviceInfo?.isPublic || false);
    const [currentRuntimeVersion, setCurrentRuntimeVersion] = useState('');
    const [useM3Connector, setHasM3Connetcor] = useState(environmentInfo.connections?.m3Connector || false);
    const [headCommandArgs, setHeadCommandArgs] = useState<string[]>(microserviceInfo?.headCommand?.args || []);

    useEffect(() => {
        getRuntimes().forEach(runtime => {
            runtimeVersions.push({ value: removeFromString(runtime.image, /dolittle\/runtime:/gi) });
        });
        runtimeVersions.push({ value: 'None' });

        setCurrentRuntimeVersion(runtimeVersionNumber);
    }, []);

    const handleMicroserviceDelete = async () => {
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
            <ConfirmDialog
                id='delete-microservice-dialog'
                open={deleteDialogIsOpen}
                title='Delete microservice?'
                description='This action cannot be undone. Click delete if you would like to delete the mircroservice.'
                cancelText='Cancel'
                confirmText='Delete'
                handleCancel={() => setDeleteDialogIsOpen(false)}
                handleConfirm={handleMicroserviceDelete}
            />

            <RestartMicroserviceDialog
                applicationId={applicationId}
                environment={environment}
                microserviceId={microserviceId}
                open={restartDialogIsOpen}
                setOpen={setRestartDialogIsOpen}
                handleSuccess={() => window.location.reload()}
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
                            startWithIcon={<EditRounded />}
                            //onClick={() => setFormIsNotEditable(false)}
                            sx={{ mr: 2.5 }}
                        />
                        <Button
                            variant='text'
                            label='save'
                            disabled={formIsNotEditable}
                            startWithIcon={<SaveRounded />}
                            //onClick={() => setFormIsNotEditable(true)}
                            sx={{ mr: 2.5 }}
                        />
                        <Button
                            variant='text'
                            label='Restart Microservice'
                            startWithIcon={<RestartAltRounded />}
                            onClick={() => setRestartDialogIsOpen(true)}
                            sx={{ mr: 2.5 }}
                        />
                        <Button
                            variant='text'
                            label='Delete Microservice'
                            startWithIcon={<DeleteRounded />}
                            onClick={() => setDeleteDialogIsOpen(true)}
                        />
                    </Box>

                    <Form<SetupSectionParameters>
                        initialValues={{
                            microserviceName: currentMicroservice.name,
                            developmentEnvironment: environment,
                            imageName: microserviceInfo?.headImage,
                            port: 80,
                            entrypoint: '',
                            ingressPath: microserviceInfo?.ingress?.path?.replace(/\//, '')
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
                                value={currentRuntimeVersion}
                                required
                                disabled={formIsNotEditable}
                                onChange={(event) => setCurrentRuntimeVersion(event.target.value)}
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

                                <Typography variant='body2' sx={{ ml: 6, mt: 1 }}>
                                    Enabling this will mount these files to the deployed microservice:
                                </Typography>
                                <Box sx={{ ml: 6, mt: 2, lineHeight: '20px' }}>
                                    <Typography variant='body2'>/app/connection/kafka/ca.pem</Typography>
                                    <Typography variant='body2'>/app/connection/kafka/certificate.pem</Typography>
                                    <Typography variant='body2'>/app/connection/kafka/accessKey.pem</Typography>
                                </Box>
                            </Box>
                        }
                    </Form>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};
