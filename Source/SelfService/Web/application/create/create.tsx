// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { Box, Button, Typography } from '@mui/material';

import { Guid } from '@dolittle/rudiments';
import { Checkbox, Form, Input } from '@dolittle/design-system/atoms/Forms';
import { AlertBox } from '@dolittle/design-system/atoms/AlertBox/AlertBox';
import { LoadingSpinner } from '@dolittle/design-system/atoms/LoadingSpinner/LoadingSpinner';

import { createApplication, HttpApplicationRequest } from '../../api/application';

const styles = {
    title: {
        letterSpacing: '-0.5px',
        lineHeight: '26px',
        mb: 11
    },
    secondaryTitle: {
        textAlign: 'start',
        mb: 4
    },
    formFieldsWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: {
            xs: 'column',
            sm: 'row'
        }
    },
    actionButtons: {
        color: 'text.primary',
        fontSize: '0.875rem',
        letterSpacing: '0.06em'
    },
};

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const alphaCharsRegex = /[a-z0-9]$/i;

type CreateApplicationParameters = {
    name: string;
    contact: {
        name: string;
        email: string;
    };
    environments: {
        Dev: boolean;
        Test: boolean;
        Prod: boolean;
    }
};

export const Create = () => {
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();

    const [serverError, setServerError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleCancel = () => {
        const href = `/applications`;
        history.push(href);
    };

    const handleApplicationCreate = async (form: CreateApplicationParameters) => {
        setLoading(true);

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
            console.log('Created app', request);
            const href = `/application/building/${request.id}`;
            history.push(href);

            setLoading(false);
            setServerError(false);
            enqueueSnackbar('Application created', { variant: 'info' });
        } catch (error) {
            setLoading(false);
            setServerError(true);
        }
    };

    const ActionButtons = () =>
        <Box>
            <Button variant='text'
                sx={{ ...styles.actionButtons, mr: 8 }}
                onClick={handleCancel}
            >
                Cancel
            </Button>

            <Button variant='text'
                sx={{ ...styles.actionButtons, color: 'primary.main' }}
                type='submit'
            >
                Create
            </Button>
        </Box>;

    return (
        <>
            <Typography variant='h2' sx={styles.title}>Create New Application</Typography>

            <Form<CreateApplicationParameters>
                initialValues={{
                    name: '',
                    contact: {
                        name: '',
                        email: '',
                    },
                    environments: {
                        Dev: false,
                        Test: false,
                        Prod: true,
                    }
                }}
                onSubmit={handleApplicationCreate}
            >
                <Typography variant='body1' sx={styles.secondaryTitle}>Please provide the following information</Typography>

                <Input
                    id='name'
                    label='Application Name'
                    required='Application name required.'
                    pattern={{
                        value: alphaCharsRegex,
                        message: 'Name can only contain alphanumeric characters.'
                    }}
                    sx={{ display: 'flex' }}
                />

                <Box sx={{ ...styles.formFieldsWrapper, mt: { sm: 3.5 } }}>
                    <Input
                        id='contact.name'
                        label='Contact Name'
                        required='Contact name required.'
                    />
                    <Input
                        id='contact.email'
                        label='Contact Email'
                        required='Contact email address required.'
                        pattern={{
                            value: emailRegex,
                            message: 'Please enter a valid email address.'
                        }}
                    />
                </Box>

                <Typography variant='body1' sx={{ mt: 4, ...styles.secondaryTitle }}>Select Environments</Typography>

                <Box sx={{ ...styles.formFieldsWrapper, mb: 7.5 }}>
                    <Checkbox
                        id='environments.Prod'
                        label='Production *'
                        disabled
                    />
                    <Checkbox
                        id='environments.Dev'
                        label='Development'
                    />
                    <Checkbox
                        id='environments.Test'
                        label='Test'
                    />
                </Box>

                {loading ? <LoadingSpinner /> : <ActionButtons />}

                {serverError &&
                    <AlertBox
                        title='Oops, something went wrong'
                        message='Please try again later. If problem persists, please'
                        severity='error'
                        link={{
                            href: 'mailto: support@dolittle.com',
                            text: 'contact support'
                        }}
                        sx={{ mt: 6 }}
                    />
                }
            </Form>
        </>
    );
};
