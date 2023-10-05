// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { getServerUrlPrefix, parseJSONResponse } from './api';

// TODO should we call this studio config?
export type Studio = {
    buildOverwrite: boolean;
    disabledEnvironments: string[];
    canCreateApplication: boolean;
};

export async function getStudioConfig(customerID: string): Promise<Studio> {
    const url = `${getServerUrlPrefix()}/studio/customer/${customerID}`;

    const response = await fetch(
        url,
        {
            method: 'GET',
            mode: 'cors',
        });

    return parseJSONResponse(response);
};

export async function saveStudioConfig(customerID: string, config: Studio): Promise<boolean> {
    const url = `${getServerUrlPrefix()}/studio/customer/${customerID}`;

    const response = await fetch(
        url,
        {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(config),
            headers: {
                'content-type': 'application/json'
            },
        });

    return response.status === 200;
};
