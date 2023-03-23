// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Stack } from '@mui/material';

import { Form, Input, Select, Tooltip } from '@dolittle/design-system';

const selectValues = [
    { value: 'On Premise', displayValue: 'On Premise' },
    { value: 'In the Dolittle Cloud', displayValue: 'In the Dolittle Cloud' }
];

const ConnectorNameTooltipText = () =>
    <>
        Provide a name for this M3 connector instance. You can have multiple M3 connectors.
        We recommend naming your connector based on its intended use. For example, <i>M3 Connector Test</i> or <i>M3 Connector Production</i>.
    </>;

const hostingTooltipText = `Currently, you can only setup the connection with on premise hosting. Soon, we will support setup in the 
cloud where Dolittle takes care of hosting, establishing backups and making sure the connector is running.`;

type InitialSetupParameters = {
    connectorName: string;
    selectHosting: string;
};

export const InitialSetupForm = () =>
    <Form<InitialSetupParameters>
        initialValues={{
            connectorName: '',
            selectHosting: 'On Premise',
        }}
        onSubmit={() => { }}
        sx={{ mt: 6.5 }}
    >
        <Stack spacing={3.5}>
            <Tooltip tooltipTitle='CONNECTOR NAME' tooltipText={<ConnectorNameTooltipText />}>
                <Input id='connectorName' label='Connector Name' required />
            </Tooltip>

            <Tooltip tooltipTitle='HOSTING' tooltipText={hostingTooltipText} displayOnHover>
                <Select id='selectHosting' label='Hosting' options={selectValues} required disabled />
            </Tooltip>
        </Stack>
    </Form>;
