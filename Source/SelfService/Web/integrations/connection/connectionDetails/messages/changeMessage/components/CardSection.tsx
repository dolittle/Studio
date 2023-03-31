// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { Box } from '@mui/material';
import { SectionDivider } from './SectionDivider';
import { CardHeader, CardHeaderProps } from './CardHeader';

export type CardSectionProps = {
    title?: string;
    hideHeader?: boolean;
    headerProps?: Partial<CardHeaderProps>
    children?: React.ReactNode;
};


export const CardSection = ({ title = '', hideHeader, headerProps, children }: CardSectionProps) => {
    return (
        <>
            <SectionDivider />
            <Box sx={{ my: 2 }}>
                {!hideHeader && <CardHeader title={title} titleTextVariant='subtitle' {...headerProps}/>}
                {children}
            </Box>
        </>
    );
};
