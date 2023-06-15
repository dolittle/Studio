// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Card, CardActions, CardContent, CardHeader, Typography } from '@mui/material';

const styles = {
    'display': 'flex',
    'flexDirection': 'column',
    'justifyContent': 'space-between',
    'height': 1,
    ':hover': {
        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.13) 0%, rgba(255, 255, 255, 0.13) 100%), #191A21',
    },
};

/**
 * The props for a {@link SimpleCard} component.
 */
export type SimpleCardProps = {
    /**
     * The title of the card.
     */
    title: string;

    /**
     * The subtitle of the card.
     */
    subtitle?: string;

    /**
     * The description of the card.
     */
    description: string;

    // TODO: Can I require this to be a Button or IconButton?
    /**
     * The actions of the card.
     *
     * Use {@link Button} or {@link IconButton} component for that.
     */
    actionButtons: React.ReactNode;

    /**
     * Set alignment of the action buttons.
     * @default left
     */
    actionButtonsAlignment?: 'left' | 'right';
};

/**
 * The {@link SimpleCard} component is used to display a simple card.
 * @param {SimpleCardProps} props - The {@link SimpleCardProps}.
 * @returns A {@link SimpleCard} component.
 */
export const SimpleCard = ({ title, subtitle, description, actionButtonsAlignment, actionButtons }: SimpleCardProps) =>
    <Card elevation={4} sx={styles}>
        <CardHeader title={<Typography variant='h4'>{title}</Typography>} subheader={subtitle} />

        <CardContent>
            <Typography variant='body1' color='text.secondary'>{description}</Typography>
        </CardContent>

        <CardActions sx={{ flexWrap: 'wrap', justifyContent: actionButtonsAlignment === 'right' ? 'flex-end' : 'flex-start' }}>
            {actionButtons}
        </CardActions>
    </Card>;
