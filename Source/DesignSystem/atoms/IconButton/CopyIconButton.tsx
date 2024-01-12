// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useSnackbar } from 'notistack';

import { IconButton } from '@dolittle/design-system';

/**
 * The props for a {@link CopyIconButton} component.
 */
export type CopyIconButtonProps = {
    /**
     * The text to copy to the clipboard.
     */
    textToCopy: string;

    /**
     * The message to show in the snackbar.
     */
    snackbarMessage: string;

    /**
     * The color of the icon.
     *
     * Most icons will use the default `inherit` color.
     * @default inherit
     */
    color?: 'inherit' | 'primary';

    /**
     * The tooltip text to show when hovering over the icon button.
     */
    tooltipText: string;
};

/**
 * The copy icon button component is a button that copies the text to the clipboard.
 * @param {CopyIconButtonProps} props - The {@link CopyIconButtonProps}.
 * @returns A {@link CopyIconButton} component.
 */
export const CopyIconButton = ({ textToCopy, snackbarMessage, color, tooltipText }: CopyIconButtonProps) => {
    const { enqueueSnackbar } = useSnackbar();

    const handleImageCopy = () => {
        navigator.clipboard.writeText(textToCopy);
        enqueueSnackbar(snackbarMessage);
    };

    return (
        <IconButton tooltipText={tooltipText} icon='CopyAllRounded' color={color ?? 'inherit'} onClick={handleImageCopy} />
    );
};
