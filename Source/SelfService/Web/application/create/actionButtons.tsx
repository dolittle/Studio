// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Button } from '@dolittle/design-system';

export const ActionButtons = () =>
    <>
        <Button label='Cancel' secondary href='/applications' sx={{ mr: 8 }} />
        <Button label='Create' type='submit' />
    </>;
