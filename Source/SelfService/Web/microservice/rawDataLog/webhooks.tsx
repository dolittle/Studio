// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Stack } from '@fluentui/react/lib/Stack';
import { DetailsList, DetailsListLayoutMode, IColumn, CheckboxVisibility } from '@fluentui/react/lib/DetailsList';
import { MicroserviceRawDataLogIngestor, MicroserviceRawDataLogIngestorWebhookConfig } from '../../api/index';
import { Edit } from './webhook/edit';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { saveRawDataLogIngestorMicroservice } from '../../stores/microservice';


const stackTokens = { childrenGap: 15 };

// TODO this might not be right, in terms of webhook data (from the log)
type Props = {
    microservice: MicroserviceRawDataLogIngestor
};

type Item = {
    kind: string
    uriSuffix: string
    authorization: string
    lastMessage: string
};

const defaultWebhook = {
    kind: '',
    authorization: '',
    uriSuffix: '',
} as MicroserviceRawDataLogIngestorWebhookConfig;

export const Webhooks: React.FunctionComponent<Props> = (props) => {
    // TODO update microservice
    // TODO bubble up changes here
    const history = useHistory();
    const _props = props!;
    const microservice = _props.microservice;
    const [showWebhookEditor, setShowWebhookEditor] = useState(false);
    const [webhookToEdit, setWebhookToEdit] = useState(defaultWebhook);

    const renderAction = (item?: Item, index?: number, column?: IColumn) => {
        return (
            <Stack
                key={item!.uriSuffix}
                tokens={stackTokens}
                horizontal
            >
                <>
                    {/*<a onClick={() => {*/}
                    {/*    alert('TODO: View Sample');*/}
                    {/*}}>*/}
                    {/*    View Sample*/}
                    {/*</a>*/}

                    <a onClick={() => {
                        setWebhookToEdit(item as MicroserviceRawDataLogIngestorWebhookConfig);
                        setShowWebhookEditor(true);
                    }}>
                        Edit
                    </a>

                    <a onClick={async () => {
                        if (confirm('Delete webhook will stop future data arriving, are you sure? (will take upto a minute to take effect)')) {
                            const newWebhooks = microservice.extra.webhooks.filter(webhook => webhook.uriSuffix !== item!.uriSuffix);
                            microservice.extra.webhooks = newWebhooks;
                            await onSave(microservice);
                        }

                    }}>
                        Delete
                    </a>

                </>
            </Stack >
        );
    };

    const columns: IColumn[] = [
        { key: 'kind', name: 'Kind', fieldName: 'kind', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'uriSuffix', name: 'Suffix', fieldName: 'uriSuffix', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'lastMessage', name: 'Last Message', fieldName: 'lastMessage', minWidth: 100, maxWidth: 200, isResizable: true },
        { key: 'action', name: 'Action', minWidth: 50, maxWidth: 50, isResizable: true, onRender: renderAction },
    ];

    //const items: Item[] = fakeData;
    const webhooks = _props.microservice.extra.webhooks;
    const items: Item[] = webhooks.map(webhookConfig => {
        return {
            ...webhookConfig,
            lastMessage: '2021-06-01 13:05:30', // TODO
        } as Item;
    });


    const onSave = async (ms: MicroserviceRawDataLogIngestor): Promise<void> => {
        const data = await saveRawDataLogIngestorMicroservice(ms);
    };

    return (
        <>
            <Stack horizontal horizontalAlign="end" tokens={stackTokens}>
                <PrimaryButton text='Add Webhook' onClick={() => {
                    setShowWebhookEditor(showWebhookEditor ? false : true);
                    setWebhookToEdit(defaultWebhook);
                }} />
            </Stack>

            {showWebhookEditor && (
                <Edit
                    domain={'TODO'}
                    ingressPath={microservice.extra.ingress.path}
                    key={webhookToEdit.uriSuffix}
                    webhook={webhookToEdit}
                    onAfterSave={async (newWebhook: MicroserviceRawDataLogIngestorWebhookConfig) => {
                        const index = microservice.extra.webhooks.findIndex(webhook => webhook.uriSuffix === newWebhook.uriSuffix);
                        const newWebhooks = [...microservice.extra.webhooks];
                        if (index === -1) {
                            newWebhooks.push(newWebhook);
                        } else {
                            newWebhooks[index] = newWebhook;
                        }

                        try {
                            microservice.extra.webhooks = newWebhooks;
                            console.log(microservice.extra.webhooks);
                            await onSave(microservice);
                            setWebhookToEdit(defaultWebhook);
                            setShowWebhookEditor(false);
                        } catch (e) {
                            alert('Failed to add webhook');
                        }
                    }}
                />
            )}

            <DetailsList
                checkboxVisibility={CheckboxVisibility.hidden}
                items={items}
                columns={columns}
                setKey="set"
                layoutMode={DetailsListLayoutMode.justified}
            />
        </>
    );
};
