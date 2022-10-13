// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box } from '@mui/material';

export type TerminalProps = {
    applicationId: string;
    environment: string;
    microserviceId: string;
};

export const Terminal = (props: TerminalProps) => {
    const shellUrl = `/proxy/${props.applicationId}/${props.environment}/${props.microserviceId}/shell/`;
    return (
        <Box
            component='iframe'
            src={shellUrl}
            sx={{
                width: '100%',
                height: '500px',
                border: 'none',
            }}
        />
    );
};
