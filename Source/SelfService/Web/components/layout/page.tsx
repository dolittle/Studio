// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Typography } from '@mui/material';

import { usePageTitle } from '../../utils/usePageTitle';

export type PageProps = {
    title: string;
    children?: React.ReactNode;
};

export const Page = ({ title, children }: PageProps) => {
    usePageTitle(title);

    return (
        <>
            <Typography variant='h1' my={2}>{title}</Typography>
            {children}
        </>
    );
};
