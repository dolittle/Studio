// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { useState, useEffect } from 'react';
import { useRuntimeManagementUrl } from '../useRuntimeManagement';
import { BuildResults, emptyBuildResults, getBuildResults  } from './BuildResults';
import { getBuildResults as pbGetBuildResults } from './Protobuf';

export const useBuildResults = (applicationId: string, environment: string, microserviceId: string): BuildResults => {
    const url = useRuntimeManagementUrl(applicationId, environment, microserviceId);
    const [buildResults, setBuildResults] = useState({} as BuildResults);
    useEffect(() => {
        getBuildResults(url)
            .then(resp => {
                setBuildResults(resp);
            })
            .catch(err => {
                console.error(err);
                setBuildResults(emptyBuildResults);
            });
    }, [url]);

    return buildResults;
};


export const useBuildResultsAvailable = (applicationId: string, environment: string, microserviceId: string): boolean => {
    const url = useRuntimeManagementUrl(applicationId, environment, microserviceId);
    const [available, setAvailable] = useState(false);
    useEffect(() => {
        let aborted = false;
        pbGetBuildResults(url)
            .then(response => {
                if (aborted) return;
                console.log(response);
                setAvailable(!!response.getBuildresults() && true);
            })
            .catch((err) => {
                console.log('err', err);
                if (aborted) return;
                setAvailable(false);
            });

        return () => { aborted = true; };
    }, [url]);

    return available;
};
