// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Card, CardActions, CardActionArea, CardContent, CardHeader, Typography } from '@mui/material';

type SimpleCardProps = {
    title: string;
    subtitle?: string;
    description: string;
    actions: React.ReactNode;
    actionsAlignment?: 'left' | 'right';
};

export const SimpleCard = ({ title, subtitle, description, actionsAlignment, actions }: SimpleCardProps) =>
    <Card elevation={4} sx={{ maxWidth: 440 }}>
        <CardActionArea disableRipple sx={{ cursor: 'default' }}>
            <CardHeader title={<Typography variant='h4'>{title}</Typography>} subheader={subtitle} />

            <CardContent>
                <Typography variant='body1' color='text.secondary'>{description}</Typography>
            </CardContent>

            <CardActions sx={{ gap: 1, justifyContent: actionsAlignment === 'right' ? 'flex-end' : 'flex-start' }}>
                {actions}
            </CardActions>
        </CardActionArea>
    </Card>;
