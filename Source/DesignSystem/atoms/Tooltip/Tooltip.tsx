// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { ReactElement } from 'react';

import { SxProps, Tooltip as MuiTooltip, Typography } from '@mui/material';

/**
 * The props for a {@link Tooltip} component.
 */
type TooltipProps = {
    /**
     * Unique id to add every tooltip.
     */
    id: string;

    /**
     * You can use the open, onOpen and onClose props to control the behavior of the tooltip.
     *
     * This is useful when you want to implement a custom behavior.
     * You can use this with components that don't have a hover state, like a button.
     * @default false
     */
    open?: boolean;
    handleOpen?: () => void;
    handleClose?: () => void;

    /**
     * The tooltip title.
     */
    tooltipTitle: string;

    /**
     * The tooltip text.
     */
    tooltipText: string | React.ReactNode;

    /**
     * Tooltip won't show on hover.
     * @default true
     */
    disableHoverListener?: never;

    /**
     * Tooltip is placed on the right.
     * @default 'right'
     */
    placement?: never;

    /**
     * The sx prop lets you add custom styles to the component, overriding the styles defined by Material-UI.
     */
    sx?: SxProps;

    /**
     * The content to show tooltip on.
     */
    children: ReactElement<any, any>;
};

/**
 * Used to display a tooltip on focus.
 * @param {TooltipProps} props - The {@link TooltipProps} that contains the props for the tooltip component.
 * @returns A {@link Tooltip} component.
 */
export const Tooltip = ({ id, open, handleOpen, handleClose, tooltipTitle, tooltipText, sx, children }: TooltipProps) =>
    <MuiTooltip
        id={`${id}-tooltip`}
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        disableHoverListener
        placement='right'
        componentsProps={{
            tooltip: {
                sx: { maxWidth: 520, backgroundColor: 'action.hover' },
            },
        }}
        title={
            <>
                <Typography variant='body2' sx={{ fontWeight: 700, textTransform: 'uppercase' }}>{tooltipTitle}</Typography>
                <Typography variant='body2'>{tooltipText}</Typography>
            </>
        }
        sx={sx}
    >
        {children}
    </MuiTooltip>;
