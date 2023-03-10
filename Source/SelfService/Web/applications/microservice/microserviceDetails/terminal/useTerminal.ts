// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { useEffect, useMemo, useState } from 'react';

import { isAvailable } from './ttyd';

export const useTTYdUrl = (applicationId: string, environment: string, microserviceId: string): string => {
    const url = useMemo(
        () => `/proxy/${applicationId}/${environment}/${microserviceId}/shell`
    , [applicationId, environment, microserviceId]);

    return url;
};

export const useTerminalAvailable = (applicationId: string, environment: string, microserviceId: string): boolean => {
    const url = useTTYdUrl(applicationId, environment, microserviceId);

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
