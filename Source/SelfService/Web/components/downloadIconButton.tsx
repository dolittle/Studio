// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useSnackbar } from 'notistack';

import { IconButton, IconButtonProps } from '@dolittle/design-system';

export type DownloadIconButtonProps = {
    tooltipText: string;
    icon: IconButtonProps['icon'];
    snackbarMessage: string;
    onClick: any;
};

// Not in use!
export const DownloadIconButton = ({ tooltipText, icon, snackbarMessage, onClick }: DownloadIconButtonProps) => {
    const { enqueueSnackbar } = useSnackbar();

    const handleNotification = () => {
        enqueueSnackbar(snackbarMessage);
        onClick?.();
    };

    return (
        <IconButton
            tooltipText={tooltipText}
            icon={icon}
            onClick={handleNotification}
        />
    );
};
