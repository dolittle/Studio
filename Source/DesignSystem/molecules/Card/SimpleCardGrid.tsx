// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Grid } from '@mui/material';

import { SimpleCard, SimpleCardProps } from './SimpleCard';

export type SimpleCardGridProps = {
    simpleCardItems: SimpleCardProps[];
};

export const SimpleCardGrid = ({ simpleCardItems }: SimpleCardGridProps) =>
    <Grid container spacing={3} sx={{ maxWidth: 1536 }}>
        {simpleCardItems.map(item =>
            <Grid key={item.title} item xs={12} md={6} xl={4}>
                <SimpleCard {...item} />
            </Grid>
        )}
    </Grid>;
