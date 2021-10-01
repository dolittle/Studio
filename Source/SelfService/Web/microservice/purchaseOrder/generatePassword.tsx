// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React, { Dispatch, SetStateAction } from 'react';
import Button from '@material-ui/core/Button';
import { useSnackbar } from 'notistack';

import { generate } from 'generate-password-browser';


type Props = {
    isCreate: boolean;
    password: string;
    setPassword: (newValue: string) => void;
};

export const GeneratePassword: React.FunctionComponent<Props> = (props) => {
    const { enqueueSnackbar } = useSnackbar();
    const isCreate = props!.isCreate;
    const password = props!.password;
    const setPassword = props!.setPassword;
    // Using setPassword does not instantly update the password
    let _password = password;

    // https://app.asana.com/0/1200899594200551/1201018124798232/f
    const copyToClipboard = async () => {
        if (_password === '') {
            enqueueSnackbar('Password is empty, nothing to copy to clipboard.', { variant: 'error' });
            return;
        }

        try {
            await navigator.clipboard.writeText(`${_password}`);
            enqueueSnackbar('Password copied to clipboard.');
        } catch {
            enqueueSnackbar('Failed to copy password to clipboard.', { variant: 'error' });
        }
    };

    const generatePasswordAndCopyToClipboard = async () => {
        if (isCreate) {
            _password = generate({
                length: 10,
                numbers: true
            });

            setPassword(_password);
        }
        await copyToClipboard();
    };

    return (
        <>
            {isCreate
                ? <Button color='primary' onClick={generatePasswordAndCopyToClipboard}>GENERATE AND COPY TO CLIPBOARD</Button>
                : <Button color='primary' onClick={copyToClipboard}>COPY TO CLIPBOARD</Button>
            }
        </>
    );

    return (
        <>
            <Button color='primary' onClick={generatePasswordAndCopyToClipboard}>GENERATE AND COPY TO CLIPBOARD</Button>


            {!isCreate && (
                <Button color='primary' onClick={copyToClipboard}>(COPY TO CLIPBOARD)</Button>
            )}
        </>
    );
};
