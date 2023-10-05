// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { AlertBox, AlertBoxProps } from '@dolittle/design-system';

type RestartInfoBoxProps = Partial<AlertBoxProps> & {
    microserviceName: string;
};

export const RestartInfoBox = ({ microserviceName, ...alertBoxProps }: RestartInfoBoxProps) =>
    <AlertBox
        severity='info'
        title='Restart Microservice'
        message={
            `New uploads will be added as soon as microservice '${microserviceName}' restarts.
                It will restart automatically in a few minutes or you can manually restart it now.`
        }
        isDismissible
        sx={{ width: 1, mb: 2 }}
        {...alertBoxProps}
    />;
