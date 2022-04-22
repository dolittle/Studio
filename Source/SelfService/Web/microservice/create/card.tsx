// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { aTagBackgroundColor } from '../../theme/viewCard';
import { CardHeader } from '@mui/material';
import { red } from '@mui/material/colors';
import { useGlobalContext } from '../../stores/notifications';

const styles = {
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: (theme) => theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    button: {
        color: aTagBackgroundColor,
    }
};

type Props = {
    kind: string
    name: string
    description: string
    icon?: React.ReactNode
    onCreate: (kind: string) => void;
};

export const SimpleCard: React.FunctionComponent<Props> = (props) => {
    const { setNotification } = useGlobalContext();
    const name = props!.name;
    const description = props!.description;
    const kind = props!.kind;

    const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        event.preventDefault();
        props!.onCreate(kind);
    };

    const kindIcon = props!.icon;
    return (
        <Card key={`microservice-${kind}`}>
            <CardContent>
                <CardHeader
                    avatar={
                        kindIcon
                    }
                    title={
                        <Typography variant="h5" component="h2">
                            {name}
                        </Typography>
                    }
                    subheader={
                        <Typography variant="body2" component="h3">
                            Microservice
                        </Typography>
                    }
                />

                <Typography variant="body2" component="p">
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => {
                    setNotification('TODO: Learn more', 'info');
                }}>Learn More</Button>
                <Button sx={styles.button} size="small" onClick={onClick}>Create</Button>
            </CardActions>
        </Card>
    );
};
