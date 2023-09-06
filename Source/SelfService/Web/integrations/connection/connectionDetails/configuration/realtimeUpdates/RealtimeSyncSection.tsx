// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import { useSnackbar } from 'notistack';
import { useQueryClient } from '@tanstack/react-query';
import { Box, Stack, Typography } from '@mui/material';
import { WebhookServiceStatus } from '../../../../../apis/integrations/generated';
import { CACHE_KEYS } from '../../../../../apis/integrations/CacheKeys';
import { useConnectionsIdWebhookStatusGet, useConnectionsIdWebhooksDisablePost, useConnectionsIdWebhooksEnablePost } from '../../../../../apis/integrations/connectionWebhookApi.hooks';
import { useConnectionIdFromRoute } from '../../../../routes.hooks';
import { AlertBox, Button, ContentParagraph, ContentSection, IconButton, Link, StatusIndicatorProps } from '@dolittle/design-system';

export const RealtimeSyncSection = () => {
    const webhookUrl = 'https://bridge-services-dev.dolittle.cloud/1c7a24ffb4/dishonest-hang';
    const { enqueueSnackbar } = useSnackbar();

    const connectionId = useConnectionIdFromRoute();
    const { data: webhookStatus, isLoading } = useConnectionsIdWebhookStatusGet(
        { id: connectionId },
        {
            refetchInterval: (data) => {
                return data?.service === 'Deploying' ? 1000 : 4000;
            }
        }
    );
    const enableMutation = useConnectionsIdWebhooksEnablePost();
    const disableMutation = useConnectionsIdWebhooksDisablePost();
    const queryClient = useQueryClient();

    const serviceStatus = webhookStatus?.service || 'Off';
    const isEnabling = (webhookStatus?.target === 'Disabled') || serviceStatus === 'Deploying';
    const shouldDisableDisableButton = serviceStatus === 'Off' || serviceStatus === 'Deploying' || serviceStatus === 'Terminating';


    const handleWebhookLinkCopy = () => {
        navigator.clipboard.writeText(webhookUrl);
        enqueueSnackbar('Webhook url copied to clipboard.');
    };

    const handleEnableRealtimeSync = () => {
        enableMutation.mutate({ id: connectionId }, {
            onSuccess: () => {
                queryClient.invalidateQueries([CACHE_KEYS.ConnectionWebhookStatus_GET, connectionId]);
                enqueueSnackbar('Realtime sync service is being deployed. It will be available in a few minutes.');
            },
            onError: (error) => {
                enqueueSnackbar('Something went wrong deploying the Rest API service. Error: ' + error, { variant: 'error' });
            }
        });
    };

    const handleDisableRealtimeSync = () => {
        // disableServiceDialogDispatch({ type: 'close' });
        disableMutation.mutate({ id: connectionId }, {
            onSuccess: () => {
                queryClient.invalidateQueries([CACHE_KEYS.ConnectionRestApiStatus_GET, connectionId]);
                enqueueSnackbar('Rest API service has been disabled.');
            },
            onError: (error) => {
                enqueueSnackbar('Something went wrong while disabling the Rest API service. Error: ' + error, { variant: 'error' });
            }
        });
    };

    const statusIndicatorFromServiceStatus = (status: WebhookServiceStatus | ''): StatusIndicatorProps['status'] => {
        switch (status?.toLocaleLowerCase()) {
            case 'off':
                return 'error';
            case 'deploying':
                return 'waiting';
            case 'active':
                return 'success';
            case 'unhealthy':
                return 'warning';
            case 'terminating':
                return 'waiting';
        }
        return 'unknown';
    };


    return (
        <>
            <ContentSection
                title='Realtime Data Sync'
                headerProps={{
                    status: !isLoading
                        ? {
                            status: statusIndicatorFromServiceStatus(serviceStatus || ''),
                            label: serviceStatus
                        }
                        : undefined,
                    buttonsSlot: <>{!isEnabling && <Button
                        label='Disable Realtime Sync'
                        variant='outlined'
                        color='error'
                        disabled={shouldDisableDisableButton}
                        onClick={() => handleDisableRealtimeSync()}
                        // onClick={() => disableServiceDialogDispatch({ type: 'open' })}
                    />
                    }</>

                }}
            >
                <ContentParagraph>
                    Realtime data sync allows your application to receive updates from M3 in real time. You are required to configure M3 Webhooks manually for the Aigonix Connector to receive updates from M3.
                </ContentParagraph>
                <ContentParagraph>
                    If the table has a message mapping configured, it will update the message mapping with the latest data from M3. This is a way to ensure the data being consumed is always up to date.
                </ContentParagraph>
                {isEnabling && <Button
                    label='Enable Realtime Sync'
                    variant='fullwidth'
                    startWithIcon='RocketLaunch'
                    onClick={handleEnableRealtimeSync}
                    disabled={serviceStatus !== 'Off' || isLoading}
                />
                }
            </ContentSection>
            {/* <ContentSection title='Enable Realtime data sync'>
            </ContentSection> */}
            {!isEnabling &&
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
            }

        </>

    );
};

