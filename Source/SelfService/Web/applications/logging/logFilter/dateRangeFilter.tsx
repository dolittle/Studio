// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { Box, MenuItem, SelectChangeEvent, TextField } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { nb } from 'date-fns/locale';

import { FilterSelect } from './filterSelect';
import { LogFilterDateRange } from './logFilterPanel';

const beginningOfToday = () => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
};

const endOfToday = () => {
    const date = new Date();
    date.setHours(23, 59, 59, 999);
    return date;
};

export type DateRangeFilterProps = {
    range: LogFilterDateRange;
    onSetDateRange: (range: LogFilterDateRange) => void;
};

export const DateRangeFilter = ({ range, onSetDateRange }: DateRangeFilterProps) => {
    const [startDate, setStartDate] = useState<Date | null>(beginningOfToday);
    const [stopDate, setStopDate] = useState<Date | null>(endOfToday);

    const selectValue = range === 'live' ? 'live' : 'daterange';

    const isValidDate = (date: Date | null): boolean => date?.toString().toLowerCase() !== 'invalid date';

    useEffect(() => {
        if (range === 'live') return;

        const start = Number(range.start / 1_000_000n);
        if (startDate === null || startDate.valueOf() !== start) {
            setStartDate(new Date(start));
        }

        const stop = Number(range.stop / 1_000_000n);
        if (stopDate === null || stopDate.valueOf() !== stop) {
            setStopDate(new Date(stop));
        }

    }, [range]);

    const handleOnChange = (event: SelectChangeEvent<string>) => {
        if (event.target.value === 'daterange') {
            let start = startDate, stop = stopDate;

            if (start === null) {
                start = beginningOfToday();
                setStartDate(start);
            }

            if (stop === null) {
                stop = endOfToday();
                setStopDate(stop);
            }

            onSetDateRange({
                start: BigInt(start.valueOf()) * 1_000_000n,
                stop: BigInt(stop.valueOf()) * 1_000_000n,
            });

        } else {
            onSetDateRange('live');
        }
    };

    const handleOnStartDateChange = (value: Date | null) => {
        setStartDate(value);

        if (range !== 'live' && value && isValidDate(value) && BigInt(value.valueOf()) * 1_000_000n < range.stop) {
            onSetDateRange({
                start: BigInt(value.valueOf()) * 1_000_000n,
                stop: range.stop,
            });
        }
    };

    const handleOnStopDateChange = (value: Date | null) => {

        setStopDate(value);

        if (range !== 'live' && value && isValidDate(value) && BigInt(value.valueOf()) * 1_000_000n > range.start) {
            onSetDateRange({
                start: range.start,
                stop: BigInt(value.valueOf()) * 1_000_000n,
            });
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={nb}>
            <FilterSelect
                value={selectValue}
                onChange={handleOnChange}
            >
                <MenuItem value='live'>Live logs</MenuItem>
                <MenuItem value='daterange'>Date range...</MenuItem>
            </FilterSelect>

            {range !== 'live' &&
                <Box sx={{ mt: 1 }}>
                    <DateTimePicker
                        renderInput={props => <TextField variant='outlined' size='small' sx={{ mr: 1 }} {...props} />}
                        label='Start'
                        mask='__.__.____ __:__'
                        value={startDate}
                        onChange={handleOnStartDateChange}
                        maxDateTime={stopDate === null ? undefined : stopDate}
                    />

                    <DateTimePicker
                        renderInput={props => <TextField variant='outlined' size='small' {...props} />}
                        mask='__.__.____ __:__'
                        label='End'
                        value={stopDate}
                        onChange={handleOnStopDateChange}
                        minDateTime={startDate === null ? undefined : startDate}
                    />
                </Box>
            }
        </LocalizationProvider>
    );
};
