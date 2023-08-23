// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Alert, AlertColor } from '@mui/material';

import { useGlobalContext } from '../context/globalContext';

/**
 * Represents an alert box.
 * @returns custom alert box that takes error messages from the global context.
 *
 * Not in use currently, but kept for reference.
 */
export const AlertBox = () => {
    const { lastMessage, clearNotification } = useGlobalContext();

    const severity = lastMessage.level as AlertColor;

    const dismiss = () => {
        window.clearTimeout(timer);
        clearNotification();
    };

    if (lastMessage.message === '') return null;

    const timer = window.setTimeout(() => dismiss(), 3000);

    return (
        <Alert severity={severity} onClose={() => dismiss()}>{lastMessage.message}</Alert>
    );
};
