// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { useGlobalContext } from '../../context/globalContext';
import { useSnackbar } from 'notistack';
import { Navigate } from 'react-router-dom';

import { getApplications, HttpResponseApplications } from '../../apis/solutions/application';

export const LandingPageDecider = () => {
    const { currentApplicationId, currentEnvironment, setCurrentApplicationId, setCurrentEnvironment } = useGlobalContext();
    const { enqueueSnackbar } = useSnackbar();

    const [hasOneApplication, setHasOneApplication] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // TODO handle when not 200!
    useEffect(() => {
        Promise.all([getApplications()])
            .then(values => {
                const response = values[0] as HttpResponseApplications;

                if (response.applications.length === 1) {
                    const { environment, id } = response.applications[0];

                    setCurrentApplicationId(id);
                    //setCurrentEnvironment(environment);
                    setHasOneApplication(true);
                }

                setIsLoaded(true);
            })
            .catch(() => enqueueSnackbar('Failed getting data from the server.', { variant: 'error' }));
    }, []);

    if (!isLoaded) return null;

    return (
        !hasOneApplication ? (
            <Navigate to={`/microservices/application/${currentApplicationId}/overview`} />
        ) : (
            <Navigate to='/applications' />
        )
    );
};
