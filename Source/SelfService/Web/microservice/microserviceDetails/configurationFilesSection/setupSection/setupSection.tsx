// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useSnackbar } from 'notistack';

import { Box, Typography } from '@mui/material';

import { Accordion, ConfirmDialog, Form, Input, Select, Switch } from '@dolittle/design-system';

import { canDeleteMicroservice, deleteMicroservice, MicroserviceStore } from '../../../../stores/microservice';

import { HttpResponseApplication } from '../../../../api/application';
import { MicroserviceFormParameters } from '../../../../api/index';

import { HasM3ConnectorField } from '../../../components/form/hasM3ConnectorField';
import { HeadArguments } from '../../../components/form/headArguments';
import { RestartMicroserviceDialog } from '../../../components/restartMicroserviceDialog';
import { HeaderButtons } from './headerButtons';
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
        mb: 4,
        display: 'flex',
        flexDirection: 'column'
    }
};

type SetupSectionProps = {
    application: HttpResponseApplication;
    applicationId: string;
    environment: string;
    microserviceId: string;
    currentMicroservice: MicroserviceStore;
};

export const SetupSection = ({ application, applicationId, environment, microserviceId, currentMicroservice }: SetupSectionProps) => {
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();

    const microserviceInfo = currentMicroservice.edit?.extra;
    const environmentInfo = application.environments.find(env => env.name === environment)!;
    const canDelete = canDeleteMicroservice(application.environments, environment, microserviceId);

    const currentRuntimeImageNumber = { value: microserviceInfo?.runtimeImage, displayValue: getRuntimeNumberFromString(microserviceInfo?.runtimeImage) };
    const hasM3ConnectorOption = environmentInfo?.connections?.m3Connector || false;
    // Remove extra slash from ingress path as it is there already with startAdornment.
    const cleanedIngressPath = microserviceInfo?.ingress?.path?.replace(/\//, '') || '';
    // Convert the head arguments to the format that the form expects.
    const headArgumentValues = microserviceInfo?.headCommand?.args?.map((arg: string) => ({ value: arg })) || [];

    const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false);
    const [restartDialogIsOpen, setRestartDialogIsOpen] = useState(false);
    const [formIsNotEditable, setFormIsNotEditable] = useState(true);
    const [showPublicUrlInfo, setShowPublicUrlInfo] = useState(microserviceInfo?.isPublic || false);
    const [showM3ConnectorInfo, setShowM3ConnectorInfo] = useState(false);

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
                id='setup-accordion'
                title='Configuration Setup'
                defaultExpanded
            >
                <HeaderButtons
                    handleRestartDialog={() => setRestartDialogIsOpen(true)}
                    handleDeleteDialog={() => setDeleteDialogIsOpen(true)}
                    disabled={formIsNotEditable}
                    sx={{ mr: 2.5 }}
                />

                <Form<MicroserviceFormParameters>
                    initialValues={{
                        microserviceName: currentMicroservice.name,
                        developmentEnvironment: environment,
                        runtimeVersion: currentRuntimeImageNumber.value,
                        headImage: microserviceInfo?.headImage,
                        headPort: 80,
                        entrypoint: '',
                        isPublic: showPublicUrlInfo,
                        headArguments: headArgumentValues,
                        ingressPath: cleanedIngressPath,
                        hasM3Connector: hasM3ConnectorOption
                    }}
                    sx={styles.form}
                >

                    <Box sx={styles.formSections}>
                        <Typography variant='subtitle2' sx={{ mb: 2 }}>Configuration Setup</Typography>

                        <Input id='microserviceName' label='Microservice Name' required disabled />
                        <Input id='developmentEnvironment' label='Development Environment' disabled />

                        <Select
                            id='runtimeVersion'
                            label='Runtime Version'
                            options={[currentRuntimeImageNumber]}
                            required
                            disabled={formIsNotEditable}
                        />
                    </Box>

                    <Box sx={styles.formSections}>
                        <Typography variant='subtitle2' sx={{ mb: 2 }}>Container Image Settings</Typography>

                        <Input
                            id='headImage'
                            label='Image Name'
                            required
                            disabled={formIsNotEditable}
                            sx={{ width: 500 }}
                        />

                        <Input
                            id='headPort'
                            label='Port'
                            disabled={formIsNotEditable}
                            required
                            pattern={{
                                value: /^[0-9]+$/,
                                message: 'Please enter a valid port number.'
                            }}
                        />

                        <Input
                            id='entrypoint'
                            label='Entrypoint'
                            disabled={formIsNotEditable}
                        />

                        <HeadArguments disabled={formIsNotEditable} />
                    </Box>

                    <Box sx={styles.formSections}>
                        <Typography variant='subtitle2'>Public Microservice</Typography>

                        <Switch
                            id='isPublic'
                            label='Expose to a public URL'
                            onChange={() => !setShowPublicUrlInfo}
                            disabled={formIsNotEditable}
                        />

                        {showPublicUrlInfo &&
                            <Input
                                id='ingressPath'
                                label='Path'
                                startAdornment='/'
                                placeholder='leave blank for default path'
                                disabled={formIsNotEditable}
                                sx={{ width: 226 }}
                            />
                        }
                    </Box>

                    {hasM3ConnectorOption &&
                        <HasM3ConnectorField
                            hasM3Connector={showM3ConnectorInfo}
                            setHasM3Connector={() => !setShowM3ConnectorInfo}
                            disabled={formIsNotEditable}
                            sx={styles.formSections}
                        />
                    }
                </Form>
            </Accordion>
        </Box>
    );
};
