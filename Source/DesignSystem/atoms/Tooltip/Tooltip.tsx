// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { ReactElement } from 'react';

import { SxProps, Tooltip as MuiTooltip, Typography } from '@mui/material';

/**
 * The props for a {@link Tooltip} component.
 */
export type TooltipProps = {
    /**
     * The tooltip title.
     */
    tooltipTitle: string;

    /**
     * The tooltip text.
     */
    tooltipText: string | React.ReactNode;

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
     * If true, the tooltip is shown when the element is hovered.
     * @default false
     */
    displayOnHover?: boolean;

    /**
     * Tooltip is placed on the right.
     * @default 'right'
     */
    placement?: never;

    /**
     * The content to show tooltip on.
     */
    children: ReactElement<any, any>;

    /**
     * The sx prop lets you add custom styles to the component, overriding the styles defined by Material-UI.
     */
    sx?: SxProps;
};

/**
 * Used to display a large tooltip on right side of an input.
 * @param {TooltipProps} props - The {@link TooltipProps}.
 * @returns A {@link Tooltip} component.
 */
export const Tooltip = ({ tooltipTitle, tooltipText, open, handleOpen, handleClose, displayOnHover, children, sx }: TooltipProps) =>
    <MuiTooltip
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        disableHoverListener={!displayOnHover}
        placement='right'
        componentsProps={{
            tooltip: {
                sx: { position: 'relative', maxWidth: 520, backgroundColor: 'action.hover', ...sx },
            },
        }}
        title={
            <>
                <Typography variant='body2' sx={{ fontWeight: 700, textTransform: 'uppercase' }}>{tooltipTitle}</Typography>
                <Typography variant='body2'>{tooltipText}</Typography>
            </>
        }
    >
        {children}
    </MuiTooltip>;
