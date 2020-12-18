// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { withViewModel } from '@shared/mvvm';
import { MicroserviceDetailsViewModel } from './MicroserviceDetailsViewModel';
import { MicroserviceForListing } from '../MicroserviceForListing';
import { Stack, StackItem, IStackProps, IStackTokens } from 'office-ui-fabric-react';
import styles from './MicroserviceDetails.module.scss';
import { DataManagementPanel } from './Panels/DataManagementPanel';
import { EventFlowPanel } from './Panels/EventFlowPanel';
import { DetailsPanel } from './Panels/DetailsPanel';
import { ReportsPanel } from './Panels/ReportsPanel';
import { StatusPanel } from './Panels/StatusPanel';


const microservice_mock = require('./microservice_dashboard_mock.jpg').default;

export interface MicroserviceDetailsProps{
    applicationId: string;
    microserviceId: string;
    microserviceForListing?: MicroserviceForListing
};

export const MicroserviceDetails = withViewModel<MicroserviceDetailsViewModel, MicroserviceDetailsProps>(MicroserviceDetailsViewModel, ({viewModel, props}) => {
    const layoutStackProps = {
        horizontal: false,
        wrap: true,
        tokens: {
            childrenGap: '30'
        }
        // horizontalAlign: 'space-between'
    } as IStackProps;

    const fullRowStackProps = {
        horizontal: true,
        tokens: {
            childrenGap: '30'
        },
        horizontalAlign: 'stretch'

    } as IStackProps;

    const halfRowStackProps = {
        horizontal: true,
        wrap: true,
        tokens: {
            childrenGap: '40'
        },
        horizontalAlign: 'space-between',
    } as IStackProps;


    return (
        <>
            <h1>Microservice: {props.microserviceForListing?.name}</h1>
            <h3>ID: {props.microserviceForListing?.id}</h3>

            <div className="ms-Grid" dir="ltr">
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12">
                        <StatusPanel />
                    </div>
                </div>
                <div className="ms-Grid-row">
                    <div className="ms-Grid-col ms-sm12 ms-md6">
                        <DataManagementPanel/>
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6">
                        <EventFlowPanel />
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6">
                        <ReportsPanel />
                    </div>
                    <div className="ms-Grid-col ms-sm12 ms-md6">
                        <DetailsPanel />
                    </div>
                </div>
            </div>

        </>
    );
});
