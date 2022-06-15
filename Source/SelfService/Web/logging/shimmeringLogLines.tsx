// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { LogLine } from './logLine';

const noopClickHandler = () => { };
const shimmerLabels = {};
const shimmerTimestamp = 0n;
const shimmerLine = { sections: [], leading: { spaces: 0, tabs: 0 } };

export type ShimmeringLogLinesProps = {
    enableShowLineContextButton: boolean;
};

export const ShimmeringLogLines = (props: ShimmeringLogLinesProps) =>
    <>
        <LogLine
            loading
            enableShowLineContextButton={props.enableShowLineContextButton}
            onClickShowLineContext={noopClickHandler}
            labels={shimmerLabels}
            timestamp={shimmerTimestamp}
            line={shimmerLine}
        />
    </>;
