// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { MicroserviceSimple } from './microservices';


/**
 * Represents the environment of an application.
 */
export type ApplicationEnvironment = {
    applicationId: string
    tenantId: string
    name: string
    domainPrefix: string
    host: string
    automationEnabled: boolean
};
/**
 * Represents the response from getting all applications.
 */
export type AllApplications = {
    id: string
    name: string
    applications: ShortInfoWithEnvironment[]
};

/**
 * Represents
 */
export type AllMicroservicesInApplication = MicroserviceSimple[];

/**
 * Represents a simple representation of an application
 */
export type ShortInfoWithEnvironment = {
    id: string
    name: string
    environment: string
};

export type ApplicationDetailed = {
    id: string,
    name: string,
    tenantId: string,
    environments: ApplicationEnvironment[],
    microservices: MicroserviceSimple[]
};

export type HttpResponseMicroservices = {
    application: ShortInfo
    microservices: MicroserviceInfo[]
};

export type ShortInfo = {
    id: string
    name: string
};

export type MicroserviceInfo = {
    id: string
    name: string
    kind?: string // This is in the web, but is apparently not a part of the response
    environment: string
    images: ImageInfo[]
};

export type ImageInfo = {
    image: string
    name: string
};
