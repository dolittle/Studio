// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { useMemo, useState, useEffect } from 'react';

export const useRuntimeManagementUrl = (applicationId: string, environment: string, microserviceId: string): string => {
    const url = useMemo(
        () => `/proxy/${applicationId}/${environment}/${microserviceId}/runtime-management`,
        [applicationId, environment, microserviceId]);

    return url;
};

export const useRuntimeManagementAvailable = (applicationId: string, environment: string, microserviceId: string): boolean => {
    const url = useRuntimeManagementUrl(applicationId, environment, microserviceId);
    const [available, setAvailable] = useState(false);
    useEffect(() => {
        let aborted = false;
        isAvailable(url)
            .then(available => {
                if (aborted) return;
                setAvailable(available);
            })
            .catch(() => {
                if (aborted) return;
                setAvailable(false);
            });

        return () => { aborted = true; };
    }, [url]);

    return available;
};

async function isAvailable(url: string) {
    try {
        const response = await fetch(`${url}`);
        console.log('response', response);
        return response.status !== 404;
    } catch (error) {
        throw new Error(`Failed to fetch token ${error}`);
    }
}
