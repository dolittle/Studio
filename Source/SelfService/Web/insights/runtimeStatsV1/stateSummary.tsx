// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';
import { DumpJson } from '../dumpJson';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { getFailingPartions } from './utils';

type Props = {
    runtimeStates: any
    eventLogCounts: any
};

export const StateSummary: React.FunctionComponent<Props> = (props) => {
    const _props = props!;
    const data = _props.runtimeStates;
    const eventLogCounts = _props.eventLogCounts;

    const cleaned = Object.entries(Object.keys(data)
        .reduce((obj, key) => {
            obj[key] = data[key];
            return obj;
        }, {})).flatMap(([key, value]) => {
            // Well this is ugly as hell
            const d = value as unknown as any[];
            return d.map(state => {
                return {
                    eventLogSize: eventLogCounts[key],
                    store: key,
                    ...state,
                };
            });
        });

    const failingPartions = getFailingPartions(data);
    const showButton = failingPartions.length > 0;
    const [showData, setShowData] = useState(false);

    return (
        <>
            {showButton && (
                <PrimaryButton text="continue to raw data" onClick={(e => {
                    setShowData(!showData);
                })} />
            )}

            {(!showButton || showData) && (
                <DumpJson data={cleaned} />
            )}
        </>
    );
};
