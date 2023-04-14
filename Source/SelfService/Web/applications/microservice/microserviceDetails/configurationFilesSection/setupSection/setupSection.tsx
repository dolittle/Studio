// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSnackbar } from 'notistack';

import { Accordion, AlertDialog, Form } from '@dolittle/design-system';

import { canDeleteMicroservice, deleteMicroservice, MicroserviceStore } from '../../../../stores/microservice';

import { HttpResponseApplication } from '../../../../../apis/solutions/application';
import { MicroserviceFormParameters } from '../../../../../apis/solutions/index';

import { HasM3ConnectorField } from '../../../components/form/hasM3ConnectorField';
import { RestartMicroserviceDialog } from '../../../components/restartMicroserviceDialog';
import { HeaderButtons } from './headerButtons';
import { SetupFields } from './setupFields';
import { ContainerImageFields } from './containerImageFields';
import { PublicUrlFields } from './publicUrlFields';
import { getRuntimeNumberFromString } from '../../../../../utils/helpers';

const styles = {
    form: {
        '& .MuiFormControl-root': { my: 1 },
    },
    formSections: {
        'mb': 4,
        'display': 'flex',
        'flexDirection': 'column',
        '&:last-child': { mb: 0 },
    },
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
    const navigate = useNavigate();

    const microserviceInfo = currentMicroservice.edit?.extra;
    const environmentInfo = application.environments.find(env => env.name === environment)!;
    const canDelete = canDeleteMicroservice(application.environments, environment, microserviceId);

    const currentRuntimeImageNumber = {
        value: microserviceInfo?.runtimeImage,
        displayValue: getRuntimeNumberFromString(microserviceInfo?.runtimeImage)
    };
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
                environment={environment}
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
                        developmentEnvironment: environment,
                        runtimeVersion: currentRuntimeImageNumber.value,
                        headImage: microserviceInfo?.headImage,
                        headPort: microserviceInfo?.headPort,
                        entrypoint: '',
                        isPublic: showPublicUrlInfo,
                        headArguments: headArgumentValues,
                        ingressPath: cleanedIngressPath,
                        hasM3Connector: hasM3ConnectorOption
                    }}
                    sx={styles.form}
                >
                    <SetupFields disabled={formIsNotEditable} options={[currentRuntimeImageNumber]} sx={styles.formSections} />

                    <ContainerImageFields disabled={formIsNotEditable} sx={styles.formSections} />

                    <PublicUrlFields
                        disabled={formIsNotEditable}
                        showPublicUrlInfo={showPublicUrlInfo}
                        onChange={() => !setShowPublicUrlInfo}
                        sx={styles.formSections}
                    />

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
        </>
    );
};
