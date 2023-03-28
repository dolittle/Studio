// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { SvgIconsDefinition } from '@dolittle/design-system';

enum ConnectionStatus {
    Running = 0,
    Connected = 1,
    Pending = 2,
    Waiting = 3,
    Failing = 4,
    //Registered = 5,
    Unknown = 6,
};

// To get the overall status.
const getConnectionStatus = (status: string): ConnectionStatus => {
    if (!status && typeof status !== 'string') {
        return ConnectionStatus.Unknown;
    } else if (status.includes('failed')) {
        return ConnectionStatus.Failing;
    } else if (status.includes('waiting')) {
        return ConnectionStatus.Waiting;
    } else if (status.includes('pending')) {
        return ConnectionStatus.Pending;
    } else if (status.includes('connected')) {
        return ConnectionStatus.Connected;
    } else if (status.includes('running')) {
        return ConnectionStatus.Running;
    }

    return ConnectionStatus.Unknown;
};

type ConnectionStatusCondition = {
    color: 'subtle' | 'success.main' | 'warning.main' | 'error.main' | 'info.main';
    icon: SvgIconsDefinition['icon'] | null;
};

export const connectionStatusCondition = (status: string) => {
    switch (getConnectionStatus(status)) {
        case ConnectionStatus.Running:
            return { color: 'subtle', icon: 'CheckCircleRounded' } as ConnectionStatusCondition;
        case ConnectionStatus.Connected:
            return { color: 'success.main', icon: 'CheckCircleRounded' } as ConnectionStatusCondition;
        case ConnectionStatus.Pending:
            return { color: 'warning.main', icon: 'WarningRounded' } as ConnectionStatusCondition;
        case ConnectionStatus.Waiting:
            return { color: 'subtle', icon: null } as ConnectionStatusCondition;
        case ConnectionStatus.Failing:
            return { color: 'error.main', icon: 'ErrorRounded' } as ConnectionStatusCondition;
        case ConnectionStatus.Unknown:
            return { color: 'info.main', icon: 'QuestionMarkRounded' } as ConnectionStatusCondition;
    }
};
