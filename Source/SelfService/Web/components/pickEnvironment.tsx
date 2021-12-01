// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { useHistory, generatePath } from 'react-router-dom';
import { HttpResponseApplication, ShortInfoWithEnvironment } from '../api/api';
import { List } from '@fluentui/react/lib/List';
import { useGlobalContext } from '../stores/notifications';

import {
    Link,
} from '@fluentui/react';
import { RouteApplicationProps } from '../utils/route';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }),
);

type Props = {
    applications: ShortInfoWithEnvironment[]
    application: HttpResponseApplication
    redirectTo: string
    openModal: boolean
};

export const isEnvironmentValidFromUri = (routeProps: RouteApplicationProps, applications: ShortInfoWithEnvironment[], currentApplicationId: string, currentEnvironment: string): boolean => {
    // Give priority to this fist
    // We want the second one for the uri change
    let exists = applications.some((info) => {
        return currentApplicationId === info.id && currentEnvironment === info.environment;
    });

    if (exists) {
        return exists;
    }

    exists = applications.some((info) => {
        return routeProps.applicationId === info.id && routeProps.environment === info.environment;
    });

    return exists;
};

export const PickEnvironment: React.FunctionComponent<Props> = (props) => {
    const { setCurrentEnvironment, setCurrentApplicationId } = useGlobalContext();
    const history = useHistory();
    const _props = props!;
    const application = _props.application;

    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(_props.openModal);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const environments: ShortInfoWithEnvironment[] = _props.applications;


    const onRenderCell = (item?: ShortInfoWithEnvironment, index?: number | undefined): JSX.Element => {
        const application = item!;
        return (
            <Link onClick={() => {
                const href = generatePath(_props.redirectTo, {
                    applicationId: application.id,
                    environment: application.environment,
                });

                setCurrentEnvironment(application.environment);
                setCurrentApplicationId(application.id);
                handleClose();
                history.push(href);
            }}
                underline>
                {application.name} {application.environment}
            </Link>
        );
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <h1>Pick an environment</h1>
            <List items={environments} onRenderCell={onRenderCell} />
        </div>
    );

    return (
        <div>
            {!open ? (
                <button type="button" onClick={handleOpen}>
                    Open Modal
                </button>
            )
                : null}
            <Modal

                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
};
