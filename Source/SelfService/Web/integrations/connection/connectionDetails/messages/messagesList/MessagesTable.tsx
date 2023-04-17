// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Paper } from '@mui/material';
import { DataGridPro, GridColDef } from '@mui/x-data-grid-pro';
import { useNavigate } from 'react-router-dom';

import { DataTableToolbar } from '@dolittle/design-system';
import { ContentContainer } from '../../../../../components/layout/Content/ContentContainer';
import { ContentHeader } from '../../../../../components/layout/Content/ContentHeader';
import { ContentSection } from '../../../../../components/layout/Content/ContentSection';

import { MessageMappingModel } from '../../../../../apis/integrations/generated';

import { formatDate } from '../../../../../utils/helpers/dates';
import { defaultEmptyDate } from './helpers';

const messagesDataColumns: GridColDef<MessageMappingModel>[] = [
    {
        field: 'name',
        headerName: 'Message Type',
        // minWidth: 270,
        flex: 1,
    },
    {
        field: 'description',
        headerName: 'Description',
        // minWidth: 270,
        flex: 1,
    },
    {
        field: 'fromTable.name',
        headerName: 'Table Name',
        // minWidth: 270,
        flex: 1,
        valueGetter: (params) => params.row.fromTable?.name,
    },
    {
        field: 'fieldMappings',
        headerName: 'No. of Mapped Fields',
        // minWidth: 270,
        flex: 1,
        valueGetter: (params) => params.row.fieldMappings?.length,
    },
    {
        field: 'deployedAt',
        headerName: 'Last Deployed',
        //minWidth: 270,
        flex: 1,
        valueGetter: (params) => {
            return params.row.deployedAt && params.row.deployedAt.toISOString() !== defaultEmptyDate.toISOString()
                ? formatDate(params.row.deployedAt)
                : '-';
        },
    },
];

const messagesToolbarButtons = [
    {
        label: 'Delete messages',
        startWithIcon: 'DeleteRounded',
        disabled: true,
    } as const,
    {
        label: 'Copy Messages to...',
        startWithIcon: 'CopyAllRounded',
        disabled: true,
    } as const,
    {
        label: 'Deploy message(s)...',
        startWithIcon: 'RocketLaunch',
        disabled: true,
    } as const,
];

export type MessagesTableProps = {
    rows: any[];
    loading?: boolean;
};

export const MessagesTable = ({ rows }: MessagesTableProps) => {
    const navigate = useNavigate();

    const onTableRowClick = (row: MessageMappingModel): void => {
        navigate(`edit/${row.fromTable?.name!}/${row.name}`);
    };

    return (
        <ContentContainer>
            <ContentHeader
                title='Your Messages'
                buttons={messagesToolbarButtons}
                titleTextVariant='subtitle'
                sx={{ minHeight: 64 }}
            />
            <ContentSection sx={{ mx: -2 }}>
                <DataGridPro
                    rows={rows}
                    columns={messagesDataColumns}
                    //loading={loading}
                    headerHeight={46}
                    getRowHeight={() => 'auto'}
                    onRowClick={({ row }) => onTableRowClick(row as MessageMappingModel)}
                    autoHeight
                    hideFooter
                    disableColumnMenu
                    checkboxSelection
                    disableSelectionOnClick
                />
            </ContentSection>
        </ContentContainer>
    );
};
