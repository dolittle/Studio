// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, Typography } from '@mui/material';

export const instructions = [
    `1. Open Infor ION API. Open the menu from the upper left corner and select 'Infor ION API'.`,
    `2. Select 'Authorized Apps' from the left hand menu followed by the '+' icon to add a new account.`,
    `3. Provide a name. Example: "Dolittle_Bridge".`,
    `4. Under 'Type', select 'Backend Service'.`,
    `5. Provide a description. Example: "Integration Connector".`,
    `6. Toggle on 'Use Bridge Authentication. Optional: You can toggle on ‘User Impersonation' if you would like to monitor specific user activity.`,
    `7. Click the save icon button.`,
    `8. Scroll down and click 'Download Credentials' button. If you would like to use an account you've previously created, you can access the account via 'Authorized Apps' then selecting the account name.`,
    `9. When the dialog pops up, toggle on 'Create Service Account' and provide a username from your M3 account you would like to associate with the ION service account.`,
    `10. Last, click 'Download'. Upload the files below.`,
];

const instructionsListItem = (items: string[]) => items.map((item, index) => <Typography key={index}>{item}</Typography>);

export const InstructionsList = () =>
    <Box sx={{ 'maxWidth': 660, 'pt': 3, 'pl': 3, '& p': { mb: 2 } }}>
        {instructionsListItem(instructions)}
    </Box>;
