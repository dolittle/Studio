// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { Box, Card as MuiCard, CardHeader, CardActionArea, CardActions, CardContent, Collapse, List, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';

import { Button, Icon, SvgIconsDefinition } from '@dolittle/design-system';

/**
 * The props for a {@link SelectCard} component.
 */
type SelectCardProps = {
    /**
     * The icon to display in the card.
     */
    icon: SvgIconsDefinition['icon'];

    /**
     * The title of the card.
     */
    title: string;

    /**
     * The description of the card.
     */
    description: string;

    /**
     * The title of the list.
     */
    listTitle: string;

    /**
     * The list items.
     */
    listItems: string[];

    /**
     * The title of the footer.
     */
    footerTitle: string;

    /**
     * The text of the footer.
     */
    footerText: string;
};

/**
 * Select Card is a expandable component that displays a card with a title, description, list of items and a footer.
 * @param {SelectCardProps} props - The {@link SelectCardProps} that contains the properties for the Select Card component.
 * @returns A {@link SelectCard} component.
 */
export const SelectCard = ({ icon, title, description, listTitle, listItems, footerTitle, footerText }: SelectCardProps) => {
    const [isCardExpanded, setCardIsExpanded] = useState(false);
    const toggleCardIsExpanded = () => setCardIsExpanded(!isCardExpanded);

    const styles = {
        card: {
            'maxWidth': 316,
            'border': '1px solid',
            'borderColor': isCardExpanded ? 'primary.main' : 'transparent',
            'backgroundColor': isCardExpanded ? theme => `${alpha(theme.palette.primary.main, 0.16)}` : 'background.paper',
            '&:hover': {
                backgroundColor: theme => `${alpha(theme.palette.primary.main, 0.16)}`,
                borderColor: 'primary.main',
            },
        },
        wrapper: {
            p: 3,
            minHeight: 300,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
        },
    };

    return (
        <MuiCard elevation={0} sx={styles.card}>
            <CardActionArea component='div' onClick={toggleCardIsExpanded} sx={styles.wrapper}>
                <Box sx={{ width: 1 }}>
                    <CardHeader avatar={<Icon color='primary' icon={icon} />} sx={{ p: 0, pb: 3.25 }} />

                    <CardContent sx={{ p: 0, pb: 3 }}>
                        <Typography variant='h4' sx={{ pb: 3.5 }}>{title}</Typography>
                        <Typography>{description}</Typography>
                    </CardContent>
                </Box>

                <Collapse in={isCardExpanded} timeout='auto' unmountOnExit sx={{ width: 1 }}>
                    <CardContent sx={{ p: 0, pb: 3 }}>
                        <Typography variant='subtitle2' gutterBottom>{listTitle}</Typography>

                        <List sx={{ listStyle: 'disc', px: 3, pb: 3 }}>
                            {listItems.map((item, index) => (
                                <li key={index}>
                                    <Typography>{item}</Typography>
                                </li>
                            ))}
                        </List>

                        <Typography variant='subtitle2' gutterBottom>{footerTitle}</Typography>
                        <Typography>{footerText}</Typography>
                    </CardContent>
                </Collapse>

                <CardActions sx={{ width: 1, p: 0 }}>
                    <Button
                        label={isCardExpanded ? 'selected' : 'select'}
                        variant='outlined'
                        startWithIcon={isCardExpanded ? <Icon icon='CheckRounded' /> : undefined}
                        isFullWidth
                        onClick={toggleCardIsExpanded}
                    />
                </CardActions>
            </CardActionArea>
        </MuiCard>
    );
};
