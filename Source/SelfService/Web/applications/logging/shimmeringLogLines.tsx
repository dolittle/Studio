// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { LogLine } from './logLine';

const noopClickHandler = () => { };
const shimmerLabels = {};
const shimmerTimestamp = 0n;
const shimmerLine = { sections: [], leading: { spaces: 0, tabs: 0 } };

export type ShimmeringLogLinesProps = {
    showContextButton?: boolean;
};

export const ShimmeringLogLines = (props: ShimmeringLogLinesProps) =>
    <LogLine
        loading
        showContextButton={props.showContextButton}
        onClickShowLineContext={noopClickHandler}
        labels={shimmerLabels}
        timestamp={shimmerTimestamp}
        line={shimmerLine}
    />;
