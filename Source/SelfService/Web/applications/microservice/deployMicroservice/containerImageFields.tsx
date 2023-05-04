// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, SxProps, Typography } from '@mui/material';

import { Input, Link, Tooltip } from '@dolittle/design-system';

import { HeadArguments } from '../components/form/headArguments';
import { alphaNumericLowerCasedCharsRegex } from '../../../utils/validation/patterns';

const portDescription = `By default, your mircroservice will be hosted on port 80 within the secure Dolittle cluster,
but this can be overridden if your image requires it.`;

const EntrypointDescription = () =>
    <>
        If you would like to override your container image ENTRYPOINT,
        you can do so in this field. You can find more information on ENTRYPOINTS and CMD ARGUMENETS <Link
            href='https://docs.docker.com/engine/reference/builder/#understand-how-cmd-and-entrypoint-interact'
            target
            ariaLabel='Understand how CMD and ENTRYPOINT interact which opens in a new window.'
            message='here'
            color='secondary'
        />.
    </>;

type ContainerImageFieldsProps = {
    sx?: SxProps;
};

export const ContainerImageFields = ({ sx }: ContainerImageFieldsProps) =>
    <Box sx={sx}>
        <Typography variant='subtitle2' sx={{ mb: 2 }}>Container Image Settings</Typography>

        <Tooltip tooltipTitle='Image Name' tooltipText='Please provide the container image name for your microservice.'>
            <Input
                id='headImage'
                label='Image Name'
                required='Provide an image name.'
                sx={{ width: 1, maxWidth: 500, minWidth: 220 }}
            />
        </Tooltip>

        <Tooltip tooltipTitle='Port' tooltipText={portDescription} sx={{ position: 'relative', top: 6 }}>
            <Input
                id='headPort'
                label='Port'
                required='Provide a port. Default is 80.'
                pattern={{
                    value: alphaNumericLowerCasedCharsRegex,
                    message: 'Please enter a valid port number.'
                }}
            />
        </Tooltip>

        <Tooltip tooltipTitle='Entrypoint' tooltipText={<EntrypointDescription />}>
            <Input id='entrypoint' label='Entrypoint' />
        </Tooltip>

        <HeadArguments />
    </Box>;
