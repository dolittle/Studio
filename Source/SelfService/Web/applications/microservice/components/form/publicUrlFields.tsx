// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { Stack, Typography } from '@mui/material';

import { Input, Link, Switch, Tooltip } from '@dolittle/design-system';

const PublicUrlFieldDescription = () =>
    <>
        Dolittle will generate a public URL for you. If you would like to specify a subpath, please enter one here. If you would
        like custom handling of the path and subpaths, please reach
        out to <Link href='mailto: support@dolittle.com' message='Dolittle support' color='secondary' /> after you&#39;ve deployed the service.
    </>;

export type PublicUrlFieldsProps = {
    hasDashedBorder?: boolean;
    hasPublicUrl?: boolean;
    isDisabled?: boolean;
};

export const PublicUrlFields = ({ hasDashedBorder, hasPublicUrl, isDisabled, }: PublicUrlFieldsProps) => {
    const [showPublicUrlInfo, setShowPublicUrlInfo] = useState(hasPublicUrl);

    return (
        <Stack sx={{ mb: 4 }}>
            <Typography variant='subtitle2'>Public Microservice</Typography>

            <Switch
                id='isPublic'
                label='Expose to a public URL'
                disabled={isDisabled}
                onChange={() => setShowPublicUrlInfo(!showPublicUrlInfo)}
            />

            {showPublicUrlInfo &&
                <Tooltip tooltipTitle='PATH' tooltipText={<PublicUrlFieldDescription />}>
                    <Input
                        id='ingressPath'
                        label='Path'
                        startAdornment='/'
                        placeholder='leave blank for default path'
                        disabled={isDisabled}
                        dashedBorder={hasDashedBorder}
                        sx={{ width: 226 }}
                    />
                </Tooltip>
            }
        </Stack>
    );
};
