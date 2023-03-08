// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { Card as MuiCard, CardHeader, CardActionArea, CardActions, CardContent, Collapse, List, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';

import { Button, Icon, SvgIconsDefinition } from '@dolittle/design-system';

type CardProps = {
    icon: SvgIconsDefinition['icon'];
    title: string;
    description: string;
    listTitle: string;
    listItems: string[];
    footerTitle: string;
    footerText: string;
};

export const Card = ({ icon, title, description, listTitle, listItems, footerTitle, footerText }: CardProps) => {
    const [isCardExpanded, setCardIsExpanded] = useState(false);
    const toggleCardIsExpanded = () => setCardIsExpanded(!isCardExpanded);

    return (
        <MuiCard
            elevation={0}
            sx={{
                'maxWidth': 316,
                'border': '1px solid',
                'borderColor': isCardExpanded ? 'primary.main' : 'transparent',
                'backgroundColor': isCardExpanded ? theme => `${alpha(theme.palette.primary.main, 0.16)}` : 'background.paper',
                '&:hover': {
                    backgroundColor: theme => `${alpha(theme.palette.primary.main, 0.16)}`,
                    borderColor: 'primary.main',
                },
            }}
        >
            <CardActionArea onClick={toggleCardIsExpanded} sx={{ p: 3 }}>
                <CardHeader avatar={<Icon color='primary' icon={icon} />} sx={{ p: 0, pb: 3.25 }} />

                <CardContent sx={{ p: 0, pb: 3 }}>
                    <Typography variant='h4' sx={{ pb: 3.5 }}>{title}</Typography>
                    <Typography>{description}</Typography>
                </CardContent>

                <Collapse in={isCardExpanded} timeout='auto' unmountOnExit>
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

                <CardActions sx={{ p: 0 }}>
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
