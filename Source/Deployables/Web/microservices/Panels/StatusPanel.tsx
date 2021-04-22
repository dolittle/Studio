// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import React from 'react';

const mock = require('./dashboard-panel-status.jpg').default;


export const StatusPanel = (props) => {
    return(
        <>
            <img src={mock} style={{ width: '100%'}}></img>
        </>
    );
};