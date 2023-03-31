// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { Box } from '@mui/material';
import { SectionDivider } from './SectionDivider';
import { CardHeader } from './CardHeader';

export type CardSectionProps = {
    title: string;
    children?: React.ReactNode;
};


export const CardSection = ({ title, children }: CardSectionProps) => {
    return (
        <>
            <SectionDivider />
            <Box sx={{my: 2}}>
                <CardHeader title={title} titleTextVariant='subtitle' />
                {children}
            </Box>
        </>
    );
};
