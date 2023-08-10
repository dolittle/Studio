// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { Box, Stack, Typography } from '@mui/material';

import { Switch } from '@dolittle/design-system';

export type HasM3ConnectorFieldProps = {
    isDisabled?: boolean;
};

export const HasM3ConnectorField = ({ isDisabled }: HasM3ConnectorFieldProps) => {
    const [showM3ConnectorInfo, setShowM3ConnectorInfo] = useState(false);

    return (
        <Stack sx={{ mb: 4 }}>
            <Typography variant='subtitle2'>Connect to M3</Typography>

            <Switch
                id='hasM3Connector'
                label='Make M3 configuration available to microservice'
                onChange={() => setShowM3ConnectorInfo(!showM3ConnectorInfo)}
                disabled={isDisabled}
            />

            {showM3ConnectorInfo &&
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
        </Stack>
    );
};
