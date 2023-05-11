// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { format, formatDuration, intervalToDuration, Locale, parse, sub } from 'date-fns';
import { enUS } from 'date-fns/locale';

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

export const formatDate = (date: Date): string => {
    return format(date, 'yyyy/MM/dd');
};

export const formatDateFriendly = (date: Date): string => {
    return format(date, 'd MMMM yyyy');
};
