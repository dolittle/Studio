// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { useState, useEffect } from 'react';
import { useRuntimeManagementUrl } from '../useRuntimeManagement';
import { BuildResults, emptyBuildResults,  } from './BuildResults';
import { getBuildResults, toArtifactResult, toBuildResult } from './protobuf';

export const useBuildResults = (applicationId: string, environment: string, microserviceId: string): BuildResults => {
    const url = useRuntimeManagementUrl(applicationId, environment, microserviceId);
    const [buildResults, setBuildResults] = useState({} as BuildResults);
    useEffect(() => {
        getBuildResults(url)
            .then(resp => {
                const results = resp.getBuildresults()!;
                setBuildResults({
                    other: results.getOtherList().map(toBuildResult),
                    aggregateRoots: results.getAggregaterootsList().map(toArtifactResult),
                    embeddings: results.getEmbeddingsList().map(toArtifactResult),
                    eventHandlers: results.getEventhandlersList().map(toArtifactResult),
                    eventTypes: results.getEventtypesList().map(toArtifactResult),
                    filters: results.getFiltersList().map(toArtifactResult),
                    projections: results.getProjectionsList().map(toArtifactResult),
                });
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
        getBuildResults(url)
            .then(response => {
                if (aborted) return;
                setAvailable(!!response.getBuildresults() && true);
            })
            .catch(() => {
                if (aborted) return;
                setAvailable(false);
            });

        return () => { aborted = true; };
    }, [url]);

    return available;
};
