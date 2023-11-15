// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useCallback, useState } from 'react';

import { Box, Stack, Typography } from '@mui/material';
import { DataGridPro, DataGridProProps, GridRowId } from '@mui/x-data-grid-pro';

import {
    Button,
    ContentContainer,
    ContentWithSubtitle,
    Checkbox,
    dataGridDefaultProps,
    DataGridWrapper,
    DetailPanelExpandIcon,
    DetailPanelCollapseIcon,
    Form,
    FormDialog,
    InlineWrapper,
    Input,
    LoadingSpinner,
    NoContentSection,
    Select,
} from '@dolittle/design-system';

const dummyData = [
    {
        id: '1',
        name: 'Create Customer',
        nameSpace: 'Customer',
        description: 'Creates a new customer.',
    },
    {
        id: '2',
        name: 'Update Customer',
        nameSpace: 'Customer',
        description: 'Updates an existing customer.',
    },
    {
        id: '3',
        name: 'Delete Customer',
        nameSpace: 'Customer',
        description: 'Deletes an existing customer.',
    },
];

const commandsDataGridColumns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'nameSpace', headerName: 'Name Space', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 1 },
];

type CommandsFormParameters = {
    name: string;
    nameSpace: string;
    description: string;
};

export const CommandsView = () => {
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(false);
    const [isCreatingCommand, setIsCreatingCommand] = useState(false);
    const [isCommandsLoading, setIsCommandsLoading] = useState(false);

    const [detailPanelExpandedRowIds, setDetailPanelExpandedRowIds] = useState<GridRowId[]>([]);

    const [hasRows, setHasRows] = useState(false);

    if (isPageLoading) return <LoadingSpinner />;

    const handleCommandCreate = ({ name, nameSpace, description }: CommandsFormParameters) => {
        setIsCreatingCommand(true);

        const data = {
            name,
            nameSpace,
            description,
        };

        setHasRows(true);

        setIsCreateDialogOpen(false);
        setIsCreatingCommand(false);
    };

    const handleDetailPanelExpandedRowIdsChange = (newIds: GridRowId[]) => {
        if (detailPanelExpandedRowIds) {
            // Remove previously expanded row id so only one panel can be expanded at the same time.
            newIds = newIds.slice(-1);
            setDetailPanelExpandedRowIds(newIds);
        } else {
            setDetailPanelExpandedRowIds(newIds);
        }
    };

    const CommandsDetailPanelContent = ({ row }: any) => {
        return (
            <Box sx={{ m: 3, ml: 8 }}>
                <Typography variant='subtitle1' sx={{ pb: 4 }}>
                    {row.name}
                </Typography>

                <Form
                    initialValues={{
                        nameSpace: row.nameSpace,
                        description: row.description,
                    }}
                    onSubmit={() => { }}
                >
                    <Stack spacing={2} sx={{ width: 220 }}>
                        <Input id='nameSpace' label='Namespace' />
                        <Input id='endpoint' label='Endpoint' />
                    </Stack>

                    <Typography variant='subtitle1' sx={{ pt: 4 }}>
                        Parameters
                    </Typography>

                    <InlineWrapper sx={{ alignItems: 'flex-start' }}>
                        <Stack sx={{ mt: 2, width: 150 }}>
                            <Typography variant='body2'>
                                M3 Arguments
                            </Typography>

                            <Checkbox id='m3-arg-1' label='CFAB' />
                            <Checkbox id='m3-arg-2' label='FACI' />
                            <Checkbox id='m3-arg-3' label='CHID' />
                        </Stack>

                        <Stack spacing={1} sx={{ mt: 2, width: 400 }}>
                            <Typography variant='body2'>
                                Parameter Name
                            </Typography>

                            <InlineWrapper>
                                <Typography sx={{ width: 150 }}>Facility Name</Typography>
                                <Input id='facilityName' label='Facility Name' />
                            </InlineWrapper>

                            <InlineWrapper>
                                <Typography sx={{ width: 150 }}>Facility</Typography>
                                <Input id='facility' label='Facility' />
                            </InlineWrapper>

                            <InlineWrapper>
                                <Typography sx={{ width: 150 }}>Changed By</Typography>
                                <Input id='changedBy' label='Changed By' />
                            </InlineWrapper>
                        </Stack>

                        <Stack spacing={1} sx={{ mt: 2, mx: 4, width: 150 }}>
                            <Typography variant='body2'>
                                Mode
                            </Typography>

                            <Select
                                id='mode'
                                label='Mode'
                                options={[
                                    { value: 'Create', displayValue: 'Create' },
                                    { value: 'Update', displayValue: 'Update' },
                                    { value: 'Delete', displayValue: 'Delete' },
                                ]}
                            />
                        </Stack>

                        <Stack spacing={1} sx={{ mt: 2 }}>
                            <Typography variant='body2'>
                                Default Value
                            </Typography>

                            <Input id='value1' label='' />
                            <Input id='value2' label='' />
                        </Stack>
                    </InlineWrapper>

                    <Button label='Add Parameter' type='submit' variant='filled' sx={{ mt: 6 }} />
                </Form>
            </Box>
        );
    };

    const getDetailPanelContent = useCallback<NonNullable<DataGridProProps['getDetailPanelContent']>>(({ row }) =>
        <CommandsDetailPanelContent row={row} />, []);

    const getDetailPanelHeight = useCallback(() => 'auto', []);

    return (
        <>
            <FormDialog
                id='create-command'
                title='Create a new command'
                description='Create a new command for the connection.'
                isOpen={isCreateDialogOpen}
                onCancel={() => setIsCreateDialogOpen(false)}
                submitBtnLabel='Create'
                onSubmit={handleCommandCreate}
                isLoading={isCreatingCommand}
                formInitialValues={{
                    name: '',
                    nameSpace: '',
                    description: '',
                } as CommandsFormParameters}
            >
                <Input id='name' label='Command Name' required />
                <Input id='nameSpace' label='Namespace' />
                <Input id='description' label='Command Description' />
            </FormDialog>

            <ContentContainer sx={{ py: 2 }}>
                <Typography variant='subtitle1' sx={{ pb: 4 }}>
                    Commands
                </Typography>

                <Typography>
                    This is where you can manage your commands. Needs better description.
                </Typography>

                <ContentWithSubtitle title='Your Commands' infoTooltipLabel='This needs more info.'>
                    {hasRows ? (
                        <DataGridWrapper background='dark'>
                            <DataGridPro
                                {...dataGridDefaultProps}
                                rows={dummyData}
                                columns={commandsDataGridColumns}
                                getRowId={row => row.name}
                                loading={isCommandsLoading}
                                getDetailPanelContent={getDetailPanelContent}
                                getDetailPanelHeight={getDetailPanelHeight}
                                detailPanelExpandedRowIds={detailPanelExpandedRowIds}
                                onDetailPanelExpandedRowIdsChange={handleDetailPanelExpandedRowIdsChange}
                                components={{
                                    DetailPanelExpandIcon,
                                    DetailPanelCollapseIcon,
                                }}
                            />
                        </DataGridWrapper>
                    ) : (
                        <NoContentSection
                            title='No commands yet...'
                            description={`To create a command to the connection, click the 'Create A Command' button.`}
                            label='Create a command'
                            onCreate={() => setIsCreateDialogOpen(true)}
                        />
                    )}
                </ContentWithSubtitle>
            </ContentContainer>
        </>
    );
};
