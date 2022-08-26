// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { GridRenderCellParams } from '@mui/x-data-grid-pro';
import { Box, Theme, Typography } from '@mui/material';
import { CheckCircleRounded, ErrorRounded, WarningRounded, QuestionMark } from '@mui/icons-material';

import { Button } from '../../../DesignSystem/atoms/Button/Button';

const styles = {
    status: {
        display: 'flex',
        justifyContent: 'center'
    },
    text: {
        fontWeight: 500,
        fontSize: 12,
        lineHeight: '1.375rem',
    },
    statusTitle: {
        letterSpacing: '0.06rem',
        textTransform: 'uppercase',
        ml: 1.25
    },
    containerStatus: {
        ml: 3,
        pointerEvents: 'none',
        letterSpacing: '0.06em'
    }
};

enum MicroserviceStatus {
    Running = 0,
    Pending = 1,
    Failing = 2,
    Unknown = 3,
}

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

const statusInfo = (status: string) => {
    let primary = (theme: Theme) => theme.palette.text.primary;
    let info = (theme: Theme) => theme.palette.info.main;
    let success = (theme: Theme) => theme.palette.success.main;
    let warning = (theme: Theme) => theme.palette.warning.main;
    let error = (theme: Theme) => theme.palette.error.dark;

    let backgroundColor = info;
    let color = primary;
    let icon = <QuestionMark />;
    let iconWithColor = <QuestionMark sx={{ color }} />;
    let label = 'N/A';

    switch (getMicroserviceState(status)) {
        case MicroserviceStatus.Running:
            backgroundColor = success;
            icon = <CheckCircleRounded />;
            iconWithColor = <CheckCircleRounded sx={{ color }} />;
            label = 'Running';
            break;
        case MicroserviceStatus.Pending:
            backgroundColor = warning;
            color = warning;
            icon = <WarningRounded />;
            iconWithColor = <WarningRounded sx={{ color }} />;
            label = 'Pending';
            break;
        case MicroserviceStatus.Failing:
            backgroundColor = error;
            color = error;
            icon = <ErrorRounded />;
            iconWithColor = <ErrorRounded sx={{ color }} />;
            label = 'Failed';
            break;
        case MicroserviceStatus.Unknown:
            backgroundColor;
            color;
            icon;
            iconWithColor;
            label;
    }

    return {
        backgroundColor,
        color,
        icon,
        iconWithColor,
        label
    };
};

export const ConstainerHealthStatus = ({ status }) => {
    const { backgroundColor, icon, label } = statusInfo(status.join(' '));

    return (
        <Button
            variant='filled'
            startWithIcon={icon}
            sx={{ ...styles.containerStatus, ...styles.text, backgroundColor }}
            label={label} />
    );
};

export const customStatusFieldSort = (_, __, left, right) => {
    const leftStatus = getMicroserviceState(left.value);
    const rightStatus = getMicroserviceState(right.value);
    return leftStatus - rightStatus;
};

export const statusCell = (params: GridRenderCellParams) => {
    const { color, iconWithColor, label } = statusInfo(params.value);

    return (
        <Box sx={styles.status}>
            {iconWithColor}
            <Typography sx={{ ...styles.statusTitle, ...styles.text, color }}>{label}</Typography>
        </Box>
    );
};
