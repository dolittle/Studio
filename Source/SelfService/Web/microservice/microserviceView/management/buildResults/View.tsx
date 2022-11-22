// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, {useState} from 'react';
import { LoadingSpinner } from '@dolittle/design-system/atoms/LoadingSpinner/LoadingSpinner';
import { Button } from '@dolittle/design-system/atoms/Button/Button';
import { Typography } from '@mui/material';
import { DataTable } from '../../../dataTable';
import { DeployButton } from '../../../deployButton';
import { NoMicroservices } from '../../../noMicroservices';

import { useBuildResults } from './useBuildResults';
import { ListView } from 'Source/SelfService/Web/backup/listView';
import { ArtifactsResultsView } from './ArtifactsResults';

export type ViewProps = {
    applicationId: string;
    environment: string;
    microserviceId: string;
};

const tabs = [
    {
        label: 'Build Results',
        render: () => <h1>HEllo</h1>
    }
];

export const View = (props: ViewProps) => {
    const buildResults = useBuildResults(props.applicationId, props.environment, props.microserviceId);
    console.log(buildResults);

    if (buildResults === undefined) {
        return <></>;
    }
    return (
        <>
            <ArtifactsResultsView type='Event Types' results={buildResults.eventTypes}/>
            <ArtifactsResultsView type='Aggregate Roots' results={buildResults.aggregateRoots}/>
            <ArtifactsResultsView type='Event Handlers' results={buildResults.eventHandlers}/>
            <ArtifactsResultsView type='Projections' results={buildResults.projections}/>
            <ArtifactsResultsView type='Embeddings' results={buildResults.embeddings}/>
            <ArtifactsResultsView type='Filters' results={buildResults.filters}/>
        </>
    );
};

