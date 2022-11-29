// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState, useEffect } from 'react';

import { useSnackbar } from 'notistack';
import { format, formatDuration, intervalToDuration, Locale, parse, sub } from 'date-fns';
import { enUS } from 'date-fns/locale';

import { getPodLogs } from '../../../api/api';

import { GridRenderCellParams } from '@mui/x-data-grid-pro';
import { Link } from '@mui/material';
import { DownloadRounded } from '@mui/icons-material';

const shortDurationLocale: Locale = {
    formatDistance(token, count) {
        switch (token) {
            case 'xYears':
                return `${count}y`;
            case 'xMonths':
                return `${count}m`;
            case 'xWeeks':
                return `${count}w`;
            case 'xDays':
                return `${count}d`;
            case 'xHours':
                return `${count}h`;
            case 'xMinutes':
                return `${count}m`;
            case 'xSeconds':
                return `${count}s`;
            default:
                return enUS.formatDistance!(token, count);
        }
    }
};

export const formatTime = (time: string) => {
    if (typeof time !== 'string') {
        return 'N/A';
    }

    const match = time.match(/^(?:(?<hours>\d+)h)?(?:(?<minutes>\d+)m)?(?:(?<seconds>[\d.]+)s)?(?:(?<milliseconds>[\d.]+)ms)?(?:(?<microseconds>[\d.]+)µs)?(?:(?<nanoseconds>[\d.]+)ns)?$/);
    if (!match?.groups) {
        return 'N/A';
    }

    const { hours, minutes, seconds, milliseconds, microseconds, nanoseconds } = match.groups;

    const duration = {
        hours: parseFloat(hours) || 0,
        minutes: parseFloat(minutes) || 0,
        seconds: (parseFloat(seconds) || 0) + (parseFloat(milliseconds) || 0) * 1e3 + (parseFloat(microseconds) || 0) * 1e6 + (parseFloat(nanoseconds) || 0) * 1e9,
    };

    const normalisedDuration = intervalToDuration({
        start: sub(Date.now(), duration),
        end: Date.now(),
    });

    return formatDuration(normalisedDuration, { format: ['days', 'hours', 'minutes', 'seconds'], locale: shortDurationLocale });
};

export const formatStartingDate = (initialDate: string) => {
    if (typeof initialDate !== 'string') {
        return 'N/A';
    }

    const parsedDate = parse(initialDate, `yyyy-MM-dd HH:mm:ss xxxx 'UTC'`, Date.now());
    if (isNaN(parsedDate.valueOf())) {
        return 'N/A';
    }

    return format(parsedDate, 'yyyy/MM/dd HH:mm:ss');
};

export const DownloadLogs = (params: GridRenderCellParams) => {
    const [data, setData] = useState({ logs: '' });

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        getPodLogs(params.row.application, params.row.podName, params.row.containerName).then(setData);
    }, [params.row.application, params.row.podName, params.row.containerName]);

    const logsBlob = new Blob([data.logs], { type: 'text/plain' });
    const containerImage = params.row.image.replace(':', '/');

    const handleNotification = () => {
        enqueueSnackbar(`'${containerImage}' logs have been downloaded.`);
    };

    return (
        <Link
            href={URL.createObjectURL(logsBlob)}
            download={`${containerImage}.log`}
            onClick={handleNotification}
        >
            <DownloadRounded fontSize='small' sx={{ color: 'text.primary' }} />
        </Link>
    );
};
