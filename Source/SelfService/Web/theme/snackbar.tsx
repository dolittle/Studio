// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Button } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { Fragment } from 'react';

const { enqueueSnackbar, closeSnackbar } = useSnackbar();

export const useEnqueueSnackbar = (message: string, options?: object) => {

    const action = key => (
        <Fragment>
            <Button onClick={() => { alert(`I belong to snackbar with key ${key}`); }}>
                'Alert'
            </Button>
            <Button onClick={() => { closeSnackbar(key) }}>
                'Dismiss'
            </Button>
        </Fragment>
    );

    enqueueSnackbar(message, {
        action,
        ...options
    });
};
