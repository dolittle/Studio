// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { Divider } from '@mui/material';

export type CardSectionProps = {
    title?: string;
    children?: React.ReactNode;
};


export const CardSection = ({ title, children }: CardSectionProps) => {
    return (
        <>
            <Divider />
            {title}
            {children}
        </>
    );
};
