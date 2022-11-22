// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

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

export type Artifact = {
    id: string,
    generation: number
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
