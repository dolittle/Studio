// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, Paper, Stack, Typography } from '@mui/material';

import { Button, ButtonProps } from '../../index';

const styles = {
    container: {
        height: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    buttonContainer: {
        position: 'relative',
        width: '413px',
        height: '174px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mt: 6.75,
        mb: 5.75,
    },
    button: {
        height: 1,
        whiteSpace: 'normal',
        wordWrap: 'break-word',
        wordBreak: 'break-word',
    },
    buttonDashedBorder: {
        'width': 1,
        'height': 1,
        'position': 'absolute',
        'top': -8,
        'left': -8,
        'pointerEvents': 'none',
        'clipPath': 'inset(0 round 5px)',
        ':before': {
            content: '""',
            position: 'absolute',
            left: -3,
            top: -3,
            right: -3,
            bottom: -3,
            border: '4px dashed',
            borderColor: 'outlineborder',
            borderRadius: '10px',
            boxSizing: 'border-box',
        },
    },
};

/**
 * The props for the {@link NoContentView} component.
 */
export type NoContentViewProps = {
    /**
     * The title to display when there is no content.
     */
    title: string;

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
    icon?: ButtonProps['startWithIcon'];

    /**
     * The description to display when there is no content.
     */
    description: string;

    /**
     * Required as this is part of the `description`.
     *
     * Expands the description if there is no content.
     */
    subDescription: string;

    /**
     * The callback to execute when the button is clicked.
     */
    onCreate: () => void;
};

/**
 * A component that displays an empty state with a title, description, and button with a large dashed border.
 *
 * The content is centered related to the parent container.
 * @param {NoContentViewProps} props - The {@link NoContentViewProps}.
 * @returns A {@link NoContentView} component.
 */
export const NoContentView = ({ title, label, icon, description, subDescription, onCreate }: NoContentViewProps) =>
    <Stack component='article' sx={styles.container}>
        <Typography variant='h2'>{title}</Typography>

        <Paper component='section' sx={styles.buttonContainer}>
            <Box component='span' sx={styles.buttonDashedBorder}></Box>
            <Button label={label} startWithIcon={icon ? icon : 'AddCircle'} isFullWidth onClick={onCreate} sx={styles.button} />
        </Paper>

        <Typography sx={{ maxWidth: 540, mb: 2 }}>{description}</Typography>
        <Typography sx={{ maxWidth: 540 }}>{subDescription}</Typography>
    </Stack>;
