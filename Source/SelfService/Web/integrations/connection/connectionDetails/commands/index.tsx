// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Typography } from '@mui/material';

import { ContentContainer, ContentWithSubtitle, NoContentSection, LoadingSpinner } from '@dolittle/design-system';

export const CommandsView = () => {
    return (
        <ContentContainer sx={{ py: 2 }}>
            <Typography variant='subtitle1' sx={{ pb: 4 }}>
                Commands
            </Typography>

            <Typography>
                This is where you can send commands to the connection.
            </Typography>

            <ContentWithSubtitle title='Send a command' infoTooltipLabel='Send a command to the connection'>
                <NoContentSection
                    title='No commands yet...'
                    description={`To send a command to the connection, click the 'Send a command' button.`}
                    label='Send a command'
                    onCreate={() => { }}
                />
            </ContentWithSubtitle>
        </ContentContainer>
    );
};
