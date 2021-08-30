// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { aTagBackgroundColor } from '../../theme/viewCard';
import { CardHeader, Avatar, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { red } from '@material-ui/core/colors';
import { useGlobalContext } from '../../stores/notifications';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
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
    }),
);

type Props = {
    kind: string
    name: string
    description: string
    icon?: React.ReactNode
    onCreate: (kind: string) => void;
};

export const SimpleCard: React.FunctionComponent<Props> = (props) => {
    const classes = useStyles();
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
                <Button className={classes.button} size="small" onClick={onClick}>Create</Button>
            </CardActions>
        </Card>
    );
};
