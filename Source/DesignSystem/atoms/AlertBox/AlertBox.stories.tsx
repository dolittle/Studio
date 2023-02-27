// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { componentStories, AlertBox } from '@dolittle/design-system';

import { alertBoxDescription, AlertBoxErrorTitle, AlertBoxErrorMessage, AlertBoxInfoMessage } from './helpers';

const { metadata, createStory } = componentStories(AlertBox);

metadata.title = 'Alert Box';
metadata.parameters = {
    docs: {
        description: { component: alertBoxDescription },
    },
};

metadata.argTypes = {
    message: {
        options: ['string', 'AlertBoxErrorMessage', 'AlertBoxInfoMessage'],
        mapping: {
            string: 'This can be your custom alert message.',
            AlertBoxErrorMessage: <AlertBoxErrorMessage />,
            AlertBoxInfoMessage: <AlertBoxInfoMessage />,
        },
        table: {
            type: { summary: 'string | ReactElement' },
        },
    },
    sx: {
        control: false,
        table: {
            type: { summary: 'SxProps' },
        },
    },
};

metadata.args = {
    severity: 'error',
    title: AlertBoxErrorTitle,
    message: 'AlertBoxErrorMessage',
    isDismissible: false,
    isOpen: true,
};

export default metadata;

export const Default = createStory();

export const DismissableAlert = createStory({
    severity: 'info',
    title: 'This is an alert box that can be dismissed',
    message: 'Click the `X` icon to dismiss the alert.',
    isDismissible: true,
});
