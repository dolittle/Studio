// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { ChangeEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';

import { Guid } from '@dolittle/rudiments';
import { themeDark } from '@dolittle/design-system';

import { createApplication, HttpApplicationRequest, HttpApplicationEnvironment } from '../../api/application';
import { ShortInfo } from '../../api/api';
import { checkTenantIdValidity } from '../../utils/tenantValidation';
import { validateTextFields, FormErrorStates } from '../../utils/formTextFieldsValidation';

import { Box, Typography } from '@mui/material';

import { Notification } from '../../theme/Notification';
import { CreateFormCheckbox } from './createFormCheckbox';
import { CreateFormTextFields } from './createFormTextFields';
import { CreateFormActionButtons } from './createFormActionButtons';

const styles = {
    title: {
        letterSpacing: '-0.5px',
        lineHeight: '26px',
    },
    secondaryTitle: {
        textAlign: 'start',
    },
    formFieldsWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        [themeDark.breakpoints.down('sm')]: {
            flexDirection: 'column',
            margin: '0',
        }
    },
};

export type EnvironmentsProps = {
    name: string;
    shortName: string;
    checked: boolean;
    disabled: boolean;
    customerTenants: string[];
}[];

const initialErrorState = {
    applicationNameError: {
        appErrorMessage: '',
        appError: false
    },
    contactNameError: {
        nameErrorMessage: '',
        nameError: false
    },
    contactEmailError: {
        emailErrorMessage: '',
        emailError: false
    },
};

const initialEnvironmentState = [
    {
        name: 'Production*',
        shortName: 'Prod',
        checked: true,
        disabled: true,
        customerTenants: [Guid.create().toString()] as string[]
    },
    {
        name: 'Development',
        shortName: 'Dev',
        checked: false,
        disabled: false,
        customerTenants: [Guid.create().toString()] as string[]
    },
    {
        name: 'Test',
        shortName: 'Test',
        checked: false,
        disabled: false,
        customerTenants: [Guid.create().toString()] as string[]
    },
];

export const Create: React.FC = () => {
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const newApplicationId = Guid.create().toString();

    const [application, setApplication] = useState({
        id: newApplicationId,
        name: '',
    } as ShortInfo);
    const [environments, setEnvironments] = useState<EnvironmentsProps>(initialEnvironmentState);
    const [contactName, setContactName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [formError, setFormError] = useState<FormErrorStates>(initialErrorState);
    const [serverError, setServerError] = useState<boolean>(false);

    const handleApplicationNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const _application = { ...application };
        _application.name = event.target.value!;
        setFormError({ ...formError, applicationNameError: { appErrorMessage: '', appError: false } });
        setApplication(_application);
    };

    const handleContactNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const _name = event.target.value!;
        setFormError({ ...formError, contactNameError: { nameErrorMessage: '', nameError: false } });
        setContactName(_name);
    };

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        const _name = event.target.value!;
        setFormError({ ...formError, contactEmailError: { emailErrorMessage: '', emailError: false } });
        setContactEmail(_name);
    };

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>, index: number): void => {
        const newEnvironments = [...environments];
        newEnvironments[index].checked = event.target.checked;
        setEnvironments(newEnvironments);
        checkTenantIdValidity(environments);
    };

    const handleApplicationCreate = async () => {
        const isValid = validateTextFields(formError, setFormError, application, contactName, contactEmail);

        if (isValid) {
            const input: HttpApplicationRequest = {
                id: application.id,
                name: application.name,
                environments: environments
                    .filter(e => e.checked)
                    .map(e => ({
                        name: e.shortName,
                        customerTenants: e.customerTenants.map(t => ({ id: t }))
                    } as HttpApplicationEnvironment)),
            };
            try {
                await createApplication(input);
                const href = `/application/building/${application.id}`;
                history.push(href);
                setServerError(false);
                enqueueSnackbar('Application created', { variant: 'info' });
            } catch (error) {
                setServerError(true);
            }

            return;
        }

        return;
    };

    const errorMessage = 'Oops, something went wrong';

    const { title, secondaryTitle } = styles;
    return (
        <>
            <Typography variant='h2' mb={11} sx={title}>Create New Application</Typography>

            <Box component="form">
                <Typography variant='body1' mb={4} sx={secondaryTitle}>Please provide the following information</Typography>

                <CreateFormTextFields
                    formError={formError}
                    app={application}
                    onAppChange={handleApplicationNameChange}
                    contactName={contactName}
                    onNameChange={handleContactNameChange}
                    contactEmail={contactEmail}
                    onEmailChange={handleEmailChange} />

                <Typography variant='body1' mt={4} mb={4} sx={secondaryTitle}>Select Environments</Typography>

                <CreateFormCheckbox environments={environments} handleOnChange={handleCheckboxChange} />

                <CreateFormActionButtons handleOnSubmit={handleApplicationCreate} />

                {serverError && <Notification title={errorMessage} sx={{ mt: 6 }} />}
            </Box>
        </>
    );
};
