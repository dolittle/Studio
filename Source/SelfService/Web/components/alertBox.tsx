// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { Alert, Color } from '@material-ui/lab';

import { useTheme } from '../stores/notifications';

export const AlertBox: React.FunctionComponent = () => {
    const { lastMessage, clearNotification } = useTheme();
    const severity = lastMessage.level as Color;
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
