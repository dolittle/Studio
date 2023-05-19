// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Card, CardActions, CardActionArea, CardContent, CardHeader, Typography } from '@mui/material';

/**
 * The props for a {@link SimpleCard} component.
 */
type SimpleCardProps = {
    /**
     * The `title` of the card.
     */
    title: string;

    /**
     * The `subtitle` of the card.
     */
    subtitle?: string;

    /**
     * The `description` of the card.
     */
    description: string;

    /**
     * The `actions` of the card.
     *
     * Add a {@link Button} or {@link IconButton} component.
     */
    actions: React.ReactNode;

    /**
     * Set alignment to `right` to align actions to the right.
     *
     * @default left
     */
    actionsAlignment?: 'left' | 'right';
};

/**
 * The {@link SimpleCard} component is used to display a simple card.
 * @param {SimpleCardProps} props - The {@link SimpleCardProps}.
 * @returns A {@link SimpleCard} component.
 */
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
