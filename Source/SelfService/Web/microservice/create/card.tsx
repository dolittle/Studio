// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Button, Card, CardActions, CardContent, CardHeader, Link, Typography } from '@mui/material';

const styles = {
    card: {
        'display': 'flex',
        'flexDirection': 'column',
        'justifyContent': 'space-between',
        'height': 1,
        ':hover': {
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.09) 0%, rgba(255, 255, 255, 0.09) 100%), #191A21',
            boxShadow: '0px 2px 4px - 1px rgba(0, 0, 0, 0.2), 0px 4px 5px rgba(0, 0, 0, 0.14), 0px 1px 10px rgba(0, 0, 0, 0.12)'
        }
    },
    button: {
        color: 'primary.main',
        lineHeight: '1.375rem',
        letterSpacing: '0.06em'
    },
    learnMoreLink: {
        color: 'text.primary',
        textDecoration: 'none'
    }
};

type SimpleCardProps = {
    kind: string
    name: string
    description: string
    onCreate: (kind: string) => void
};

export const SimpleCard = ({ kind, name, description, onCreate }: SimpleCardProps) => {

    const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        event.preventDefault();
        onCreate(kind);
    };

    return (
        <Card key={`microservice-${kind}`} sx={styles.card} elevation={1}>
            <CardHeader title={<Typography variant="h5">{name}</Typography>} />

            <CardContent>
                <Typography variant='body2'>{description}</Typography>
            </CardContent>

            <CardActions>
                <Button sx={styles.button}>
                    <Link
                        sx={{ ...styles.button, ...styles.learnMoreLink }}
                        href='https://dolittle.io/docs/platform/requirements/'
                        target='_blank'
                    >
                        Learn more
                    </Link>
                </Button>

                <Button sx={styles.button} size="small" onClick={onClick}>Deploy</Button>
            </CardActions>
        </Card>
    );
};
