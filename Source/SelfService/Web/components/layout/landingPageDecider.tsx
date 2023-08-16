// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { useGlobalContext } from '../../context/globalContext';
import { useSnackbar } from 'notistack';
import { Navigate } from 'react-router-dom';

import { getApplicationsListing, HttpResponseApplications } from '../../apis/solutions/application';

export const LandingPageDecider = () => {
    const { currentApplicationId, setCurrentApplicationId } = useGlobalContext();
    const { enqueueSnackbar } = useSnackbar();

    const [hasOneApplication, setHasOneApplication] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // TODO handle when not 200!
    useEffect(() => {
        Promise.all([getApplicationsListing()])
            .then(values => {
                const response = values[0] as HttpResponseApplications;

                if (response.applications.length === 1) {
                    setCurrentApplicationId(response.applications[0].id);
                    setHasOneApplication(true);
                }
            })
            .catch(() => enqueueSnackbar('Failed getting data from the server.', { variant: 'error' }))
            .finally(() => setIsLoaded(true));
    }, []);

    if (!isLoaded) return null;

    // TODO ENV: Navigate to '/home'.
    return (
        hasOneApplication ? (
            <Navigate to={`/microservices/application/${currentApplicationId}/overview`} />
        ) : (
            <Navigate to='/applications' />
        )
    );
};
