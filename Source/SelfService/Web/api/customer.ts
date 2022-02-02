// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { getServerUrlPrefix, parseJSONResponse } from './api';


export type Customer = {
    id: string;
    name: string;
};

export type Customers = Customer[];

export type HttpCustomerRequest = {
    name: string;
};

export async function getCustomers(): Promise<Customers> {
    const url = `${getServerUrlPrefix()}/customers`;

    const response = await fetch(
        url,
        {
            method: 'GET',
            mode: 'cors'
        });

    const data = await parseJSONResponse(response);
    return data;
}


export async function createCustomer(input: HttpCustomerRequest): Promise<any> {
    const url = `${getServerUrlPrefix()}/customer`;
    const response = await fetch(
        url,
        {
            method: 'POST',
            body: JSON.stringify(input),
            mode: 'cors',
            headers: {
                'content-type': 'application/json'
            }
        });

    const data = await parseJSONResponse(response);
    return data;
}
