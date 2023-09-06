// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import { useSnackbar } from 'notistack';
import { Box, Stack, Typography } from '@mui/material';
import { AlertBox, ContentParagraph, ContentSection, IconButton, Link } from '@dolittle/design-system';

export const RealtimeSyncSection = () => {
    const { enqueueSnackbar } = useSnackbar();
    const webhookUrl = 'https://bridge-services-dev.dolittle.cloud/1c7a24ffb4/dishonest-hang';
    const handleWebhookLinkCopy = () => {
        navigator.clipboard.writeText(webhookUrl);
        enqueueSnackbar('Webhook url copied to clipboard.');
    };

    return (
        <>
            <ContentSection title='Realtime Updates'>
                <ContentParagraph>
                    Realtime data sync allows your application to receive updates from M3 in real time. You are required to configure M3 Webhooks manually for the Aigonix Connector to receive updates from M3.
                </ContentParagraph>
                <ContentParagraph>
                    If the table has a message mapping configured, it will update the message mapping with the latest data from M3. This is a way to ensure the data being consumed is always up to date.
                </ContentParagraph>
            </ContentSection>
            <ContentSection
                title='M3 Webhook configuration'
                hideDivider
            >
                <AlertBox
                    severity='warning'
                    isOpen
                    title='Note'
                    message='Replace {TABLE_NAME} in the webhook URL with the name of the table you are setting up the webhook for' />
                <ContentParagraph>
                    The following configuration is required to enable realtime updates over webhooks in M3:
                </ContentParagraph>
                <Stack>
                    <Box sx={{ display: 'flex', alignItems: 'center', pt: 2, gap: 1 }}>
                        <Link
                            target
                            ariaLabel='OpenAPI documentation'
                            message={webhookUrl + '/{TABLE_NAME}'} />
                        <IconButton
                            tooltipText='Copy OpenAPI documentation link to clipboard'
                            icon='CopyAllRounded'
                            color='primary'
                            onClick={handleWebhookLinkCopy} />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', pt: 2, gap: 1 }}>
                        <Typography>Username: abcd</Typography>
                        <IconButton
                            tooltipText='Copy OpenAPI documentation link to clipboard'
                            icon='CopyAllRounded'
                            color='primary'
                            onClick={handleWebhookLinkCopy} />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', pt: 2, gap: 1 }}>
                        <Typography>Password: abcd</Typography>
                        <IconButton
                            tooltipText='Copy OpenAPI documentation link to clipboard'
                            icon='CopyAllRounded'
                            color='primary'
                            onClick={handleWebhookLinkCopy} />
                    </Box>
                </Stack>
            </ContentSection>
        </>

    );
};

