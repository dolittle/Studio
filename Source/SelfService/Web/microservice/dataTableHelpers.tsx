// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { DataGridPro, GridColDef, GridValueGetterParams, GridRenderCellParams, GridComparatorFn } from '@mui/x-data-grid-pro';

import { themeDark } from '../theme/theme';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { CheckCircleRounded, ErrorRounded, WarningRounded, QuestionMark } from '@mui/icons-material';

const styles = {
    dataTable: {
        '.MuiDataGrid-row': {
            cursor: 'pointer'
        },
        '.MuiDataGrid-columnSeparator': {
            display: 'none'
        },
        '.MuiDataGrid-columnHeader:focus': {
            outline: 'none'
        },
        '.MuiDataGrid-columnHeader:focus-within': {
            outline: 'none'
        },
        '.MuiDataGrid-columnHeaderDraggableContainer': {
            outline: 'none'
        },
        '.MuiDataGrid-cell:focus-within': {
            outline: 'none'
        },
        '.MuiIconButton-root': {
            'visibility': 'visible',
            ':hover': {
                backgroundColor: 'transparent'
            }
        },
        '.MuiDataGrid-sortIcon': {
            color: 'rgba(255, 255, 255, 0.38);',
            width: '1.25rem',
            height: '1.25rem'
        },
        '.MuiDataGrid-columnHeader:not(.MuiDataGrid-columnHeader--sorted) .MuiDataGrid-sortIcon': {
            opacity: 1
        }
    },
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

// TODO: Does not sort properly with numbers and string 'None' mixed.
export const sortByRuntimeVersion = (params: GridValueGetterParams) => {
    const runtimeVersion = params.row.edit.extra.runtimeImage.replace(/dolittle\/runtime:/gi, '');
    return `${runtimeVersion || 'None'}`;
};

// export const customUrlFieldSort = (v1, v2, param1, param2) => {
//     const firstObject = rows.filter((row: any) => row.id === param1.id);
//     const secondObject = rows.filter((row: any) => row.id === param2.id);

//     const isFirstPublic = firstObject[0]?.edit.extra.isPublic;
//     const isSecondPublic = secondObject[0]?.edit.extra.isPublic;

//     const compareFirst = isFirstPublic ? 'Available' : 'None';
//     const compareSecond = isSecondPublic ? 'Available' : 'None';

//     return compareFirst.localeCompare(compareSecond);
// };

export const tooltipCell = (params: GridRenderCellParams) => (
    // TODO: Tooltip needs public urls. Map them into title.
    <Tooltip title={``} arrow>
        <span>{params.row.edit.extra.isPublic ? 'Available' : 'None'}</span>
    </Tooltip>
);

export const microserviceStatusInfo = (params: GridRenderCellParams) => {
    try {
        const status = params.row.status[0].phase;
        const checkStatus = status.toLowerCase();

        let color = themeDark.palette.text.primary;
        let icon = <QuestionMark sx={{ color }} />;

        if (checkStatus.includes('running')) {
            icon = <CheckCircleRounded />;
        } else if (checkStatus.includes('pending')) {
            color = themeDark.palette.warning.main;
            icon = <WarningRounded sx={{ color }} />;
        } else if (checkStatus.includes('failed')) {
            color = themeDark.palette.error.main;
            icon = <ErrorRounded sx={{ color }} />;
        }

        return (
            <Box sx={styles.status}>
                {icon}
                <Typography sx={{ ...styles.statusTitle, color }}>{status}</Typography>
            </Box>
        );
    } catch (err) {
        console.error(`Error with '${params.row.name}' status.`);
        return '';
    }
};

export const statusCell = (params: GridRenderCellParams) => (
    <>{microserviceStatusInfo(params)}</>
);