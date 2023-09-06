// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
import { Box, Stack, Typography } from '@mui/material';
import { AlertBox, ContentContainer, ContentHeader, ContentParagraph, ContentSection, IconButton, Link, PasswordInput, TextField } from '@dolittle/design-system';
import { useConnectionsIdGet } from '../../../../../apis/integrations/connectionsApi.hooks';
import { TextCopyBox } from '../../../../../components/TextCopyBox';
import { useConnectionIdFromRoute } from '../../../../routes.hooks';
import { ActionToolbar } from './ActionToolbar';



export const RealtimeUpdatesConfigurationContainer = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [canEdit, setEditMode] = useState(false);
    const connectionId = useConnectionIdFromRoute();
    const query = useConnectionsIdGet({ id: connectionId });


    const connection = query.data?.value;
    const links = query.data?.links || [];
    const webhookUrl = 'https://bridge-services-dev.dolittle.cloud/1c7a24ffb4/dishonest-hang';

    const handleOnCancelAction = () => {
        setEditMode(false);
    };

    const handleWebhookLinkCopy = () => {
        navigator.clipboard.writeText(webhookUrl);
        enqueueSnackbar('Webhook url copied to clipboard.');
    };

    if (query.isLoading) return <>Loading</>;
    if (!connection) return null;

    return (
        <ContentContainer>
            <ContentHeader
                title='Data Sync Settings'
                buttonsSlot={
                    <ActionToolbar
                        canEdit={canEdit}
                        onCancelAction={handleOnCancelAction}
                        onEditAction={() => setEditMode(true)}
                    />
                }
            />
            <ContentSection title='Scheduled Updates'>
                <ContentParagraph>
                    Insert text here!
                </ContentParagraph>
            </ContentSection>
            <ContentSection title='Realtime Updates'>
                <ContentParagraph>
                    Realtime updates is a feature that allows you to receive updates from M3 in real time. It requires you to manually configure webhooks for the tables you would like to receive updates from.
                </ContentParagraph>
                <ContentParagraph>
                    If the table has a message mapping configured, it will update the message mapping with the latest data from M3. This is a ensure the data being consumed is always up to date.
                </ContentParagraph>
            </ContentSection>
            <ContentSection
                title='Webhook configuration'
            >
                <AlertBox
                    severity='info'
                    isOpen
                    title='Note'
                    message='Replace {TABLE_NAME} in the webhook URL with the name of the table you are setting up the webhook for'
                />
                <ContentParagraph>
                    The following configuration is required to enable realtime updates over webhooks in M3:
                </ContentParagraph>
                <Stack>
                    <Box sx={{ display: 'flex', alignItems: 'center', pt: 2, gap: 1 }}>
                        <Link
                            target
                            ariaLabel='OpenAPI documentation'
                            message={webhookUrl + '/{TABLE_NAME}'}
                        />
                        <IconButton
                            tooltipText='Copy OpenAPI documentation link to clipboard'
                            icon='CopyAllRounded'
                            color='primary'
                            onClick={handleWebhookLinkCopy}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', pt: 2, gap: 1 }}>
                        <Typography>Username: abcd</Typography>
                        <IconButton
                            tooltipText='Copy OpenAPI documentation link to clipboard'
                            icon='CopyAllRounded'
                            color='primary'
                            onClick={handleWebhookLinkCopy}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', pt: 2, gap: 1 }}>
                        <Typography>Password: abcd</Typography>
                        <IconButton
                            tooltipText='Copy OpenAPI documentation link to clipboard'
                            icon='CopyAllRounded'
                            color='primary'
                            onClick={handleWebhookLinkCopy}
                        />
                    </Box>
                </Stack>
            </ContentSection>
        </ContentContainer>
    );
};
