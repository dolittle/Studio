// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Artifact } from '../Types';
import { getBuildResults as pbGetBuildResults, toArtifactResult, toBuildResult } from './Protobuf';

export type BuildResults = {
    other: OtherResults;
    eventTypes: ArtifactResults;
    aggregateRoots: ArtifactResults;
    eventHandlers: ArtifactResults;
    projections: ArtifactResults;
    embeddings: ArtifactResults;
    filters: ArtifactResults;
};

export type BuildResult = {
    type: string,
    message: string,
    isFailed: boolean
};

export type OtherResults = BuildResult[];

export type ArtifactResult = {
    alias: string | '',
    buildResult: BuildResult,
    artifact: Artifact
};

export type ArtifactResults = ArtifactResult[];

export const emptyBuildResults: BuildResults = {
    other: [],
    aggregateRoots: [],
    embeddings: [],
    eventHandlers: [],
    eventTypes: [],
    filters: [],
    projections: []
};

export async function getBuildResults(url: string): Promise<BuildResults> {
    const response = await pbGetBuildResults(url);
    const results = response.getBuildresults();
    if (results === undefined) {
        throw new Error('Build results is empty');
    }
    return {
        other: results.getOtherList().map(toBuildResult),
        aggregateRoots: results.getAggregaterootsList().map(toArtifactResult),
        embeddings: results.getEmbeddingsList().map(toArtifactResult),
        eventHandlers: results.getEventhandlersList().map(toArtifactResult),
        eventTypes: results.getEventtypesList().map(toArtifactResult),
        filters: results.getFiltersList().map(toArtifactResult),
        projections: results.getProjectionsList().map(toArtifactResult),
    };
}
