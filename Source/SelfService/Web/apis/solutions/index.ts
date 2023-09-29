// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { HttpEnvironmentConnections } from './application';

export type MicroserviceDolittle = {
    applicationId: string;
    customerId: string;
    microserviceId: string;
};

export type MicroserviceIngressPath = {
    path: string;
    pathType: string;
};

export type MicroserviceSimple = {
    dolittle: MicroserviceDolittle;
    name: string;
    kind: string;
    environment: string;
    extra: MicroserviceSimpleExtra;
};

export type MicroserviceSimpleExtra = {
    headImage: string;
    headPort: number;
    runtimeImage: string;
    ingress: MicroserviceIngressPath;
    isPublic: boolean;
    headCommand: MicroserviceHeadCommand;
    connections: HttpEnvironmentConnections;
};

export type MicroserviceHeadCommand = {
    command: string[];
    args: string[];
};

export type MicroserviceFormParameters = {
    microserviceName: string;
    developmentEnvironment: string;
    runtimeVersion: string;
    headImage: string;
    headPort: number;
    entrypoint: string;
    isPublic: boolean;
    headArguments: { value: string }[];
    ingressPath: string;
    hasM3Connector: boolean;
};
