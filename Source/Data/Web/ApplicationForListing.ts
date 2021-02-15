// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

export type DolittleTenant = {
    id: string;
    name: string;
}


export type CustomerApplication = {
    name: string;
}


export type CustomerDomain = {
    name: string;
}



export type ApplicationForListing = {
    tenant: DolittleTenant;
    applications: CustomerApplication[];
    domains: CustomerApplication[];
};
