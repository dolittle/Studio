// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Card, CardActions, CardContent, CardHeader, Typography } from '@mui/material';

import { Button, ButtonProps } from '@dolittle/design-system';

const styles = {
    height: 1,
    maxWidth: 440,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
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

    /**
     * The secondary button of the card.
     * @param {ButtonProps} props - The {@link ButtonProps}.
     * @returns A {@link Button} component.
     */
    secondaryButton?: ButtonProps;

    /**
     * The primary button of the card.
     * @param {ButtonProps} props - The {@link ButtonProps}.
     * @returns A {@link Button} component.
     */
    primaryButton: ButtonProps;

    /**
     * Set alignment of the action buttons.
     * @default left
     */
    buttonAlignment?: 'left' | 'right';
};

/**
 * The {@link SimpleCard} component is used to display a simple card.
 * @param {SimpleCardProps} props - The {@link SimpleCardProps}.
 * @returns A {@link SimpleCard} component.
 */
export const SimpleCard = ({ title, subtitle, description, buttonAlignment, secondaryButton, primaryButton }: SimpleCardProps) =>
    <Card elevation={4} sx={styles}>
        <CardHeader title={<Typography variant='h4'>{title}</Typography>} subheader={subtitle} />

        <CardContent>
            <Typography variant='body1' color='text.secondary' sx={{ wordWrap: 'break-word' }}>
                {description}
            </Typography>
        </CardContent>

        <CardActions sx={{ flexWrap: 'wrap', justifyContent: buttonAlignment === 'right' ? 'flex-end' : 'flex-start' }}>
            {secondaryButton && <Button color='subtle' {...secondaryButton} />}
            {primaryButton && <Button {...primaryButton} sx={secondaryButton && { ml: 1 }} />}
        </CardActions>
    </Card>;
