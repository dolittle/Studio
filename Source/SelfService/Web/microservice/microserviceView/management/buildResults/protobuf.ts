// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { BuildResult as PbBuildResult, ArtifactBuildResult as PbArtifactBuildResult,  } from '@dolittle/contracts.web/Runtime/Client/BuildResult_pb';
import { ClientPromiseClient } from '@dolittle/contracts.web/Runtime/Management/Client/Client_grpc_web_pb';
import { GetBuildResultsRequest, GetBuildResultsResponse } from '@dolittle/contracts.web/Runtime/Management/Client/Client_pb';
import { toArtifact } from '../Protobuf';
import { ArtifactResult, BuildResult } from './BuildResults';

const buildResultsResponseCache: Map<string, GetBuildResultsResponse> = new Map<string, GetBuildResultsResponse>();

export async function getBuildResults(url: string): Promise<GetBuildResultsResponse> {
    if (buildResultsResponseCache.has(url)) {
        return buildResultsResponseCache.get(url)!;
    }

    const response = await new ClientPromiseClient(url).getBuildResults(new GetBuildResultsRequest());
    buildResultsResponseCache.set(url, response);
    return response;
}

export function toBuildResult(pb: PbBuildResult): BuildResult {
    const typeString = Object.entries(PbBuildResult.Type).find(_ => _[1] === pb.getType())?.[0]!;
    return {
        message: pb.getMessage(),
        type: typeString,
        isFailed: pb.getType() !== PbBuildResult.Type.INFORMATION
    };
}

export function toArtifactResult(pb: PbArtifactBuildResult): ArtifactResult {
    return {
        buildResult: toBuildResult(pb.getBuildresult()!),
        alias: pb.getAlias(),
        artifact: toArtifact(pb.getAritfact()!)
    };
}
