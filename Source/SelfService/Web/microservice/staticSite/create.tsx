// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import { Stack } from '@fluentui/react/lib/Stack';

import { HttpResponseApplication } from '../../api/application';
import { Typography } from '@mui/material';

const stackTokens = { childrenGap: 15 };

type Props = {
    application: HttpResponseApplication
    environment: string
};

export const Create: React.FunctionComponent<Props> = (props) => {
    const _props = props!;
    return (
        <Stack tokens={stackTokens}>
            <Typography variant='h1' my={2}>TODO Static Site</Typography>
            <Typography variant='h2' my={2}>Env: {_props.environment}</Typography>
            <Typography variant='h2' my={2}>CustomerID: {_props.application.customerId}</Typography>
        </Stack>
    );
};
