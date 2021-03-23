// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

export type DolittleTenant = {
    id: string;
    name: string;
};

export type CustomerApplication = {
    id: string;
    name: string;
    environment: string;
};

export type ApplicationForListing = {
    tenant: DolittleTenant;
    applications: CustomerApplication[];
};
