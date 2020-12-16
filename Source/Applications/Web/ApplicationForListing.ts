// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { Guid } from '@dolittle/rudiments';
import { MicroserviceForListing } from './MicroserviceForListing';

export type ApplicationForListing = {
    id: Guid;
    name: string;
    microservices: MicroserviceForListing[];
};


