// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useCallback, useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SnackbarProvider, useSnackbar } from 'notistack';

import { Slide, SlideProps } from '@mui/material';
import { ErrorRounded } from '@mui/icons-material';

import { Button, IconButton } from '@dolittle/design-system';
import { Snackbar as CustomSnackbar } from './Snackbar';

function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction='up' />;
};

export default {
    title: 'Snackbar',
    component: SnackbarProvider,
    argTypes: {
        children: {
            table: {
                disable: true
            }
        },
        variant: {
            control: {
                type: 'select',
                options: ['default', 'success', 'error', 'warning', 'info']
            }
        },
        anchorOrigin: {
            table: {
                disable: true
            }
        },
        TransitionComponent: {
            table: {
                disable: true
            }
        },
        Components: {
            table: {
                disable: true
            }
        },
        iconVariant: {
            table: {
                disable: true
            }
        }
    }
} as ComponentMeta<typeof SnackbarProvider>;

const Template: ComponentStory<typeof SnackbarProvider> = (args) => {
    return <SnackbarProvider {...args}></SnackbarProvider>;
};

export const Snackbars = Template.bind({});

const Snackbar = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [count, setCount] = useState(0);

    const buttonClicked = useCallback(() => {
        setCount(state => state + 1);

        enqueueSnackbar(`Snackbar ${count}`, {
            action: (key) => (
                <>
                    <Button label='Undo' color='subtle' onClick={() =>
                        enqueueSnackbar(`Snackbar with action buttons -  ${count} - Undone.`)
                    } />

                    <IconButton tooltipText='Dismiss snackbar' onClick={() => {
                        enqueueSnackbar(`Snackbar with action buttons -  ${count} - Dismissed.`);
                        closeSnackbar(key);
                    }} />
                </>
            )
        });
    }, [count]);

    return <Button label='Open snackbars' onClick={buttonClicked} />;
};

Snackbars.args = {
    children: <Snackbar />,
    variant: 'default',
    anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
    TransitionComponent: SlideTransition,
    Components: {
        error: CustomSnackbar,
        warning: CustomSnackbar,
        info: CustomSnackbar,
        success: CustomSnackbar
    },
    iconVariant: {
        error: <ErrorRounded fontSize='small' sx={{ mr: 1 }} />,
        warning: null,
        info: null,
        success: null,
        default: null
    },
    maxSnack: 6,
    autoHideDuration: 4000
};
