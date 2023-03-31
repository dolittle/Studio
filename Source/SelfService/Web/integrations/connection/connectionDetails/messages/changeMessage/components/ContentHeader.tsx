// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, Typography } from '@mui/material';

import { Button, ButtonProps } from '@dolittle/design-system';

const styles = {
    wrapper: {
        minHeight: 64,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 4,
    },
    buttonGroup: {
        display: 'flex',
        gap: 4,
    },
};

export type ContentHeaderProps = {
    title: string;
    titleTextVariant?: 'title' | 'subtitle'
    buttons?: ButtonProps[];
};

export const ContentHeader = ({ title, buttons, titleTextVariant = 'title' }: ContentHeaderProps) =>
    <Box sx={styles.wrapper}>
        <Typography variant={titleTextVariant === 'title' ? 'subtitle1' : 'subtitle2'} noWrap>{title}</Typography>
        <Box sx={styles.buttonGroup}>
            {buttons?.map((button, index) => <Button key={index} {...button} />)}
        </Box>
    </Box>;
