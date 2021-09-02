// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

export type BusinessMoment = {
    name: string
    uuid: string
    entityTypeId: string
    embeddingCode: string
    projectionCode: string
};

export type BusinessMomentEntity = {
    name: string
    entityTypeId: string
    idNameForRetrival: string
    filterCode: string
    transformCode: string
};

export type HttpResponseBusinessMoments = {
    applicationId: string
    environment: string
    moments: HttpInputBusinessMoment[]
    entities: HttpInputBusinessMomentEntity[]
};

export type HttpInputBusinessMoment = {
    applicationId: string
    environment: string
    microserviceId: string
    moment: BusinessMoment
};

export type HttpInputBusinessMomentEntity = {
    applicationId: string
    environment: string
    microserviceId: string
    entity: BusinessMomentEntity
};
