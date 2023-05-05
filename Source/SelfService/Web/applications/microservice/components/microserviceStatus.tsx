// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Button, StatusIndicatorProps, SvgIconsDefinition } from '@dolittle/design-system';

enum MicroserviceStatus {
    Running = 0,
    Pending = 1,
    Failing = 2,
    Unknown = 3,
};

const getMicroserviceState = (phase?: string): MicroserviceStatus => {
    const checkStatus = phase?.toLowerCase?.();

    if (!checkStatus && typeof checkStatus !== 'string') {
        return MicroserviceStatus.Unknown;
    } else if (checkStatus.includes('failed')) {
        return MicroserviceStatus.Failing;
    } else if (checkStatus.includes('pending') ||
        checkStatus.includes('waiting')) {
        return MicroserviceStatus.Pending;
    } else if (checkStatus.includes('running')) {
        return MicroserviceStatus.Running;
    }

    return MicroserviceStatus.Unknown;
};

type StatusInfo = {
    color: 'subtle' | 'error' | 'info' | 'success' | 'warning';
    icon: SvgIconsDefinition;
    label: string
};

const statusInfo = (status: string) => {
    let color = 'subtle';
    let icon = 'QuestionMark';
    let label = 'n/a';

    switch (getMicroserviceState(status)) {
        case MicroserviceStatus.Running:
            icon = 'CheckCircleRounded';
            label = 'running';
            break;
        case MicroserviceStatus.Pending:
            color = 'warning';
            icon = 'WarningRounded';
            label = 'pending';
            break;
        case MicroserviceStatus.Failing:
            color = 'error';
            icon = 'ErrorRounded';
            label = 'failed';
            break;
        case MicroserviceStatus.Unknown:
            color = 'info';
    }

    return { color, icon, label } as StatusInfo;
};

export const healthStatus = (status: string): StatusIndicatorProps => {
    if (status === 'running') {
        return {
            status: 'table-success',
            label: 'running',
        };
    } else if (status === 'waiting' || status === 'pending') {
        return {
            status: 'warning',
            label: 'pending',
        };
    } else if (status === 'failed') {
        return {
            status: 'error',
            label: 'failing',
        };
    }

    return { status: 'unknown' };
};

export const ContainerHealthStatus = ({ status }: { status: string[] }) => {
    const { color, icon, label } = statusInfo(status.join(' '));

    return (
        <Button
            label={label}
            variant='filled'
            color={label === 'running' ? 'success' : color}
            startWithIcon={icon}
            component='span'
            role='none'
            sx={{ pointerEvents: 'none' }}
        />
    );
};

export const customStatusFieldSort = (_, __, left, right) => {
    const leftStatus = getMicroserviceState(left.value);
    const rightStatus = getMicroserviceState(right.value);
    return leftStatus - rightStatus;
};
