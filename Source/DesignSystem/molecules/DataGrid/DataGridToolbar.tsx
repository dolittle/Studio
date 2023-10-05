// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, Divider, Typography } from '@mui/material';

import { Button, ButtonProps } from '@dolittle/design-system';

const styles = {
    wrapper: {
        minHeight: 64,
        px: 1.25,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 4,
    },
    buttonGroup: {
        display: 'flex',
        gap: 4,
    },
    bottomDivider: {
        mx: 1,
        borderColor: 'outlineborder',
    },
};

export type DataTableToolbarProps = {
    title: string;
    buttons: ButtonProps[];
};

export const DataTableToolbar = ({ title, buttons }: DataTableToolbarProps) =>
    <>
        <Box sx={styles.wrapper}>
            <Typography variant='subtitle2' noWrap>{title}</Typography>
            <Box sx={styles.buttonGroup}>
                {buttons.map((button, index) => <Button key={index} {...button} />)}
            </Box>
        </Box>
        <Divider sx={styles.bottomDivider} />
    </>;
