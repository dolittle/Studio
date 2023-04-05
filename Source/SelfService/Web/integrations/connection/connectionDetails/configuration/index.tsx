// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, Grid, Paper, Stack, Typography } from '@mui/material';

import { Accordion, Button, Form, Icon, Input, Select } from '@dolittle/design-system';

export const ConfigurationView = () => {
    return (
        <Box sx={{ mt: 8, ml: 2 }}>
            <Typography variant='subtitle1'>Configuration Setup</Typography>

            <Box sx={{ display: 'flex', mt: 4, gap: 2 }}>
                <Button label='Edit' startWithIcon={<Icon icon='EditRounded' />} />
                <Button label='Save' startWithIcon={<Icon icon='SaveRounded' />} disabled />
                <Button label='Delete Connection' startWithIcon={<Icon icon='DeleteRounded' />} />
            </Box>

            <Form
                initialValues={{
                    connectorName: 'M3 Connector Test',
                    selectHosting: 'On premises',
                }}
            >
                <Stack spacing={3} sx={{ mt: 6, ml: 4 }}>
                    <Input id='connectorName' label='Connector Name' required />
                    <Select
                        id='selectHosting'
                        label='Hosting'
                        options={[
                            { value: 'On premises', displayValue: 'On Premise' },
                            { value: 'Cloud', displayValue: 'In the Dolittle Cloud' },
                        ]}
                        disabled
                    />
                </Stack>

                <Accordion
                    id='ConnectorBundleConfiguration'
                    title='Host Your Connector Bundle'
                    progressStatus='connected'
                    sx={{ mt: 8 }}
                >

                </Accordion>

                <Accordion
                    id=''
                    title='Metadata Publisher Credentials'
                    progressStatus='connected'
                    sx={{ mt: 8 }}
                >

                </Accordion>

                <Accordion
                    id=''
                    title='ION Service Account Credentials'
                    progressStatus='connected'
                    sx={{ mt: 8 }}
                >

                </Accordion>

            </Form>
        </Box>
    );
};
