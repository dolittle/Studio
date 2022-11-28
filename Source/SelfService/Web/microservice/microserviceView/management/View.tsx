// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, {} from 'react';

import { Tab, Tabs } from '@dolittle/design-system/atoms/Tabs/Tabs';
import { useBuildResultsAvailable } from './buildResults/useBuildResults';
import { View as BuildResults} from './buildResults/View';

export type ViewProps = {
    applicationId: string;
    environment: string;
    microserviceId: string;
};

export const View = (props: ViewProps) => {
    const tabs: Tab[] = [];
    const buildResultsAvailable = useBuildResultsAvailable(props.applicationId, props.environment, props.microserviceId);
    if (buildResultsAvailable) {
        tabs.push({
            label: 'Build Results',
            render: () => <BuildResults applicationId={props.applicationId} environment={props.environment} microserviceId={props.microserviceId}/>
        });
    }

    return (
        <>
            {tabs.length > 0
                ? <Tabs tabs={tabs} />
                : <h2>There are not any management endpoints on your microservice.</h2>
            }
        </>
    );
};
