// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';
import { AppViewModel } from './AppViewModel';
import { withViewModel } from '@dolittle/vanir-react';
import { DetailsList, Dropdown, IColumn, IconButton, Stack, IDropdownOption } from '@fluentui/react';
import { BackupForListing, BackupLink } from './BackupForListing';






export const App = withViewModel(AppViewModel, ({ viewModel }) => {
    const RenderClipboard = (item: BackupForListing, index?: number, column?: IColumn) => {
        return (
            <IconButton iconProps={{ iconName: 'PasteAsText' }} onClick={async () => {
                let share:BackupLink = await viewModel.getBackupLink(item);
                navigator.clipboard.writeText(share.url);
            }} />
        );
    };

    const RenderDownload = (item: BackupForListing, index?: number, column?: IColumn) => {
        return (
            <IconButton iconProps={{ iconName: 'Download' }} onClick={async  () => {
                let share:BackupLink = await viewModel.getBackupLink(item);
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

    let tenantOptions: IDropdownOption[] = [];
    viewModel.applications.forEach(customer => {
        customer.domains.map(domain => {
            let name = `${customer.tenant.name}/${domain.name}/`;
            tenantOptions.push({ key: domain.name, text: name } as IDropdownOption);
        })
    })

    return (
        <>
            <Stack>
                <Dropdown
                    label="Tenant"
                    options={tenantOptions}
                    selectedKey={selectedItem ? selectedItem.key : undefined}
                    onChange={(event, item) => {
                        setSelectedItem(item);
                        if (item) {
                            viewModel.populateBackupsFor(item.key as string);
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
