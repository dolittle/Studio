// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSnackbar } from 'notistack';
import { Theme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import { useReadable } from 'use-svelte-store';
import { microservices, deleteMicroservice, canDeleteMicroservice, MicroserviceStore } from '../stores/microservice';
import { TabPanel } from '../utils/materialUi';

import { HttpResponseApplication, HttpInputApplicationEnvironment } from '../api/application';
import {
    Grid,
    IconButton,
    Typography,
} from '@mui/material';


type Props = {
    application: HttpResponseApplication
    environment: string
};

const styles = {
    deleteIcon: {
        'padding': 0,
        'marginRight': 1,
        'fill': 'white',
        '& .MuiSvgIcon-root': {
            color: 'white',
            marginRight: 1,
        },
        '& .MuiTypography-root': {
            color: 'white',
            textTransform: 'uppercase'
        }
    },

};


export const Delete: React.FunctionComponent<Props> = (props) => {
    const { enqueueSnackbar } = useSnackbar();
    const history = useHistory();
    const $microservices = useReadable(microservices) as any;
    const { microserviceId } = useParams() as any;

    const _props = props!;
    const environment = _props.environment;
    const application = _props.application;
    const applicationId = application.id;

    const canDelete = canDeleteMicroservice(application.environments, environment, microserviceId);

    const currentMicroservice: MicroserviceStore = $microservices.find(ms => ms.id === microserviceId);
    if (!currentMicroservice) {
        const href = `/microservices/application/${applicationId}/${environment}/overview`;
        history.push(href);
        return null;
    }

    const msName = currentMicroservice.name;

    const onClickDelete = async () => {
        if (!canDelete) {
            enqueueSnackbar('Deleting microservice is disabled', { variant: 'error' });
            return;
        }

        const success = await deleteMicroservice(applicationId, environment, microserviceId);

        if (!success) {
            enqueueSnackbar('Failed to delete microservice', { variant: 'error' });
            return;
        }

        enqueueSnackbar('Microservice deleted', { variant: 'info' });
        const href = `/microservices/application/${applicationId}/${environment}/overview`;
        history.push(href);
    };

    return <>
        <Grid
            container
            direction='column'
            justifyContent='flex-start'
        >
            <Grid container
                spacing={2}
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
            >
                <Grid item xs={3}>
                    <Typography variant="h3" component="h3">{msName}</Typography>
                </Grid>
            </Grid>

            <TabPanel value={0} index={0}>
                <h1>Delete Microservice</h1>
                <p>Currently this is not possible to undo</p>
                <p>Clicking on the button will delete the microservice</p>

                <IconButton
                    onClick={() => onClickDelete()}
                    sx={styles.deleteIcon}
                    size="large">
                    <DeleteIcon />
                    <Typography>delete</Typography>
                </IconButton>
            </TabPanel>
        </Grid >
    </>;
};
