// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Button } from '@mui/material';
import { RocketLaunch } from '@mui/icons-material';

const styles = {
    createMicroserviceBtn: {
        background: 'linear-Gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.05) 100%), #191A21',
        fontSize: '0.8125rem',
        fontWeight: '500',
        marginBlockStart: '1.0625rem',
        minBlockSize: '36px'
    }
};

type CreateButtonProps = {
    handleClick: () => void;
};

export const CreateButton: React.FC<CreateButtonProps> = ({ handleClick }: CreateButtonProps) => {
    return (
        <Button
            onClick={handleClick}
            startIcon={<RocketLaunch />}
            fullWidth
            sx={styles.createMicroserviceBtn}
        >
            Deploy New Microservice
        </Button>
    );
};
