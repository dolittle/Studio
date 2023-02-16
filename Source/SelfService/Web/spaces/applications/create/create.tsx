// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Typography } from '@mui/material';

import { Guid } from '@dolittle/rudiments';
import { AlertBox, AlertBoxErrorMessage, Form, LoadingSpinner } from '@dolittle/design-system';

import { createApplication, HttpApplicationRequest } from '../../../api/application';

import { InputFields } from './inputField';
import { CheckBoxesField } from './checkBoxField';
import { ActionButtons } from './actionButtons';

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
    };
};

export const Create = () => {
    const navigate = useNavigate();

    const [errorOnCreatingApp, setErrorOnCreatingApp] = useState(false);
    const [loading, setLoading] = useState(false);

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
            const href = `/application/building/${request.id}`;
            navigate(href);

            setLoading(false);
            setErrorOnCreatingApp(false);
        } catch (error) {
            setLoading(false);
            setErrorOnCreatingApp(true);
        }
    };

    return (
        <>
            <Typography variant='h2' sx={{ mb: 11 }}>Create New Application</Typography>

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
                <Typography variant='body1' sx={{ textAlign: 'start', mb: 4 }}>Please provide the following information</Typography>
                <InputFields nameId='name' contactId='contact.name' emailId='contact.email' />

                <Typography variant='body1' sx={{ textAlign: 'start', mt: 4 }}>Select Environments</Typography>
                <CheckBoxesField devId='environments.Dev' testId='environments.Test' prodId='environments.Prod' />

                {loading ? <LoadingSpinner /> : <ActionButtons />}

                {errorOnCreatingApp &&
                    <AlertBox
                        title='Oops, something went wrong'
                        message={<AlertBoxErrorMessage />}
                        sx={{ mt: 6 }}
                    />
                }
            </Form>
        </>
    );
};
