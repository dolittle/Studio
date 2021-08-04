// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { mergeStyles } from '@fluentui/react/lib/Styling';
import { DetailsList, IColumn, IconButton, Stack } from '@fluentui/react';

import { HttpResponseApplications2 } from '../api/api';


import { BackupLink, getLink, BackupsForApplication, getBackupsByApplication, BackupLinkShareInput } from '../api/backups';

type BackupsDetailsList = {
    tenant: string;
    environment: string;
    application: string;
    file: string;
    when: string;
};

type Props = {
    application: HttpResponseApplications2
    environment: string
};

const conversationTileClass = mergeStyles({ height: 182 });


export const ListView: React.FunctionComponent<Props> = (props) => {
    const history = useHistory();
    const _props = props!;
    const application = _props.application;
    const environment = _props.environment;

    const [data, setData] = useState({} as BackupsForApplication);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        Promise.all([
            getBackupsByApplication(application.tenantId, application.name, environment)
        ]).then(values => {
            const _data = values[0];
            // TODO this should be unique
            // TODO also when we have more than one application and more than one environment we should default to something.
            setData(_data);
            setLoaded(true);
        });
    }, []);

    if (!loaded) {
        return null;
    }


    const backups: BackupsDetailsList[] = data.files.map<BackupsDetailsList>(file => {
        const parts = file.split('/');
        const when: string = parts[parts.length - 1].replace('.gz.mongodump', '');

        return {
            tenant: data.tenant.id,
            application: data.application,
            environment,
            file,
            when,
        };
    });

    const RenderClipboard = (item: BackupsDetailsList, index?: number, column?: IColumn) => {
        const input: BackupLinkShareInput = {
            tenant_id: item.tenant,
            application: item.application,
            environment: item.environment,
            file_path: item.file,
        };
        return (
            <IconButton iconProps={{ iconName: 'PasteAsText' }} onClick={async () => {
                const share: BackupLink = await getLink(input);
                navigator.clipboard.writeText(share.url);
            }} />
        );
    };

    const RenderDownload = (item: BackupsDetailsList, index?: number, column?: IColumn) => {
        const input: BackupLinkShareInput = {
            tenant_id: item.tenant,
            application: item.application,
            environment: item.environment,
            file_path: item.file,
        };
        console.log(input);
        return (
            <IconButton iconProps={{ iconName: 'Download' }} onClick={async () => {
                const share: BackupLink = await getLink(input);
                window.open(share.url, '_blank');
            }} />
        );
    };

    const columns: IColumn[] = [
        {
            key: 'Name',
            fieldName: 'file',
            name: 'Name',
            minWidth: 150
        },
        {
            key: 'Application',
            fieldName: 'application',
            name: 'Application',
            minWidth: 150
        },
        {
            key: 'Date',
            fieldName: 'when',
            name: 'Date',
            minWidth: 150
        },
        {
            key: 'Download',
            name: 'Download',
            minWidth: 50,
            onRender: RenderDownload
        },
        {
            key: 'Clipboard',
            name: 'Clipboard',
            minWidth: 50,
            onRender: RenderClipboard
        }
    ];

    return (
        <>
            <Stack>
                <DetailsList
                    columns={columns}
                    items={backups}
                />
            </Stack>
        </>
    );
};

