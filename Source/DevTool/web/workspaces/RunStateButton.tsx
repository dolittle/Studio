// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { RunState } from '../../common/applications';
import { IconButton } from '@fluentui/react';

export type StartClickedCallback = () => void;
export type StopClickedCallback = () => void;

export interface RunStateButtonProps {
    runState: RunState;
    onStartClick: StartClickedCallback;
    onStopClick: StopClickedCallback
}

export const RunStateButton = (props: RunStateButtonProps) => {
    const startButton = (<IconButton iconProps={{ iconName: 'MSNVideosSolid' }} title="Start application" onClick={() => props.onStartClick()} />);
    const stopButton = (<IconButton iconProps={{ iconName: 'CircleStopSolid' }} title="Stop application" onClick={() => props.onStopClick()} />);

    switch (props.runState) {
        case RunState.unknown:
        case RunState.stopped:
        case RunState.stopping: {
            return startButton;
        };

        case RunState.partial: {
            return stopButton;
        };

        case RunState.starting:
        case RunState.running: {
            return stopButton;
        };
    }

    return (<></>);
}
