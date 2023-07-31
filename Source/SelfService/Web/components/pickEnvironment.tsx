// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import Modal from '@mui/material/Modal';
import { Box, Typography } from '@mui/material';
import { useNavigate, generatePath } from 'react-router-dom';
import { ShortInfoWithEnvironment } from '../apis/solutions/api';
import { HttpResponseApplication } from '../apis/solutions/application';
import { List } from '@fluentui/react/lib/List';
import { useGlobalContext } from '../context/globalContext';

import {
    Link,
} from '@fluentui/react';
import { RouteApplicationParams } from '../utils/route';

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

const styles = {
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: (theme) => theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: (theme) => theme.shadows[5],
        padding: (theme) => theme.spacing(2, 4, 3),
    },
};

type Props = {
    applications: ShortInfoWithEnvironment[]
    application: HttpResponseApplication
    redirectTo: string
    openModal: boolean
};

export const isEnvironmentValidFromUrl = (applications: ShortInfoWithEnvironment[], currentApplicationId: string, currentEnvironment: string): boolean => {
    return applications.some((info) => {
        return currentApplicationId === info.id && currentEnvironment === info.environment;
    });
};

export const PickEnvironment: React.FunctionComponent<Props> = (props) => {
    const { setCurrentEnvironment, setCurrentApplicationId } = useGlobalContext();
    const navigate = useNavigate();
    const _props = props!;
    const application = _props.application;

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
                navigate(href);
            }}
                underline>
                {application.name} {application.environment}
            </Link>
        );
    };

    const body = (
        <Box sx={styles.paper} style={modalStyle}>
            <Typography variant='h1' my={2}>Pick an environment</Typography>
            <List items={environments} onRenderCell={onRenderCell} />
        </Box>
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
