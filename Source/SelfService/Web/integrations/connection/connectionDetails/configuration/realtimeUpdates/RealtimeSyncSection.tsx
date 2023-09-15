// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React, { useReducer } from 'react';
import { useSnackbar } from 'notistack';
import { useQueryClient } from '@tanstack/react-query';
import { Box, Stack, Typography } from '@mui/material';
import { WebhookServiceStatus } from '../../../../../apis/integrations/generated';
import { CACHE_KEYS } from '../../../../../apis/integrations/CacheKeys';
import { useConnectionsIdWebhookStatusGet, useConnectionsIdWebhooksDisablePost, useConnectionsIdWebhooksEnablePost } from '../../../../../apis/integrations/connectionWebhookApi.hooks';
import { useConnectionIdFromRoute } from '../../../../routes.hooks';
import { AlertBox, Button, ContentParagraph, ContentSection, IconButton, Link, StatusIndicatorProps } from '@dolittle/design-system';
import { DisableWebhooksDialog, disableWebhooksDialogReducer } from './DisableRealtimeSyncDialog';
import { getConnectionIndicatorStatusFromStatusMessage } from '../setup/statusResolvers';

export const RealtimeSyncSection = () => {
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
    const [disableRealtimeDialogState, disableRealtimeDialogDispatch] = useReducer(disableWebhooksDialogReducer, { isOpen: false });

    const serviceStatus = webhookStatus?.service || 'Off';
    const isEnabling = (webhookStatus?.target === 'Disabled') || serviceStatus === 'Deploying';
    const shouldDisableDisableButton = serviceStatus === 'Off' || serviceStatus === 'Deploying' || serviceStatus === 'Terminating';
    const serviceStatusIndicator = getConnectionIndicatorStatusFromStatusMessage(webhookStatus?.status);

    const webhookUrl = webhookStatus?.basePath + '/{TABLE_NAME}' || '';
    const webhookUsername = webhookStatus?.username || '';
    const webhookPassword = webhookStatus?.password || '';



    const handleWebhookLinkCopy = () => {
        navigator.clipboard.writeText(webhookUrl);
        enqueueSnackbar('Webhook url copied to clipboard.');
    };

    const handleWebhookUsernameCopy = () => {
        navigator.clipboard.writeText(webhookUsername);
        enqueueSnackbar('Webhook username copied to clipboard.');
    };
    const handleWebhookPasswordCopy = () => {
        navigator.clipboard.writeText(webhookPassword);
        enqueueSnackbar('Webhook password copied to clipboard.');
    };

    const handleEnableRealtimeSync = () => {
        enableMutation.mutate({ id: connectionId }, {
            onSuccess: () => {
                queryClient.invalidateQueries([CACHE_KEYS.ConnectionWebhookStatus_GET, connectionId]);
                enqueueSnackbar('Realtime sync service is being enabled. It will be available in a few minutes.');
            },
            onError: (error) => {
                enqueueSnackbar('Something went wrong deploying the Realtime sync service. Error: ' + error, { variant: 'error' });
            }
        });
    };

    const handleDisableRealtimeSync = () => {
        disableRealtimeDialogDispatch({ type: 'close' });
        disableMutation.mutate({ id: connectionId }, {
            onSuccess: () => {
                queryClient.invalidateQueries([CACHE_KEYS.ConnectionRestApiStatus_GET, connectionId]);
                enqueueSnackbar('Realtime sync service has been disabled.');
            },
            onError: (error) => {
                enqueueSnackbar('Something went wrong while disabling the Realtime sync service. Error: ' + error, { variant: 'error' });
            }
        });
    };

    return (
        <>
            <DisableWebhooksDialog
                dispatch={disableRealtimeDialogDispatch}
                state={disableRealtimeDialogState}
                onConfirm={handleDisableRealtimeSync}
            />
            <ContentSection
                title='Realtime Data Sync'
                headerProps={{
                    status: !isLoading && serviceStatusIndicator
                        ? {
                            status: serviceStatusIndicator.status,
                            label: serviceStatusIndicator.label,
                            message: serviceStatusIndicator.message,
                        }
                        : undefined,
                    buttonsSlot: <>{!isEnabling && <Button
                        label='Disable Realtime Sync'
                        variant='outlined'
                        color='error'
                        disabled={shouldDisableDisableButton}
                        onClick={() => disableRealtimeDialogDispatch({ type: 'open' })}
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
                        severity='info'
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
                                ariaLabel='Webhook base path'
                                message={webhookStatus?.basePath + '/{TABLE_NAME}'} />
                            <IconButton
                                tooltipText='Copy webhook base path to clipboard'
                                icon='CopyAllRounded'
                                color='primary'
                                onClick={handleWebhookLinkCopy} />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', pt: 2, gap: 1 }}>
                            <Typography>Username: {webhookUsername}</Typography>
                            <IconButton
                                tooltipText='Copy webhook username to clipboard'
                                icon='CopyAllRounded'
                                color='primary'
                                onClick={handleWebhookUsernameCopy} />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', pt: 2, gap: 1 }}>
                            <Typography>Password: {webhookPassword}</Typography>
                            <IconButton
                                tooltipText='Copy webhook password to clipboard'
                                icon='CopyAllRounded'
                                color='primary'
                                onClick={handleWebhookPasswordCopy} />
                        </Box>
                    </Stack>
                </ContentSection>
            }

        </>

    );
};

