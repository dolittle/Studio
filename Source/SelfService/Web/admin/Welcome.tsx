// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Link } from 'react-router-dom';

import { Typography } from '@mui/material';

import { Button } from '@dolittle/design-system';

export const Welcome = () =>
    <>
        <Typography variant='h1' my={2}>Hello Admin</Typography>

        <Button
            label='Take me to the Customers'
            variant='filled'
            endWithIcon='KeyboardDoubleArrowRight'
            overrides={{
                component: Link,
                to: '/admin/customers',
            }}
        />
    </>;
