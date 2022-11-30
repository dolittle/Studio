// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useBuildResults } from './useBuildResults';
import { ArtifactsResultsView } from './ArtifactsResults';
import { OtherResultsView } from './OtherResults';

export type ViewProps = {
    applicationId: string;
    environment: string;
    microserviceId: string;
};

export const View = (props: ViewProps) => {
    const buildResults = useBuildResults(props.applicationId, props.environment, props.microserviceId);
    return (
        <>
            <ArtifactsResultsView type='Event Types' results={buildResults.eventTypes}/>
            <ArtifactsResultsView type='Aggregate Roots' results={buildResults.aggregateRoots}/>
            <ArtifactsResultsView type='Event Handlers' results={buildResults.eventHandlers}/>
            <ArtifactsResultsView type='Projections' results={buildResults.projections}/>
            <ArtifactsResultsView type='Embeddings' results={buildResults.embeddings}/>
            <ArtifactsResultsView type='Filters' results={buildResults.filters}/>
            <OtherResultsView results={buildResults.other}/>
        </>
    );
};
