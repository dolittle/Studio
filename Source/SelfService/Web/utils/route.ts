// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { useParams } from 'react-router-dom';

export type RouteApplicationParams = {
    applicationId: string;
    environment: string;
};

export const useRouteApplicationParams = (): RouteApplicationParams => {
    const { applicationId, environment } = useParams<RouteApplicationParams>();
    return {
        applicationId: applicationId || '',
        environment: environment || '',
    } as RouteApplicationParams;
};
