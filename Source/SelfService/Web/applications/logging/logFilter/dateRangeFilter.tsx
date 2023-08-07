// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState, useEffect } from 'react';

import { Box, InputProps, MenuItem, SelectChangeEvent, TextField } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { nb } from 'date-fns/locale';

import { LogFilterDateRange } from './logFilterPanel';
import { FilterSelect } from './filterSelect';

export type DateRangeFilterProps = {
    range: LogFilterDateRange;
    onSetDateRange: (range: LogFilterDateRange) => void;
};

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

export const DateRangeFilter = (props: DateRangeFilterProps) => {
    const [startDate, setStartDate] = useState<Date | null>(beginningOfToday);
    const [stopDate, setStopDate] = useState<Date | null>(endOfToday);

    const selectValue = props.range === 'live' ? 'live' : 'daterange';

    useEffect(() => {
        if (props.range === 'live') return;

        const start = Number(props.range.start / 1_000_000n);
        if (startDate === null || startDate.valueOf() !== start) {
            setStartDate(new Date(start));
        }

        const stop = Number(props.range.stop / 1_000_000n);
        if (stopDate === null || stopDate.valueOf() !== stop) {
            setStopDate(new Date(stop));
        }

    }, [props.range]);

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

            props.onSetDateRange({
                start: BigInt(start.valueOf()) * 1_000_000n,
                stop: BigInt(stop.valueOf()) * 1_000_000n,
            });

        } else {
            props.onSetDateRange('live');
        }
    };

    const handleOnStartDateChange = (value: Date | null) => {
        setStartDate(value);

        if (props.range !== 'live' && value && isValidDate(value) && BigInt(value.valueOf()) * 1_000_000n < props.range.stop) {
            props.onSetDateRange({
                start: BigInt(value.valueOf()) * 1_000_000n,
                stop: props.range.stop,
            });
        }
    };

    const handleOnStopDateChange = (value: Date | null) => {

        setStopDate(value);

        if (props.range !== 'live' && value && isValidDate(value) && BigInt(value.valueOf()) * 1_000_000n > props.range.start) {
            props.onSetDateRange({
                start: props.range.start,
                stop: BigInt(value.valueOf()) * 1_000_000n,
            });
        }
    };

    const isValidDate = (date: Date | null): boolean => date?.toString().toLowerCase() !== 'invalid date';

    const dateTimePickerInputProps: Partial<InputProps> = {
        size: 'small',
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={nb}>
            <FilterSelect value={selectValue} onChange={handleOnChange}>
                <MenuItem value='live'>Live logs</MenuItem>
                <MenuItem value='daterange'>Date range...</MenuItem>
            </FilterSelect>

            {props.range !== 'live' &&
                <Box sx={{ mt: 1 }}>
                    <DateTimePicker
                        renderInput={(props) =>
                            <TextField
                                sx={{ mr: { xs: 0, md: 1 }, mb: { xs: 2, md: 0 } }}
                                {...props}
                                variant='outlined'
                            />}
                        InputProps={dateTimePickerInputProps}
                        label='Start'
                        mask='__.__.____ __:__'
                        value={startDate}
                        onChange={handleOnStartDateChange}
                        maxDateTime={stopDate === null ? undefined : stopDate}
                    />

                    <DateTimePicker
                        renderInput={props => <TextField variant='outlined' {...props} />}
                        InputProps={dateTimePickerInputProps}
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
