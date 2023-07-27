// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { useSnackbar } from 'notistack';
import { useGlobalContext } from '../context/globalContext';

import { Guid } from '@dolittle/rudiments';

import { Stack, Typography } from '@mui/material';

import { DialogForm, Checkbox, Input } from '@dolittle/design-system';

import { createApplication, HttpApplicationRequest } from '../apis/solutions/application';

import { alphaNumericLowerCasedCharsRegex } from '../utils/helpers/regex';

// Remove click events from the form controls and enable them for the checkboxes.
// TODO: Maybe we should move this to the design system?
const styles = {
    '& .MuiFormControl-root': { pointerEvents: 'none' },
    '& .MuiCheckbox-root': { pointerEvents: 'auto' },
};

type SpaceCreateParameters = {
    name: string;
    environments: {
        Dev: boolean;
        Test: boolean;
        Prod: boolean;
    };
};

export type SpaceCreateDialogProps = {
    /**
     * Whether or not the dialog is open.
     */
    isOpen: boolean;

    /**
     * Callback for when the dialog is closed.
     */
    onClose: () => void;
};

export const SpaceCreateDialog = ({ isOpen, onClose }: SpaceCreateDialogProps) => {
    const { enqueueSnackbar } = useSnackbar();
    const { setCurrentApplicationId } = useGlobalContext();

    const [isLoading, setIsLoading] = useState(false);

    const handleSpaceCreate = async (form: SpaceCreateParameters) => {
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
            enqueueSnackbar('Failed to create new space. Please try again.', { variant: 'error' });
        } finally {
            onClose();
            setIsLoading(false);
        }
    };

    return (
        <DialogForm
            id='create-space'
            isOpen={isOpen}
            isLoading={isLoading}
            title='Create new Space'
            formInitialValues={{
                name: '',
                environments: {
                    Dev: false,
                    Test: false,
                    Prod: true,
                }
            } as SpaceCreateParameters}
            confirmBtnText='Create'
            onCancel={onClose}
            onConfirm={handleSpaceCreate}
        >
            <Typography variant='body1' sx={{ my: 2 }}>Provide a name for your new space.</Typography>
            <Input
                id='name'
                label='Space Name'
                required='Space name required.'
                autoFocus
                pattern={{
                    value: alphaNumericLowerCasedCharsRegex,
                    message: 'Name can only contain lowercase alphanumeric characters.'
                }}
            />

            <Typography variant='body1' sx={{ mt: 4 }}>
                Select the environments you would like available in your new space.
            </Typography>
            <Stack sx={styles}>
                <Checkbox id='environments.Dev' label='Development' />
                <Checkbox id='environments.Test' label='Test' />
                <Checkbox id='environments.Prod' label='Production *' disabled />
            </Stack>
        </DialogForm>
    );
};
