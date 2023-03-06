// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { Typography } from '@mui/material';

export type PageProps = {
    title: string;
    children?: React.ReactNode;
};

export const Page = ({title, children}: PageProps) => {
    return (
        <>
            <Typography variant='h1'>{title}</Typography>
            {children}
        </>
    );
};

