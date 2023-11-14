// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { Typography } from '@mui/material';

import { ContentContainer, ContentWithSubtitle, NoContentSection, LoadingSpinner } from '@dolittle/design-system';

export const CommandsView = () => {
    const [isLoading, setIsLoading] = useState(false);

    if (isLoading) return <LoadingSpinner />;

    return (
        <ContentContainer sx={{ py: 2 }}>
            <Typography variant='subtitle1' sx={{ pb: 4 }}>
                Your Commands
            </Typography>

            <Typography>
                This is where you can manage your commands.
            </Typography>

            <ContentWithSubtitle title='Send a command' infoTooltipLabel='Send a command to the connection'>
                <NoContentSection
                    title='No commands yet...'
                    description={`To send a command to the connection, click the 'Send A Command' button.`}
                    label='Send a command'
                    icon='RocketLaunch'
                    onCreate={() => { }}
                />
            </ContentWithSubtitle>
        </ContentContainer>
    );
};
