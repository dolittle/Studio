// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Collapse } from '@mui/material';

import { AlertBox } from '@dolittle/design-system/atoms/AlertBox/AlertBox';

type RestartInfoBoxProps = {
    name: string;
    isAlertBoxOpen: boolean;
    handleDismiss: () => void;
};

export const RestartInfoBox = ({ name, isAlertBoxOpen, handleDismiss }: RestartInfoBoxProps) =>
    <Collapse in={isAlertBoxOpen}>
        <AlertBox
            severity='info'
            title='Restart Microservice'
            message={
                `New uploads will be added as soon as microservice '${name}' restarts.
                It will restart automatically in a few minutes or you can manually restart it now.`
            }
            isDismissable
            onDismiss={handleDismiss}
            sx={{ width: 1, mb: 2 }}
        />
    </Collapse>;
