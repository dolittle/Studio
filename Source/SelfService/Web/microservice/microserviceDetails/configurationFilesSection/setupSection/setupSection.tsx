// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useSnackbar } from 'notistack';

import { Accordion, AccordionDetails, AccordionSummary, Box, Tooltip, Typography } from '@mui/material';
import { DeleteRounded, EditRounded, ExpandCircleDownRounded, SaveRounded, RestartAltRounded } from '@mui/icons-material';

import { Button, ConfirmDialog, Form, Input, Select, SwitchToggle } from '@dolittle/design-system';

import { canDeleteMicroservice, deleteMicroservice, MicroserviceStore } from '../../../../stores/microservice';

import { HttpResponseApplication } from '../../../../api/application';

import { HeadArguments } from '../../../components/headArguments';
import { RestartMicroserviceDialog } from '../../restartMicroserviceDialog';
import { getRuntimeNumberFromString } from '../../../helpers';

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
    runtimeVersion: string;
    imageName: string;
    port: number;
    entrypoint: string;
    hasPublicURL: boolean;
    hasM3Connector: boolean;
    ingressPath: string;
};

export const SetupSection = ({ application, applicationId, environment, microserviceId, currentMicroservice }: SetupSectionProps) => {
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();

    const microserviceInfo = currentMicroservice.edit?.extra;
    const environmentInfo = application.environments.find(env => env.name === environment)!;

    const hasM3connectorOption = environmentInfo.connections?.m3Connector || false;
    const hasPublicURLOption = microserviceInfo?.isPublic || false;

    const canDelete = canDeleteMicroservice(application.environments, environment, microserviceId);
    const currentRuntimeImageNumber = { value: getRuntimeNumberFromString(microserviceInfo?.runtimeImage) };

    const [setupPanelExpanded, setSetupPanelExpanded] = useState(true);
    const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false);
    const [restartDialogIsOpen, setRestartDialogIsOpen] = useState(false);
    const [formIsNotEditable, setFormIsNotEditable] = useState(true);
    const [headCommandArgs, setHeadCommandArgs] = useState<string[]>(microserviceInfo?.headCommand?.args || []);

    const handleMicroserviceDelete = async () => {
        setDeleteDialogIsOpen(false);

        // TODO: Add loading spinner.
        if (!canDelete) {
            enqueueSnackbar('Deleting microservice is disabled.', { variant: 'error' });
            return;
        }

        const success = await deleteMicroservice(applicationId, environment, microserviceId);

        if (!success) {
            enqueueSnackbar(`Failed to delete microservice '${currentMicroservice.name}'.`, { variant: 'error' });
            return;
        }

        enqueueSnackbar(`Microservice '${currentMicroservice.name}' has been deleted.`);
        const href = `/microservices/application/${applicationId}/${environment}/overview`;
        history.push(href);
    };

    return (
        <Box>
            <ConfirmDialog
                id='delete-microservice-dialog'
                isOpen={deleteDialogIsOpen}
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
                msName={currentMicroservice.name}
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
                        <Tooltip title='Coming soon!' placement='top' arrow>
                            <span>
                                <Button
                                    label='edit'
                                    disabled={formIsNotEditable}
                                    startWithIcon={<EditRounded />}
                                    //onClick={() => setFormIsNotEditable(false)}
                                    sx={{ mr: 2.5 }}
                                />
                            </span>
                        </Tooltip>
                        <Tooltip title='Coming soon!' placement='top' arrow>
                            <span>
                                <Button
                                    label='save'
                                    disabled={formIsNotEditable}
                                    startWithIcon={<SaveRounded />}
                                    //onClick={() => setFormIsNotEditable(true)}
                                    sx={{ mr: 2.5 }}
                                />
                            </span>
                        </Tooltip>
                        <Button
                            label='Restart Microservice'
                            startWithIcon={<RestartAltRounded />}
                            onClick={() => setRestartDialogIsOpen(true)}
                            sx={{ mr: 2.5 }}
                        />
                        <Button
                            label='Delete Microservice'
                            startWithIcon={<DeleteRounded />}
                            onClick={() => setDeleteDialogIsOpen(true)}
                        />
                    </Box>

                    <Form<SetupSectionParameters>
                        initialValues={{
                            microserviceName: currentMicroservice.name,
                            developmentEnvironment: environment,
                            runtimeVersion: currentRuntimeImageNumber.value,
                            imageName: microserviceInfo?.headImage,
                            port: 80,
                            entrypoint: '',
                            hasPublicURL: hasPublicURLOption,
                            hasM3Connector: hasM3connectorOption,
                            ingressPath: microserviceInfo?.ingress?.path?.replace(/\//, '')
                        }}
                        sx={styles.form}
                    >
                        <Box sx={styles.formSections}>
                            <Typography variant='subtitle2' sx={{ mb: 2 }}>Configuration Setup</Typography>

                            <Input id='microserviceName' label='Microservice Name' required disabled />
                            <Input id='developmentEnvironment' label='Development Environment' disabled />

                            <Select
                                id='runtimeVersion'
                                label='Runtime Version*'
                                options={[currentRuntimeImageNumber]}
                                required
                                disabled={formIsNotEditable}
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

                            <SwitchToggle id='hasPublicURL' label='Expose to a public URL' disabled={formIsNotEditable} />

                            {hasPublicURLOption &&
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

                        {hasM3connectorOption &&
                            <Box sx={styles.formSections}>
                                <Typography variant='subtitle2'>Connect to M3</Typography>

                                <SwitchToggle
                                    id='hasM3Connector'
                                    label='Make M3 configuration available to microservice'
                                    disabled={formIsNotEditable}
                                />

                                <Typography variant='body2' sx={{ ml: 6, mt: 1 }}>
                                    Enabling this will mount these files to the deployed microservice:
                                </Typography>
                                <Box sx={{ ml: 6, mt: 2 }}>
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
