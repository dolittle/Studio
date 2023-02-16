// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { Alert, AlertColor } from '@mui/material';

import { useGlobalContext } from '../context/globalContext';

export const AlertBox: React.FunctionComponent = () => {
    const { lastMessage, clearNotification } = useGlobalContext();
    const severity = lastMessage.level as AlertColor;
    const dismiss = () => {
        window.clearTimeout(timer);
        clearNotification();
    };

    if (lastMessage.message === '') {
        return null;
    }

    const timer = window.setTimeout(() => dismiss(), 3000);

    return (
        <Alert severity={severity} onClose={() => dismiss()}>{lastMessage.message}</Alert>
    );
};
