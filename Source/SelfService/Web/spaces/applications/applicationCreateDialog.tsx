// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { useSnackbar } from 'notistack';
import { useGlobalContext } from '../../context/globalContext';

import { Guid } from '@dolittle/rudiments';

import { Stack, Typography } from '@mui/material';

import { Checkbox, DialogForm, FullPageLoadingSpinner, Input } from '@dolittle/design-system';

import { createApplication, HttpApplicationRequest, isApplicationOnline } from '../../apis/solutions/application';

import { alphaNumericLowerCasedCharsRegex } from '../../utils/helpers/regex';

type ApplicationCreateParameters = {
    name: string;
    environments: {
        Dev: boolean;
        Test: boolean;
        Prod: boolean;
    };
};

export type ApplicationCreateDialogProps = {
    /**
     * Whether or not the dialog is open.
     */
    isOpen: boolean;

    /**
     * Callback for when the dialog is closed.
     */
    onClose: () => void;
};

export const ApplicationCreateDialog = ({ isOpen, onClose }: ApplicationCreateDialogProps) => {
    const { enqueueSnackbar } = useSnackbar();
    const { setCurrentApplicationId } = useGlobalContext();

    const [isLoading, setIsLoading] = useState(false);

    const handleSpaceCreate = async (form: ApplicationCreateParameters) => {
        setIsLoading(true);

        const request: HttpApplicationRequest = {
            id: Guid.create().toString(),
            name: form.name,
            environments: [],
        };

        form.environments.Prod = true;
        for (const name in form.environments) {
            if (form.environments[name] !== true) continue;

            request.environments.push({
                name,
                customerTenants: [{
                    id: Guid.create().toString(),
                }],
            });
        }

        try {
            await createApplication(request);
            setCurrentApplicationId(request.id);
            enqueueSnackbar(`'${form.name}' successfully created.`);
        } catch (error) {
            enqueueSnackbar('Failed to create new application. Please try again.', { variant: 'error' });
        } finally {
            setIsLoading(false);
            onClose();
        }
    };

    return (
        <DialogForm
            id='create-application'
            isOpen={isOpen}
            title='Create new Application'
            formInitialValues={{
                name: '',
                environments: {
                    Dev: false,
                    Test: false,
                    Prod: true,
                }
            } as ApplicationCreateParameters}
            confirmBtnText='Create'
            onCancel={onClose}
            onConfirm={handleSpaceCreate}
        >
            {isLoading && <FullPageLoadingSpinner />}

            <Typography variant='body1' sx={{ my: 2 }}>Provide a name for your new application.</Typography>
            <Input
                id='name'
                label='Application name'
                required
                pattern={{
                    value: alphaNumericLowerCasedCharsRegex,
                    message: 'Name can only contain lowercase alphanumeric characters.'
                }}
            />

            <Typography variant='body1' sx={{ mt: 4 }}>
                Select the environments you would like available in your new application.
            </Typography>
            <Stack sx={{ '& .MuiFormControl-root': { display: 'inline' } }}>
                <Checkbox id='environments.Dev' label='Development' />
                <Checkbox id='environments.Test' label='Test' />
                <Checkbox id='environments.Prod' label='Production *' disabled />
            </Stack>
        </DialogForm>
    );
};
