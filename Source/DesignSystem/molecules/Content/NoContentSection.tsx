// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Paper, Typography } from '@mui/material';

import { CreateButton, CreateButtonProps } from '@dolittle/design-system';

/**
 * The props for a {@link NoContentSection} component.
 */
export type NoContentSectionProps = {
    /**
     * The title to display when there is no content.
     */
    title: string;

    /**
     * The description to display when there is no content.
     */
    description: string;

    /**
     * The label to display on the button in the empty state.
     */
    label: string;

    /**
     * Add an icon to the start of the button.
     *
     * List of available icons can be found in {@link SvgIcons}.
     * @default AddCircle
     */
    icon?: CreateButtonProps['icon'];

    /**
     * If true, the button will be disabled.
     * @default false
     */
    isDisabled?: boolean;

    /**
     * The callback to execute when the button is clicked.
     */
    onCreate: () => void;

    /**
     * The sx prop lets you add custom styles to the component, overriding the styles defined by Material-UI.
     */
    sx?: CreateButtonProps['sx'];
};

/**
 * A component that displays an empty state with a title, description and a button.
 * @param {NoContentSectionProps} props - The {@link NoContentSectionProps}.
 * @returns A {@link NoContentSection} component.
 */
export const NoContentSection = ({ title, description, label, icon, isDisabled, onCreate, sx }: NoContentSectionProps) =>
    <Paper sx={{ boxShadow: 'none', maxInlineSize: 1200, ...sx }}>
        <Typography variant='h2'>{title}</Typography>
        <Typography variant='body1' sx={{ mt: 2 }}>{description}</Typography>
        <CreateButton label={label} icon={icon ? icon : 'AddCircle'} isDisabled={isDisabled} onCreate={onCreate} />
    </Paper>;
