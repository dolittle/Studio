// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { useRouteMatch } from 'react-router-dom';

export type RouteApplicationProps = {
    applicationId: string
    environment: string
};

export const withRouteApplicationProps = (prefix: string): RouteApplicationProps => {
    let match = useRouteMatch(`/${prefix}/application/:applicationId`);
    const applicationId = (match?.params as RouteApplicationProps)?.applicationId ? (match?.params as RouteApplicationProps)?.applicationId : '';

    // TODO I think this is a hot mess
    match = useRouteMatch(`/${prefix}/application/:applicationId/:environment`);
    const environment = (match?.params as RouteApplicationProps)?.environment ? (match?.params as RouteApplicationProps)?.environment : '';

    //const currentEnvironment = getCurrentEnvironment();
    return {
        applicationId,
        environment,
    } as RouteApplicationProps;
};
