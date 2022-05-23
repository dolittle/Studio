// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';
import { Search } from '@mui/icons-material';
import { InputAdornment, SxProps, TextField } from '@mui/material';

const styles = {
    '& .MuiOutlinedInput-root': {
        backgroundColor: 'rgba(140, 154, 248, 0.08)',
    },
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent'
    }
} as SxProps;

export type SearchFilterProps = {
    onSearch: (query: string) => void;
};

export const SearchFilter = (props: SearchFilterProps) => {
    const [query, setQuery] = useState('');
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleKeypress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key.toLowerCase() === 'enter') {
            submitQuery();
        }

    };
    const submitQuery = () => {
        if (!query) {
            return;
        }
        props.onSearch(query);
        setQuery('');
    };

    return <div>
        <TextField
            sx={styles}
            onKeyDown={handleKeypress}
            onChange={handleOnChange}
            fullWidth
            id={''}
            label={''}
            value={query}
            size='small'
            placeholder='Search'
            InputProps={{
                startAdornment: <InputAdornment position='start'><Search /></InputAdornment>
            }}
        />
    </div>;
};
