// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';
import { TextField } from '../../theme/textField';

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
            props.onSearch(query);
            setQuery('');
        }
    };
    return <div>
        <TextField
            onKeyDown={handleKeypress}
            onChange={handleOnChange}
            fullWidth
            id={''}
            label={''}
            value={query}
            size='small'
            placeholder='Search'
        />
    </div>;
};
