// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, SxProps, Typography } from '@mui/material';

import { Switch } from '@dolittle/design-system';

type HasM3ConnectorFieldProps = {
    hasM3Connector: boolean;
    setHasM3Connector: (hasM3Connector: boolean) => void;
    disabled?: boolean;
    sx?: SxProps;
};

export const HasM3ConnectorField = ({ hasM3Connector, setHasM3Connector, disabled, sx }: HasM3ConnectorFieldProps) =>
    <Box sx={sx}>
        <Typography variant='subtitle2'>Connect to M3</Typography>

        <Switch
            id='hasM3Connector'
            label='Make M3 configuration available to microservice'
            onChange={setHasM3Connector}
            disabled={disabled}
        />

        {hasM3Connector &&
            <>
                <Typography variant='body2' sx={{ ml: 6, mt: 1 }}>
                    Enabling this will mount these files to the deployed microservice:
                </Typography>

                <Box sx={{ ml: 6, mt: 2 }}>
                    <Typography variant='body2'>/app/connection/kafka/ca.pem</Typography>
                    <Typography variant='body2'>/app/connection/kafka/certificate.pem</Typography>
                    <Typography variant='body2'>/app/connection/kafka/accessKey.pem</Typography>
                </Box>
            </>
        }
    </Box>;
