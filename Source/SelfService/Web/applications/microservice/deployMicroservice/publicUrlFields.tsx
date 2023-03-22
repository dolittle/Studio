// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { Box, SxProps, Typography } from '@mui/material';

import { Input, Link, Switch, Tooltip } from '@dolittle/design-system';

const PublicUrlFieldDescription = () =>
    <>
        Dolittle will generate a public URL for you. If you would like to specify a subpath, please enter one here. If you would
        like custom handling of the path and subpaths, please reach
        out to <Link href='mailto: support@dolittle.com' message='Dolittle support' color='secondary' /> after you&#39;ve deployed the service.
    </>;

type PublicUrlFieldsProps = {
    sx?: SxProps;
};

export const PublicUrlFields = ({ sx }: PublicUrlFieldsProps) => {
    const [showPublicUrlInfo, setShowPublicUrlInfo] = useState(false);

    return (
        <Box sx={sx}>
            <Typography variant='subtitle2'>Public Microservice</Typography>

            <Switch
                id='isPublic'
                label='Expose to a public URL'
                onChange={() => setShowPublicUrlInfo(!showPublicUrlInfo)}
            />

            {showPublicUrlInfo &&
                <Tooltip tooltipTitle='PATH' tooltipText={<PublicUrlFieldDescription />}>
                    <Input
                        id='ingressPath'
                        label='Path'
                        startAdornment='/'
                        placeholder='leave blank for default path'
                        sx={{ width: 226 }}
                    />
                </Tooltip>
            }
        </Box>
    );
};
