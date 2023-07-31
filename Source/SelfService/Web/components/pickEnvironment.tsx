// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { useGlobalContext } from '../context/globalContext';
import { useNavigate, generatePath } from 'react-router-dom';

import { Box, Modal, Typography } from '@mui/material';

import { Button } from '@dolittle/design-system';

import { ShortInfoWithEnvironment } from '../apis/solutions/api';
import { HttpResponseApplication } from '../apis/solutions/application';

import { List } from '@fluentui/react/lib/List';
import { Link } from '@fluentui/react';

function rand() {
    return Math.round(Math.random() * 20) - 10;
};

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
};

const styles = {
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme => theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme => theme.shadows[5],
        padding: theme => theme.spacing(2, 4, 3),
    },
};

export type PickEnvironmentProps = {
    applications: ShortInfoWithEnvironment[];
    application: HttpResponseApplication;
    redirectTo: string;
    openModal: boolean;
};

export const isEnvironmentValidFromUrl = (applications: ShortInfoWithEnvironment[], currentApplicationId: string, currentEnvironment: string): boolean => {
    return applications.some((info) => {
        return currentApplicationId === info.id && currentEnvironment === info.environment;
    });
};

export const PickEnvironment = ({ applications, openModal, redirectTo }: PickEnvironmentProps) => {
    const { setCurrentEnvironment, setCurrentApplicationId } = useGlobalContext();
    const navigate = useNavigate();

    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = useState(getModalStyle);
    const [isModalOpen, setIsModalOpen] = useState(openModal);

    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);

    const environments: ShortInfoWithEnvironment[] = applications;

    const onRenderCell = (item?: ShortInfoWithEnvironment, index?: number | undefined): JSX.Element => {
        const application = item!;

        return (
            <Link onClick={() => {
                const href = generatePath(redirectTo, {
                    applicationId: application.id,
                    environment: application.environment,
                });

                setCurrentEnvironment(application.environment);
                setCurrentApplicationId(application.id);
                handleModalClose();
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
        <>
            {!isModalOpen ? <Button label='Open Modal' onClick={handleModalOpen} /> : null}

            <Modal
                open={isModalOpen}
                onClose={handleModalClose}
                aria-labelledby='simple-modal-title'
                aria-describedby='simple-modal-description'
            >
                {body}
            </Modal>
        </>
    );
};
