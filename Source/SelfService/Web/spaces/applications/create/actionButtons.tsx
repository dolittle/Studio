// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useHref } from 'react-router-dom';
import { Button } from '@dolittle/design-system';

export const ActionButtons = () => {
    const applicationsHref = useHref('/applications/');

    return (
        <>
            <Button label='Cancel' color='subtle' href={applicationsHref} sx={{ mr: 8 }} />
            <Button label='Create' type='submit' />
        </>
    );
};
