// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, Paper } from '@mui/material';

import { Button, SvgIconsDefinition } from '@dolittle/design-system';

const styles = {
    deployButtonWrapper: {
        position: 'relative',
        width: '413px',
        height: '174px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mt: 6.75,
        mb: 5.75,
    },
    dashedBorder: {
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

export type CreateEntityBoxProps = {
    createEntityText?: string;
    createEntityIcon?: SvgIconsDefinition;
    onCreateEntity: () => void;
};

export const CreateEntityBox = ({ createEntityText = '', createEntityIcon, onCreateEntity }: CreateEntityBoxProps) =>
    <Paper sx={styles.deployButtonWrapper}>
        <Box sx={styles.dashedBorder}></Box>
        <Button label={createEntityText} isFullWidth startWithIcon={createEntityIcon} onClick={onCreateEntity} sx={{ height: 1 }} />
    </Paper>;
