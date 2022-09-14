// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
// import { DumpJson } from '../dumpJson';
// import { getFailingPartions } from './utils';

type Props = {
    data: any
};

export const FaillingPartitionsSummary = (props: Props) => {
    // const _props = props!;
    // const data = _props.data;

    // const failingPartions = getFailingPartions(data);


    // if (failingPartions.length === 0) {
    //     return null;
    // }

    return (
        <>
            {/* <p>Possible problems with one or more event handlers</p>

            {failingPartions.flatMap(state => {
                return state.failingPartitions.map(info => {
                    return (
                        <>
                            <div>
                                <pre style={{ whiteSpace: 'pre-wrap' }}>
                                    {state.store} {state.eventProcessor} is stuck (retried {info.processingAttempts}).<br />
                                    {info.reason}
                                </pre>
                            </div>
                        </>
                    );
                });
            })} */}
        </>
    );
};
