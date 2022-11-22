// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ClientPromiseClient } from '@dolittle/contracts.web/Runtime/Management/Client/Client_grpc_web_pb';
import { GetBuildResultsRequest } from '@dolittle/contracts.web/Runtime/Management/Client/Client_pb';
import { BuildResult as PbBuildResult, ArtifactBuildResult as PbArtifactBuildResult,  } from '@dolittle/contracts.web/Runtime/Client/BuildResult_pb';
import { Guid } from '@dolittle/rudiments';
import { useState, useEffect } from 'react';
import { useRuntimeManagementUrl } from '../useRuntimeManagement';
import { ArtifactResult, BuildResult, BuildResults, emptyBuildResults,  } from './BuildResults';

export const useBuildResults = (applicationId: string, environment: string, microserviceId: string): BuildResults => {
    const url = useRuntimeManagementUrl(applicationId, environment, microserviceId);
    const [buildResults, setBuildResults] = useState({} as BuildResults);
    useEffect(() => {
        const client = new ClientPromiseClient(url);
        client.getBuildResults(new GetBuildResultsRequest())
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

function toBuildResult(pb: PbBuildResult): BuildResult {
    const typeString = Object.entries(PbBuildResult.Type).find(_ => _[1] === pb.getType())?.[0]!;
    return {
        message: pb.getMessage(),
        type: typeString,
        isFailed: pb.getType() !== PbBuildResult.Type.INFORMATION
    };
}
function toArtifactResult(pb: PbArtifactBuildResult): ArtifactResult {
    return {
        buildResult: toBuildResult(pb.getBuildresult()!),
        alias: pb.getAlias(),
        artifact: {generation: pb.getAritfact()!.getGeneration(), id: new Guid(pb.getAritfact()!.getId()!.getValue_asU8()).toString()},
    };
}

