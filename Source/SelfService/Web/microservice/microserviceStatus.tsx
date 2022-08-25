// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { GridRenderCellParams } from '@mui/x-data-grid-pro';
import { Box, Theme, Typography } from '@mui/material';
import { CheckCircleRounded, ErrorRounded, WarningRounded, QuestionMark } from '@mui/icons-material';

const styles = {
    status: {
        display: 'flex',
        justifyContent: 'center'
    },
    statusTitle: {
        fontWeight: 500,
        fontSize: '0.75rem',
        lineHeight: '1.375rem',
        letterSpacing: '0.06rem',
        textTransform: 'uppercase',
        ml: 1.25
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
    } else if (checkStatus.includes('running')) {
        return MicroserviceStatus.Running;
    } else if (checkStatus.includes('pending')) {
        return MicroserviceStatus.Pending;
    } else if (checkStatus.includes('failed')) {
        return MicroserviceStatus.Failing;
    }

    return MicroserviceStatus.Unknown;
};

export const customStatusFieldSort = (_, __, left, right) => {
    const leftStatus = getMicroserviceState(left.value[0]?.phase);
    const rightStatus = getMicroserviceState(right.value[0]?.phase);
    return leftStatus - rightStatus;
};

export const statusCell = (params: GridRenderCellParams) => {
    let color = (theme: Theme) => theme.palette.text.primary;
    let icon = <QuestionMark sx={{ color }} />;
    let status = 'N/A';

    switch (getMicroserviceState(params.value)) {
        case MicroserviceStatus.Running:
            icon = <CheckCircleRounded />;
            status = 'Running';
            break;
        case MicroserviceStatus.Pending:
            color = (theme: Theme) => theme.palette.warning.main;
            icon = <WarningRounded sx={{ color }} />;
            status = 'Pending';
            break;
        case MicroserviceStatus.Failing:
            color = (theme: Theme) => theme.palette.error.main;
            icon = <ErrorRounded sx={{ color }} />;
            status = 'Failed';
            break;
        case MicroserviceStatus.Unknown:
            return 'N/A';
    }

    return (
        <Box sx={styles.status} >
            {icon}
            <Typography sx={{ ...styles.statusTitle, color }}>{status}</Typography>
        </Box>
    );
};
