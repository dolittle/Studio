// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { aTagBackgroundColor } from '../../theme/viewCard';
import { CardHeader, Avatar, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { red } from '@mui/material/colors';
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
