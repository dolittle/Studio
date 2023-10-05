// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { InputAdornment, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';

const styles = {
    '& .MuiOutlinedInput-root': {
        'backgroundColor': 'rgba(140, 154, 248, 0.08)',
        '& ::placeholder': { fontStyle: 'italic' },
        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
    },
};

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

    return (
        <TextField
            onKeyDown={handleKeypress}
            onChange={handleOnChange}
            fullWidth
            id={''}
            label={''}
            value={query}
            size='small'
            placeholder='Search...'
            InputProps={{
                startAdornment:
                    <InputAdornment position='start' onClick={submitQuery}>
                        <Search />
                    </InputAdornment>
            }}
            sx={styles}
        />
    );
};
