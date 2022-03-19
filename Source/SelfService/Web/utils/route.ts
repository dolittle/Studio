// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { useParams } from 'react-router-dom';

export type RouteApplicationProps = {
    applicationId: string;
    environment: string;
};

export const useRouteApplicationProps = (): RouteApplicationProps => {
    const { applicationId, environment } = useParams();
    return {
        applicationId: applicationId || '',
        environment: environment || '',
    } as RouteApplicationProps;
};
