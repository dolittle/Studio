// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';
import { AppViewModel } from './AppViewModel';
import { withViewModel } from '@dolittle/vanir-react';
import { DetailsList, Dropdown, IColumn, IconButton, Stack, IDropdownOption } from '@fluentui/react';
import { BackupForListing } from './BackupForListing';
import { Guid } from '@dolittle/rudiments';

const RenderDownload = (item?: BackupForListing, index?: number, column?: IColumn) => {
    return (
        <IconButton iconProps={{ iconName: 'Download' }} onClick={() => {
            window.open(`https://download.stuff/${item?.applicationId}/${item?.microserviceId}`, '_blank');
        }} />
    );
};

const RenderClipboard = (item?: BackupForListing, index?: number, column?: IColumn) => {
    return (
        <IconButton iconProps={{ iconName: 'PasteAsText' }} onClick={() => {
            navigator.clipboard.writeText(`Better download this : ${item?.applicationId} - ${item?.microserviceId}`);
        }} />
    );
};

export const App = withViewModel(AppViewModel, ({ viewModel }) => {

    const columns: IColumn[] = [
        {
            key: 'Id',
            fieldName: 'id',
            name: 'Id',
            minWidth: 50
        },
        {
            key: 'Name',
            fieldName: 'name',
            name: 'Name',
            minWidth: 150
        },
        {
            key: 'Date',
            fieldName: 'date',
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
    console.log(viewModel.tenants);
    const tenantOptions = viewModel.tenants.map(_ => {
        return { key: _.name, text: _.name } as IDropdownOption;
    });


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
                            viewModel.populateBackupsFor(Guid.parse(item.key.toString()));
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
