// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { withViewModel } from '@shared/mvvm';
import { MicroserviceDetailsViewModel } from './MicroserviceDetailsViewModel';
import { MicroserviceForListing } from '../MicroserviceForListing';
import { Stack, StackItem, IStackProps, IStackTokens } from 'office-ui-fabric-react';
import styles from './MicroserviceDetails.module.scss';


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
            <h1>{props.microserviceForListing?.name}</h1>
            <h3>{props.microserviceForListing?.id}</h3>
            <div>
                <img src={microservice_mock} style={{ width: '100%' }}></img>
            </div>

            {/* Page Header */}
            {/* Page layout */}
            <Stack {...layoutStackProps}>
                {/* Top Status - Full-Width*/}
                <StackItem>
                    <Stack {...fullRowStackProps}>
                        <div className={styles.fullWidth}>Status</div>
                    </Stack>
                </StackItem>

                {/* Widgets Half-width */}
                <StackItem align='stretch'>
                    <Stack {...halfRowStackProps}>
                        <div className={styles.halfWidth}>Data Management</div>
                        <div className={styles.halfWidth}>Event Flow</div>
                        <div className={styles.halfWidth}>Reports</div>
                        <div className={styles.halfWidth}>Details</div>
                    </Stack>
                </StackItem>
            </Stack>
        </>
    );
});
