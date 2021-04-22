// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import { Microservice } from '../../Microservice';
import { Panel } from './Panel';

const mock = require('./dashboard-panel-details.jpg').default;

export type DetailsPanelProps = {
    microservice: Microservice;
};

export const DetailsPanel = (props: DetailsPanelProps) => {
    return(
        <Panel header="Details">
            <ul>
                <li>Id: {props.microservice.id}</li>
                <li>HeadImage: {props.microservice.headImage}</li>
                <li>RuntimeImage: {props.microservice.runtimeImage}</li>
            </ul>
        </Panel>
    );
};