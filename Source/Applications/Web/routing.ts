// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { generatePath } from 'react-router-dom';

export const baseurl = '/_/applications/';

export const routes = {
    allApplications: {
        route: '/',
        generate() {
            return generateRoute(this.route);
        },
    },
    applicationDetails: {
        route: '/:applicationId',
        generate(params: { applicationId: string }) {
            return generateRoute(this.route, params);
        },
    },
    microserviceDetails: {
        route: '/:applicationId/microservices/:microserviceId',
        generate(params: { applicationId: string; microserviceId: string }) {
            return generateRoute(this.route, params);
        },
    },
};

const generateRoute = (
    pattern: string,
    params?: { [paramName: string]: string | number | boolean | undefined } | undefined
) => {
    return generatePath(pattern, params);
};
