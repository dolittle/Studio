// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { Typography } from '@mui/material';
import { SvgIcons } from '@dolittle/design-system/theming/Icons/Icons';

import { NoEntityView } from '../../components/noEntityView/noEntityView';

export const NoConnections = () => {

    return (
        <NoEntityView
            title='No connections established yet...'
            createEntityProps={{
                createEntityText: 'Set up M3 connection',
                createEntityIcon: SvgIcons.PolylineRounded,
                onCreateEntity(): void {
                    throw new Error('Function not implemented.');
                }
            }}
        >
            <Typography component='p' variant='body1' mb={2}>
                After you set up your first connection it will appear here.
            </Typography>

            <Typography component='p' variant='body1'>
                The Dolittle platform currently supports M3 integrations. We are looking to expand this in the future to other ERP systems, so be sure to check back in or let us know what your needs are!
            </Typography>
        </NoEntityView>
    );
};
