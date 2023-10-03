// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

import { Box } from '@mui/material';

import { AlertDialog, Button, Form, LoadingSpinnerFullPage } from '@dolittle/design-system';

import { canDeleteMicroservice, deleteMicroserviceWithStore, editMicroserviceWithStore, MicroserviceStore } from '../../../../stores/microservice';

import { HttpResponseApplication } from '../../../../../apis/solutions/application';
import { InputEditMicroservice } from '../../../../../apis/solutions/api';
import { MicroserviceFormParameters } from '../../../../../apis/solutions/index';

import { ContainerImageFields } from '../../../components/form/containerImageFields';
import { HasM3ConnectorField } from '../../../components/form/hasM3ConnectorField';
import { PublicUrlFields } from '../../../components/form/publicUrlFields';
import { RestartMicroserviceDialog } from '../../../components/restartMicroserviceDialog';
import { SetupFields } from '../../../components/form/setupFields';

import { getMicroserviceInfo } from '../../../utils/getMicroserviceInfo';

export type ConfigurationsIndexProps = {
    application: HttpResponseApplication;
    currentMicroservice: MicroserviceStore;
};

export const ConfigurationsIndex = ({ application, currentMicroservice }: ConfigurationsIndexProps) => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false);
    const [restartDialogIsOpen, setRestartDialogIsOpen] = useState(false);
    const [editMicroserviceMode, setEditMicroserviceMode] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const applicationId = application.id;
    const microserviceId = currentMicroservice.id;
    const microserviceEnvironment = currentMicroservice.environment;
    const microserviceName = currentMicroservice.name;
    const microserviceInfo = getMicroserviceInfo(application, currentMicroservice);
    const { runtimeImage, isPublic, ingress, headCommand, headImage, headPort } = microserviceInfo.extra;

    const canDelete = canDeleteMicroservice(application.environments, microserviceEnvironment, microserviceId);
    const availableEnvironments = application.environments.map(env => env.name);

    const hasPublicUrl = isPublic || false;
    const hasM3ConnectorOption = application.environments.find(env => env.name === microserviceEnvironment)?.connections?.m3Connector || false;
    // Remove extra slash from ingress path as it is there already with startAdornment.
    const cleanedIngressPath = ingress?.path?.replace(/\//, '') || '';
    // Convert the head arguments to the format that the form expects.
    const headArgumentValues = headCommand?.args?.map((arg: string) => ({ value: arg })) || [];

    const handleMicroserviceEdit = async ({ microserviceName, headImage, runtimeVersion }: MicroserviceFormParameters) => {
        if (microserviceName === currentMicroservice.name && headImage === headImage && runtimeVersion === runtimeImage) {
            return;
        }

        setEditMicroserviceMode(false);
        setIsLoading(true);

        const editedMicroservice: InputEditMicroservice = {
            displayName: microserviceName,
            headImage,
            runtimeImage: runtimeVersion,
        };

        const response = await editMicroserviceWithStore(applicationId, microserviceEnvironment, microserviceId, editedMicroservice);

        if (response) {
            enqueueSnackbar(`Microservice '${microserviceName}' has been updated.`);
        } else {
            enqueueSnackbar(`Failed to update microservice '${microserviceName}'.`, { variant: 'error' });
        }

        setIsLoading(false);
    };

    const handleMicroserviceDelete = async () => {
        if (!canDelete) {
            enqueueSnackbar('Deleting microservice is disabled.', { variant: 'error' });
            return;
        }

        setIsLoading(true);
        setDeleteDialogIsOpen(false);

        const result = await deleteMicroserviceWithStore(applicationId, microserviceEnvironment, microserviceId);

        if (result) {
            enqueueSnackbar(`Microservice '${microserviceName}' has been deleted.`);
            const href = `/microservices/application/${applicationId}/overview`;
            navigate(href);
        } else {
            enqueueSnackbar(`Failed to delete microservice '${microserviceName}'.`, { variant: 'error' });
        }

        setIsLoading(false);
    };

    return (
        <>
            {isLoading && <LoadingSpinnerFullPage />}

            <AlertDialog
                id='delete-microservice'
                title='Delete microservice?'
                description='This action cannot be undone. Click delete if you would like to delete the microservice.'
                confirmBtnColor='error'
                confirmBtnText='Delete'
                isOpen={deleteDialogIsOpen}
                onCancel={() => setDeleteDialogIsOpen(false)}
                onConfirm={handleMicroserviceDelete}
            />

            <RestartMicroserviceDialog
                applicationId={applicationId}
                environment={microserviceEnvironment}
                microserviceId={microserviceId}
                msName={microserviceName}
                open={restartDialogIsOpen}
                setOpen={setRestartDialogIsOpen}
                handleSuccess={() => window.location.reload()}
            />

            <Form<MicroserviceFormParameters>
                initialValues={{
                    microserviceName,
                    developmentEnvironment: microserviceEnvironment,
                    runtimeVersion: runtimeImage,
                    headImage,
                    headPort,
                    entrypoint: '',
                    isPublic: hasPublicUrl,
                    headArguments: headArgumentValues,
                    ingressPath: cleanedIngressPath,
                    hasM3Connector: hasM3ConnectorOption,
                }}
                onSubmit={handleMicroserviceEdit}
                sx={{ 'ml': 2, '& .MuiFormControl-root': { my: 1 } }}
            >
                <Box sx={{ 'mb': 3, '& button': { 'mr': 2, ':last-of-type': { mr: 0 } } }}>
                    <Button label='edit' disabled={editMicroserviceMode} startWithIcon='EditRounded' onClick={() => setEditMicroserviceMode(true)} />
                    <Button label='save' type='submit' disabled={!editMicroserviceMode} startWithIcon='SaveRounded' />
                    <Button label='Restart Microservice' startWithIcon='RestartAltRounded' onClick={() => setRestartDialogIsOpen(true)} />
                    <Button label='Delete Microservice' startWithIcon='DeleteRounded' onClick={() => setDeleteDialogIsOpen(true)} />
                </Box>

                <SetupFields environments={availableEnvironments} hasDashedBorder isEditMode={!editMicroserviceMode} isDisabled />
                <ContainerImageFields hasDashedBorder isEditMode={!editMicroserviceMode} isDisabled />
                <PublicUrlFields hasDashedBorder hasPublicUrl={hasPublicUrl} isDisabled />
                {hasM3ConnectorOption && <HasM3ConnectorField isDisabled />}
            </Form>
        </>
    );
};
