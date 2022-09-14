// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

// import { DumpJson } from '../dumpJson';
// import { getFailingPartions } from './utils';

// import { Button } from '@mui/material';

type Props = {
    runtimeStates: any
    eventLogCounts: any
};

export const StateSummary = (props: Props) => {
    // const _props = props!;
    // const data = _props.runtimeStates;
    // const eventLogCounts = _props.eventLogCounts;

    // const cleaned = Object.entries(Object.keys(data)
    //     .reduce((obj, key) => {
    //         obj[key] = data[key];
    //         return obj;
    //     }, {})).flatMap(([key, value]) => {
    //         // Well this is ugly as hell
    //         const d = value as unknown as any[];
    //         return d.map(state => {
    //             return {
    //                 eventLogSize: eventLogCounts[key],
    //                 store: key,
    //                 ...state,
    //             };
    //         });
    //     });

    // const failingPartions = getFailingPartions(data);
    // const showButton = failingPartions.length > 0;
    // const [showData, setShowData] = useState(false);

    return (
        <>
            {/* {showButton && (
                <Button onClick={(e => { setShowData(!showData); })}>
                    continue to raw data
                </Button>
            )}

            {(!showButton || showData) && (
                <DumpJson data={cleaned} />
            )} */}
        </>
    );
};
