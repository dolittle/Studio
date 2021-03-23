// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
// A sneaky comment to trigger a build

import React, { useState } from 'react';
import { AppViewModel } from './AppViewModel';
import { withViewModel } from '@dolittle/vanir-react';
import { DetailsList, Dropdown, IColumn, IconButton, Stack, IDropdownOption } from '@fluentui/react';
import { BackupForListing, BackupLink } from './BackupForListing';


export const App = withViewModel(AppViewModel, ({ viewModel }) => {
    const RenderClipboard = (item: BackupForListing, index?: number, column?: IColumn) => {
        return (
            <IconButton iconProps={{ iconName: 'PasteAsText' }} onClick={async () => {
                const share: BackupLink = await viewModel.getBackupLink(item);
                navigator.clipboard.writeText(share.url);
            }} />
        );
    };

    const RenderDownload = (item: BackupForListing, index?: number, column?: IColumn) => {
        return (
            <IconButton iconProps={{ iconName: 'Download' }} onClick={async () => {
                const share: BackupLink = await viewModel.getBackupLink(item);
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

    const [selectedItem, setSelectedItem] = useState<IDropdownOption>();

    const tenantOptions: IDropdownOption[] = [];
    viewModel.applications?.applications?.map((application, index) => {
        const tenant = viewModel.applications.tenant;
        const name = `${application.name} ${application.environment}`;

        tenantOptions.push({
            key: `${application.name}-${application.environment}`,
            text: name,
            data:
            {
                tenant,
                application
            }
        } as IDropdownOption);
    });

    return (
        <>
            <Stack>
                <Dropdown
                    label="Applications"
                    options={tenantOptions}
                    selectedKey={selectedItem ? selectedItem.key : undefined}
                    onChange={(event, item) => {
                        setSelectedItem(item);
                        if (item) {
                            viewModel.populateBackupsFor(item.data.application.name, item.data.application.environment);
                        }
                    }} />
                <DetailsList
                    columns={columns}
                    items={viewModel.backups}
                />
            </Stack>
        </>
    );
});
