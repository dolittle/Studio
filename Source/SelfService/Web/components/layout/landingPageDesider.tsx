// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { useGlobalContext } from '../../context/globalContext';
import { useSnackbar } from 'notistack';
import { Navigate } from 'react-router-dom';

import { ShortInfoWithEnvironment } from '../../apis/solutions/api';
import { getApplications, HttpResponseApplications } from '../../apis/solutions/application';

export const LandingPageDesider = () => {
    const { setCurrentApplicationId, setCurrentEnvironment } = useGlobalContext();
    const { enqueueSnackbar } = useSnackbar();

    const [applicationInfos, setApplicationInfos] = useState([] as ShortInfoWithEnvironment[]);
    const [isLoaded, setIsLoaded] = useState(false);

    // TODO handle when not 200!
    useEffect(() => {
        Promise.all([getApplications()])
            .then(values => {
                const response = values[0] as HttpResponseApplications;

                if (response.applications.length === 1) {
                    const { environment, id } = response.applications[0];

                    setCurrentApplicationId(id);
                    setCurrentEnvironment(environment);
                    setApplicationInfos(response.applications);
                }

                setIsLoaded(true);
            })
            .catch(() => enqueueSnackbar('Failed getting data from the server.', { variant: 'error' }));
    }, []);

    if (!isLoaded) return null;

    // Should be '/home'.
    const href = `/microservices/application/${applicationInfos[0].id}/${applicationInfos[0].environment}/overview`;

    return (
        applicationInfos.length === 1 ? <Navigate to={href} /> : <Navigate to='/applications' />
    );
};
