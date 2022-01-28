// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';


import { isApplicationOnline, ApplicationBuildState } from '../api/application';

type Props = {

};

export const Building: React.FunctionComponent<Props> = (props) => {
    const { enqueueSnackbar } = useSnackbar();
    const { applicationId } = useParams() as any;

    const [loaded, setLoaded] = useState(false);
    const [applicationBuildState, setApplicationBuildState] = useState({
        status: '',
        startedAt: '',
        finishedAt: '',
    } as ApplicationBuildState);

    useEffect(() => {
        Promise.all([
            isApplicationOnline(applicationId),
        ]).then(values => {
            const state = values[0];

            setApplicationBuildState(values[0]);
            setLoaded(true);
        }).catch((error) => {

            setLoaded(true);
            enqueueSnackbar(error.message, { variant: 'error' });
        });
    }, []);

    if (!loaded) {
        return null;
    }

    return (
        <>
            <h1>Building {applicationId}</h1>

            <h2>Please refresh to see if it has finished</h2>


            <h2>Status</h2>
            <p>This might take a few moments</p>
            <p>Current State is {applicationBuildState.status}</p>
            <p>Started building at {applicationBuildState.startedAt}</p>
            <p>Finished building at {applicationBuildState.finishedAt}</p>




            <h2>What is happening?</h2>

            <ul>
                <li>Setting up your application in the platform</li>
                <li>Setting up your backups</li>
                <li>Setting up your environments</li>
                <li>Setting up your welcome microservice</li>
            </ul>
        </>
    );
};
