// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { ReactElement } from 'react';

import { SxProps, Tooltip } from '@mui/material';

import { TooltipTitle } from './helpers';

/**
 * The props for a {@link FormFieldTooltip} component.
 */
export type FormFieldTooltipProps = {
    /**
     * The title should capture the essence of the description. It should be short and to the point.
     */
    title: string;

    /**
     * The description should provide more information about the action that is going to be made.
     */
    description: string | React.ReactNode;

    /**
     * If true, the form field tooltip is shown when the element is hovered.
     * @default false
     */
    displayOnHover?: boolean;

    /**
     * You can use the open, onOpen and onClose props to control the behavior of the form field form field tooltip.
     *
     * This is useful when you want to implement a custom behavior.
     * You can use this with components that don't have a hover state, like a button.
     * @default false
     */
    isOpen?: boolean;

    /**
     * Callback fired when the component requests to be open.
     */
    onOpen?: () => void;

    /**
     * Callback fired when the component requests to be closed.
     */
    onClose?: () => void;

    /**
     * The content to show inside the form field tooltip.
     */
    children: ReactElement<any, any>;

    /**
     * The sx prop lets you add custom styles to the component, overriding the styles defined by Material-UI.
     */
    sx?: SxProps;

    /**
     * Form field tooltip is placed on the right side of the target element.
     * @default 'right'
     */
    placement?: never;
};

/**
 * A form field tooltip is a small pop-up that appears when a user places the cursor over an form element.
 * @param {FormFieldTooltipProps} props - The {@link FormFieldTooltipProps}.
 * @returns A {@link FormFieldTooltip} component.
 */
export const FormFieldTooltip = ({ title, description, displayOnHover, isOpen, onOpen, onClose, children, sx }: FormFieldTooltipProps) =>
    <Tooltip
        title={<TooltipTitle title={title} description={description} />}
        disableHoverListener={!displayOnHover}
        open={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        placement='right'
        componentsProps={{
            tooltip: {
                sx: { position: 'relative', maxWidth: 520, backgroundColor: 'action.hover', ...sx },
            },
        }}
    >
        {children}
    </Tooltip>;
