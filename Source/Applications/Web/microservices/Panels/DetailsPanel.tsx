// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';
import { Panel } from './Panel';

const mock = require('./dashboard-panel-details.jpg').default;


export const DetailsPanel = (props) => {
    return(
        <Panel header="Details">
            <img src={mock} style={{ width: '100%'}}></img>
        </Panel>
    );
};