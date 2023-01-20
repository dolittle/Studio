// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { ReactElement } from 'react';

import { SxProps, Tooltip as MuiTooltip, Paper, Typography } from '@mui/material';

/**
 * The props for a {@link Tooltip} component.
 */
type TooltipProps = {
    /**
     * Required. Unique id to add every tooltip.
     */
    id: string;

    /**
     * You can use the open, onOpen and onClose props to control the behavior of the tooltip.
     * This is useful when you want to implement a custom behavior.
     * You can use the open prop to make the tooltip always visible.
     * You can use this with components that don't have a hover state, like a button.
     * @default false
     */
    open?: boolean;
    handleOpen?: () => void;
    handleClose?: () => void;

    /**
     * Required. The content title.
     */
    tooltipTitle: string | undefined;

    /**
     * Required. The content text.
     */
    tooltipText: string | React.ReactNode | undefined;

    /**
     * Don't activate the tooltip on hover. This is used to activate the tooltip on focus.
     *
     * Set to true.
     * @default true
     * @type {never}
     */
    disableHoverListener?: never;

    /**
     * The placement of the tooltip.
     *
     * Set to 'right'.
     * @default 'right'
     * @type {never}
     */
    placement?: never;

    /**
     * Add custom styles to the tooltip.
     */
    sx?: SxProps;

    /**
     * Required. The content to wrap with the tooltip.
     */
    children: ReactElement<any, any>;
};

/**
 * A Tooltip component.
 * @param {...TooltipProps} props - The {@link TooltipProps}.
 * @returns {ReactElement} A new {@link Tooltip} component.
 */
export const Tooltip = ({ id, open, handleOpen, handleClose, tooltipTitle, tooltipText, sx, children }: TooltipProps): ReactElement =>
    <MuiTooltip
        id={`${id}-tooltip`}
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        disableHoverListener
        placement='right'
        sx={sx}
        title={
            <Paper sx={{ py: 1, px: 2, typography: 'body2' }}>
                <Typography sx={{ fontWeight: 700 }}>{tooltipTitle}</Typography>
                {tooltipText}
            </Paper>
        }
    >
        {children}
    </MuiTooltip>;
