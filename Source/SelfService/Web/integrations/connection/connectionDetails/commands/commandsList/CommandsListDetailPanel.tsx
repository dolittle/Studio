// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, Stack, Typography } from '@mui/material';

import { Button, Checkbox, Form, InlineWrapper, Input, Select } from '@dolittle/design-system';

export const CommandsListDetailPanel = ({ row }: any) => {
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
