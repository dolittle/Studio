// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { ApplicationInfo } from '../application/info';

export const ContainerRegistryInfoScreen: React.FunctionComponent = () => {
    const { applicationId } = useParams() as any;
    // TODO Get real data
    console.log('application to lookup', applicationId);
    return (
        <>
            <h1>Container Registry Info</h1>

            <ApplicationInfo />
        </>
    );
};
