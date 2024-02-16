// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useMemo, useState } from 'react';

import { Typography } from '@mui/material';
import { DataGridPro, GridColDef, GridFilterModel, GridRowId } from '@mui/x-data-grid-pro';

import { AlertBox, Button, ContentDivider, ContentWithSubtitle, DataGridCustomToolbar, DataGridWrapper, dataGridDefaultProps, TextField } from '@dolittle/design-system';

import { useConnectionsIdMetadataProgramsProgramProgramGet } from '../../../../../apis/integrations/programMetadataApi.hooks';

type ProgramTransaction = {
    name: string;
    description: string;
};

const programTransactionColumns: GridColDef<ProgramTransaction>[] = [
    {
        field: 'name',
        headerName: 'Transaction name',
        minWidth: 400,
    },
    {
        field: 'description',
        headerName: 'Description',
        minWidth: 400,
    },
];

const programTransactionDummyData: ProgramTransaction[] = [
    {
        name: 'GetCustomer',
        description: 'Get customer details',
    },
    {
        name: 'GetPayment',
        description: 'Get payment details',
    },
    {
        name: 'GetProduct',
        description: 'Get product details',
    },
    {
        name: 'GetOrder',
        description: 'Get order details',
    },
    {
        name: 'GetInvoice',
        description: 'Get invoice details',
    },
    {
        name: 'GetShipment',
        description: 'Get shipment details',
    },
    {
        name: 'GetSupplier',
        description: 'Get supplier details',
    },
    {
        name: 'GetEmployee',
        description: 'Get employee details',
    },
    {
        name: 'GetWarehouse',
        description: 'Get warehouse details',
    },
    {
        name: 'GetInventory',
        description: 'Get inventory details',
    },
    {
        name: 'GetPrice',
        description: 'Get price details',
    },
    {
        name: 'GetCurrency',
        description: 'Get currency details',
    },
    {
        name: 'GetTax',
        description: 'Get tax details',
    },
    {
        name: 'GetPaymentTerm',
        description: 'Get payment term details',
    },
    {
        name: 'GetCustomerGroup',
        description: 'Get customer group details',
    },
    {
        name: 'GetSalesOrder',
        description: 'Get sales order details',
    },
    {
        name: 'GetPurchaseOrder',
        description: 'Get purchase order details',
    },
    {
        name: 'GetSalesInvoice',
        description: 'Get sales invoice details',
    },
    {
        name: 'GetPurchaseInvoice',
        description: 'Get purchase invoice details',
    },
    {
        name: 'GetSalesShipment',
        description: 'Get sales shipment details',
    },
    {
        name: 'GetPurchaseShipment',
        description: 'Get purchase shipment details',
    },
    {
        name: 'GetSalesReturn',
        description: 'Get sales return details',
    },
    {
        name: 'GetPurchaseReturn',
        description: 'Get purchase return details',
    },
    {
        name: 'GetSalesCreditNote',
        description: 'Get sales credit note details',
    },
    {
        name: 'GetPurchaseCreditNote',
        description: 'Get purchase credit note details',
    },
    {
        name: 'GetSalesDebitNote',
        description: 'Get sales debit note details',
    },
    {
        name: 'GetPurchaseDebitNote',
        description: 'Get purchase debit note details',
    },
];

export type CommandSectionProps = {
    connectionId: string;
    selectedProgramName: string;
    onBackToSearchResultsClicked: () => void;
};

export const CommandSection = ({ connectionId, selectedProgramName, onBackToSearchResultsClicked }: CommandSectionProps) => {
    const [quickFilterValue, setQuickFilterValue] = useState<string>('');
    const [selectionModel, setSelectionModel] = useState<GridRowId[]>([]);

    // TODO: Needs error handling.
    const query = useConnectionsIdMetadataProgramsProgramProgramGet({ id: connectionId, program: selectedProgramName });

    // const { data: mappableTableResult, isLoading, isInitialLoading } = useConnectionsIdMessageMappingsTablesTableGet({
    //     id: connectionId,
    //     table: selectedTableName,
    // });

    const searchResults = query.data || [];

    const gridFilters: GridFilterModel = useMemo(() => {
        return {
            items: [],
            // Apply search term if provided.
            quickFilterValues: [quickFilterValue?.trim() || undefined],
        };
    }, [quickFilterValue]);

    const selectedRowName = selectionModel.length ? `Selected: ${selectionModel[0]}` : '';

    console.log('searchResults', searchResults);

    return (
        <ContentWithSubtitle
            title={`Selected program: ${selectedProgramName}`}
            rightAction={
                <Button label='Back To Search Results' startWithIcon='ArrowBack' color='subtle' onClick={onBackToSearchResultsClicked} />
            }
        >
            <Typography sx={{ mb: 4 }}>{`This displays all the transactions that are available for '${selectedProgramName}' program.`}</Typography>

            <TextField
                placeholder='Search API (transaction)'
                isFullWidth
                startIcon='Search'
                variant='outlined'
                onValueChange={event => setQuickFilterValue(event.target.value)}
            />

            <DataGridWrapper background='dark' sx={{ height: 300, mt: 3 }}>
                <DataGridPro
                    {...dataGridDefaultProps}
                    rows={programTransactionDummyData}
                    columns={programTransactionColumns}
                    getRowId={row => row.name}
                    autoHeight={false}
                    disableSelectionOnClick={false}
                    filterModel={gridFilters}
                    //checkboxSelection // TODO: Only one row can be selected at a time.
                    selectionModel={selectionModel}
                    onSelectionModelChange={setSelectionModel}
                    components={{
                        Toolbar: () => <DataGridCustomToolbar title='Select transaction:'>{selectedRowName}</DataGridCustomToolbar>
                    }}
                />
            </DataGridWrapper>

            <ContentDivider sx={{ mt: 3 }} />

            <Button label='Save New Command' variant='fullwidth' type='submit' disabled={!selectionModel.length} sx={{ mt: 2 }} />
        </ContentWithSubtitle>
    );
};
