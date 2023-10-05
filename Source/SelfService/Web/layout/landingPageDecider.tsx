// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { useGlobalContext } from '../context/globalContext';
import { useSnackbar } from 'notistack';
import { Navigate } from 'react-router-dom';

import { getApplicationsListing } from '../apis/solutions/application';

export const LandingPageDecider = () => {
    const { currentApplicationId, setCurrentApplicationId } = useGlobalContext();
    const { enqueueSnackbar } = useSnackbar();

    const [hasApplicationId, setHasApplicationId] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (currentApplicationId) {
            setHasApplicationId(true);
            setIsLoaded(true);
            return;
        }

        Promise.all([getApplicationsListing()])
            .then(response => {
                if (response[0].applications.length === 1) {
                    setCurrentApplicationId(response[0].applications[0].id);
                    setHasApplicationId(true);
                }

                setIsLoaded(true);
            })
            .catch(() => enqueueSnackbar('Failed getting data from the server.', { variant: 'error' }));
    }, []);

    if (!isLoaded) return null;

    return (
        hasApplicationId ? <Navigate to='/home' /> : <Navigate to='/applications' />
    );
};
