// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.


import React from 'react';

import { Box, Paper, SvgIconProps } from '@mui/material';
import { Button } from '@dolittle/design-system';

const styles = {
    deployButtonWrapper: {
        position: 'relative',
        width: '413px',
        height: '174px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    dashedBorder: {
        'width': 1,
        'height': 1,
        'position': 'absolute',
        'top': '-8px',
        'left': '-8px',
        'pointerEvents': 'none',
        'clipPath': 'inset(0 round 5px)',
        ':before': {
            content: '""',
            position: 'absolute',
            left: '-3px',
            top: '-3px',
            right: '-3px',
            bottom: '-3px',
            border: '4px dashed #504D4D',
            borderRadius: '10px',
            boxSizing: 'border-box'
        }
    }
};

export type CreateEntityBoxProps = {
    createEntityText?: string;
    createEntityIcon?: React.ReactElement<SvgIconProps<'svg', {}>, string | React.JSXElementConstructor<any>> | undefined;
    onCreateEntity: () => void;
};

export const CreateEntityBox = ({createEntityText = '', createEntityIcon, onCreateEntity}: CreateEntityBoxProps) => {
    return(
    <Box component={Paper} mt={6.75} mb={5.75} sx={styles.deployButtonWrapper}>
        <Box sx={styles.dashedBorder}></Box>
        <Button label={createEntityText} isFullWidth startWithIcon={createEntityIcon} onClick={onCreateEntity} sx={{ height: 1 }} />
    </Box>
    );
};
