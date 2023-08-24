// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

import { Accordion, AlertDialog, Form } from '@dolittle/design-system';

import { canDeleteMicroservice, deleteMicroservice, MicroserviceStore } from '../../../../stores/microservice';

import { HttpResponseApplication } from '../../../../../apis/solutions/application';
import { MicroserviceFormParameters } from '../../../../../apis/solutions/index';

import { ContainerImageFields } from '../../../components/form/containerImageFields';
import { HasM3ConnectorField } from '../../../components/form/hasM3ConnectorField';
import { PublicUrlFields } from '../../../components/form/publicUrlFields';
import { RestartMicroserviceDialog } from '../../../components/restartMicroserviceDialog';
import { SetupFields } from '../../../components/form/setupFields';

import { HeaderButtons } from './headerButtons';
import { getRuntimeNumberFromString } from '../../../../../utils/helpers';

export type SetupSectionProps = {
    application: HttpResponseApplication;
    currentMicroservice: MicroserviceStore;
};

export const SetupSection = ({ application, currentMicroservice }: SetupSectionProps) => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false);
    const [restartDialogIsOpen, setRestartDialogIsOpen] = useState(false);
    const [formIsNotEditable, setFormIsNotEditable] = useState(true);

    const applicationId = application.id;
    const microserviceId = currentMicroservice.id;
    const microserviceEnvironment = currentMicroservice.environment;
    const microserviceName = currentMicroservice.name;
    const microserviceInfo = currentMicroservice.edit?.extra;
    const canDelete = canDeleteMicroservice(application.environments, microserviceEnvironment, microserviceId);

    const currentRuntimeImageNumber = {
        value: microserviceInfo?.runtimeImage,
        displayValue: getRuntimeNumberFromString(microserviceInfo?.runtimeImage)
    };

    const availableEnvironments = application.environments.map(env => env.name);
    const hasPublicUrl = microserviceInfo?.isPublic || false;
    const hasM3ConnectorOption = application.environments.find(env => env.name === microserviceEnvironment)?.connections?.m3Connector || false;
    // Remove extra slash from ingress path as it is there already with startAdornment.
    const cleanedIngressPath = microserviceInfo?.ingress?.path?.replace(/\//, '') || '';
    // Convert the head arguments to the format that the form expects.
    const headArgumentValues = microserviceInfo?.headCommand?.args?.map((arg: string) => ({ value: arg })) || [];

    const handleMicroserviceDelete = async () => {
        if (!canDelete) {
            enqueueSnackbar('Deleting microservice is disabled.', { variant: 'error' });
            return;
        }

        const success = await deleteMicroservice(applicationId, microserviceEnvironment, microserviceId);

        if (!success) {
            enqueueSnackbar(`Failed to delete microservice '${microserviceName}'.`, { variant: 'error' });
            return;
        }

        enqueueSnackbar(`Microservice '${microserviceName}' has been deleted.`);
        const href = `/microservices/application/${applicationId}/overview`;
        navigate(href);
    };

    return (
        <>
            <AlertDialog
                id='delete-microservice'
                title='Delete microservice?'
                description='This action cannot be undone. Click delete if you would like to delete the mircroservice.'
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

            <Accordion id='setup-accordion' title='Configuration Setup' defaultExpanded>
                <HeaderButtons
                    handleRestartDialog={() => setRestartDialogIsOpen(true)}
                    handleDeleteDialog={() => setDeleteDialogIsOpen(true)}
                    disabled={formIsNotEditable}
                />

                <Form<MicroserviceFormParameters>
                    initialValues={{
                        microserviceName,
                        developmentEnvironment: microserviceEnvironment,
                        runtimeVersion: currentRuntimeImageNumber.value,
                        headImage: microserviceInfo?.headImage,
                        headPort: microserviceInfo?.headPort,
                        entrypoint: '',
                        isPublic: microserviceInfo?.isPublic,
                        headArguments: headArgumentValues,
                        ingressPath: cleanedIngressPath,
                        hasM3Connector: hasM3ConnectorOption,
                    }}
                    sx={{ '& .MuiFormControl-root': { my: 1 } }}
                >
                    <SetupFields environments={availableEnvironments} hasDashedBorder isDisabled={formIsNotEditable} />
                    <ContainerImageFields hasDashedBorder isDisabled={formIsNotEditable} />
                    <PublicUrlFields hasDashedBorder hasPublicUrl={hasPublicUrl} isDisabled={formIsNotEditable} />

                    {hasM3ConnectorOption && <HasM3ConnectorField isDisabled={formIsNotEditable} />}
                </Form>
            </Accordion>
        </>
    );
};
