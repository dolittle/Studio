// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { BusinessMoment, BusinessMomentEntity } from './businessMoments';
import { MicroserviceDolittle } from './common';

/**
 * Represents a simple representation of metadata for a microservice.
 */
export type MicroserviceSimpleExtra = {
    headImage: string
    runtimeImage: string
    ingress: MicroserviceIngressPath
};

/**
 * Represents the ingress path of a microservice.
 */
export type MicroserviceIngressPath = {
    path: string
    host: string
    pathType: string
    domainPrefix?: string,
    secretNamePrefix?: string,

};

/**
 * Represents a simple representation of a microservice.
 */
export type MicroserviceSimple = {
    dolittle: MicroserviceDolittle
    name: string
    kind: string
    environment: string
    extra: MicroserviceSimpleExtra | MicroserviceBusinessMomentAdaptorExtra | MicroserviceRawDataLogIngestorExtra
};


export type MicroserviceBusinessMomentAdaptorExtra = {
    headImage: string
    runtimeImage: string
    ingress: MicroserviceIngressPath
    connector: MicroserviceBusinessMomentAdaptorConnector
    moments: BusinessMoment[]
    entities: BusinessMomentEntity[]
};


export type MicroserviceBusinessMomentAdaptorConnector = {
    kind: string
    config: ConnectorWebhookConfig
};

export type ConnectorWebhookConfig = {
    domain?: string
    uriPrefix?: string
    kind: string

    // ConnectorWebhookConfigBasic
    // ConnectorWebhookConfigBearer
    config: any
};

export type MicroserviceRawDataLogIngestorExtra = {
    headImage: string
    runtimeImage: string
    ingress: MicroserviceIngressPath
    webhooks: MicroserviceRawDataLogIngestorWebhookConfig[]
    webhookStatsAuthorization: string
    writeTo: string
};

export type MicroserviceRawDataLogIngestorWebhookConfig = {
    kind: string
    uriSuffix: string
    authorization: string
};
