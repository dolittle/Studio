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
    applicationId: string;
    currentMicroservice: MicroserviceStore;
    // TODO: Refactor? This is the same as currentMicroservice.id?
    microserviceId: string;
};

export const SetupSection = ({ application, applicationId, currentMicroservice, microserviceId }: SetupSectionProps) => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const microserviceInfo = currentMicroservice.edit?.extra;
    // TODO ENV: Not sure that I can use currentMicroservice.environment here?
    const environmentInfo = application.environments.find(env => env.name === currentMicroservice.environment)!;
    const canDelete = canDeleteMicroservice(application.environments, currentMicroservice.environment, microserviceId);

    const currentRuntimeImageNumber = {
        value: microserviceInfo?.runtimeImage,
        displayValue: getRuntimeNumberFromString(microserviceInfo?.runtimeImage)
    };

    const hasPublicUrl = microserviceInfo?.isPublic || false;
    const hasM3ConnectorOption = environmentInfo?.connections?.m3Connector || false;
    // Remove extra slash from ingress path as it is there already with startAdornment.
    const cleanedIngressPath = microserviceInfo?.ingress?.path?.replace(/\//, '') || '';
    // Convert the head arguments to the format that the form expects.
    const headArgumentValues = microserviceInfo?.headCommand?.args?.map((arg: string) => ({ value: arg })) || [];

    const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false);
    const [restartDialogIsOpen, setRestartDialogIsOpen] = useState(false);
    const [formIsNotEditable, setFormIsNotEditable] = useState(true);

    const handleMicroserviceDelete = async () => {
        if (!canDelete) {
            enqueueSnackbar('Deleting microservice is disabled.', { variant: 'error' });
            return;
        }

        const success = await deleteMicroservice(applicationId, currentMicroservice.environment, microserviceId);

        if (!success) {
            enqueueSnackbar(`Failed to delete microservice '${currentMicroservice.name}'.`, { variant: 'error' });
            return;
        }

        enqueueSnackbar(`Microservice '${currentMicroservice.name}' has been deleted.`);
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
                environment={currentMicroservice.environment}
                microserviceId={microserviceId}
                msName={currentMicroservice.name}
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
                        microserviceName: currentMicroservice.name,
                        developmentEnvironment: currentMicroservice.environment,
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
                    <SetupFields hasDashedBorder isDisabled={formIsNotEditable} />

                    <ContainerImageFields hasDashedBorder isDisabled={formIsNotEditable} />

                    <PublicUrlFields hasDashedBorder hasPublicUrl={hasPublicUrl} isDisabled={formIsNotEditable} />

                    {hasM3ConnectorOption && <HasM3ConnectorField isDisabled={formIsNotEditable} />}
                </Form>
            </Accordion>
        </>
    );
};
