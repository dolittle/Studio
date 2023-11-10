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
    text: string;

    /**
     * The message to show in the snackbar.
     */
    message: string;

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
export const CopyIconButton = ({ text, message, tooltipText }: CopyIconButtonProps) => {
    const { enqueueSnackbar } = useSnackbar();

    const handleImageCopy = () => {
        navigator.clipboard.writeText(text);
        enqueueSnackbar(message);
    };

    return (
        <IconButton tooltipText={tooltipText} icon='CopyAllRounded' onClick={handleImageCopy} />
    );
};
