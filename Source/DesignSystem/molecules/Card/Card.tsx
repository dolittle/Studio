// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { Card as MuiCard, CardHeader, CardActionArea, CardActions, CardContent, Collapse, List, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';

import { Button, Icon } from '@dolittle/design-system';

export const Card = () => {
    const [isCardexpanded, setCardIsExpanded] = useState(false);

    return (
        <MuiCard
            elevation={0}
            sx={{
                'maxWidth': 316,
                'border': '1px solid',
                'borderColor': isCardexpanded ? 'primary.main' : 'transparent',
                'backgroundColor': isCardexpanded ? theme => `${alpha(theme.palette.primary.main, 0.10)}` : 'background.paper',
                '&:hover': {
                    backgroundColor: theme => `${alpha(theme.palette.primary.main, 0.16)}`,
                    borderColor: 'primary.main',
                },
            }}
        >
            <CardActionArea onClick={() => setCardIsExpanded(!isCardexpanded)} sx={{ p: 3 }}>
                <CardHeader avatar={<Icon color='primary' icon='DnsRounded' />} sx={{ p: 0, pb: 3.25 }} />

                <CardContent sx={{ p: 0, pb: 3 }}>
                    <Typography variant='h4' sx={{ pb: 3.5 }}>On Premise</Typography>

                    <Typography variant='body1'>
                        Your team will be responsible for hosting, establishing backups and making sure the connector is running.
                    </Typography>
                </CardContent>

                <Collapse in={isCardexpanded} timeout='auto' unmountOnExit>
                    <CardContent sx={{ p: 0, pb: 3 }}>
                        <Typography variant='subtitle2' gutterBottom>{`What you'll need`}</Typography>

                        {/* TODO: Map them */}
                        <List sx={{ listStyle: 'disc', px: 3, pb: 3 }}>
                            <li><Typography>Docker</Typography></li>
                            <li><Typography>Firewall access</Typography></li>
                            <li><Typography>Ion M3 (and optionally the meta data publisher)</Typography></li>
                            <li><Typography>Admin level access to M3</Typography></li>
                            <li><Typography>Approximately 16gb ram</Typography></li>
                        </List>

                        <Typography variant='subtitle2' gutterBottom>Approximate setup time</Typography>

                        <Typography>10 min</Typography>
                    </CardContent>
                </Collapse>

                <CardActions sx={{ p: 0 }}>
                    <Button
                        label='select'
                        variant='outlined'
                        isFullWidth
                        onClick={() => setCardIsExpanded(!isCardexpanded)}
                    />
                </CardActions>
            </CardActionArea>
        </MuiCard>
    );
};
