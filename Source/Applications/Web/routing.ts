// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
export const baseurl = '/_/applications/';

export const routes = {
    allApplications: {
        route: '/',
    },
    applicationDetails: {
        route: '/:applicationId'
    },
    microserviceDetails: {
        route: '/:applicationId/microservices/:microserviceId'
    },
};

