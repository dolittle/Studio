// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useCallback, useState } from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SnackbarProvider, useSnackbar } from 'notistack';

import { IconButton, Slide, SlideProps } from '@mui/material';
import { CloseRounded, ErrorRounded } from '@mui/icons-material';

import { Button } from '@dolittle/design-system/atoms/Button';

import { Snackbar as CustomSnackbar } from './Snackbar';

function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction='up' />;
};

export default {
    title: 'Snackbar',
    component: SnackbarProvider,
} as ComponentMeta<typeof SnackbarProvider>;

const Template: ComponentStory<typeof SnackbarProvider> = (args) =>
    <SnackbarProvider
        {...args}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        TransitionComponent={SlideTransition}
        autoHideDuration={4000}
        maxSnack={6}
        Components={{
            error: CustomSnackbar
        }}
        iconVariant={{
            error: <ErrorRounded fontSize='small' sx={{ mr: 1 }} />
        }}
    >
    </SnackbarProvider>;


export const Default = Template.bind({});

const DefaultSnackbar = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [count, setCount] = useState(0);

    const handleOpen = useCallback(() => {
        setCount((count) => count + 1);

        enqueueSnackbar(`Default snackbar message -  ${count}.`);
    }, [count]);

    return <Button variant='text' label='Open default Snackbars' onClick={handleOpen} />
};

Default.args = {
    children: <DefaultSnackbar />
};


export const WithActionButtons = Template.bind({});

const WithActionButtonsSnackbar = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [count, setCount] = useState(0);

    const handleOpen = useCallback(() => {
        setCount((count) => count + 1);

        enqueueSnackbar(`Snackbar with action buttons -  ${count}.`, {
            action: (key) => (
                <>
                    <Button variant='text' label='Undo' color='secondary' onClick={() =>
                        enqueueSnackbar(`Snackbar with action buttons -  ${count} - Undone.`)
                    } />

                    <IconButton size='small' aria-label='close' color='inherit' onClick={() => {
                        enqueueSnackbar(`Snackbar with action buttons -  ${count} - Dismissed.`)
                        closeSnackbar(key)
                    }}>
                        <CloseRounded fontSize='small' />
                    </IconButton>
                </>
            )
        });
    }, [count]);

    return <Button variant='text' label='Open Snackbar with action buttons' onClick={handleOpen} />
};

WithActionButtons.args = {
    children: <WithActionButtonsSnackbar />
};


export const WithCustomError = Template.bind({});

const WithCustomSnackbar = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [count, setCount] = useState(0);

    const handleOpen = useCallback(() => {
        setCount((count) => count + 1);

        enqueueSnackbar(`Snackbar with custom error -  ${count}.`, {
            variant: 'error'
        });
    }, [count]);

    return <Button variant='text' label='Open Snackbar with custom error styles' onClick={handleOpen} />
};

WithCustomError.args = {
    children: <WithCustomSnackbar />
};
