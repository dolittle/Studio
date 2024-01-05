// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { AigonHelper, InlineWrapper, TextField } from '../../index';

export type SearchBarWithAigonProps = {
    onFieldSearchTermChange: (searchTerm: string) => void;
};

export const SearchBarWithAigon = ({ onFieldSearchTermChange }: SearchBarWithAigonProps) => {
    return (
        <InlineWrapper>
            <TextField
                placeholder='Search fields'
                isFullWidth
                startIcon='Search'
                variant='outlined'
                onValueChange={event => onFieldSearchTermChange(event.target.value)}
            />
            <AigonHelper onAigonActivate={() => { }} />
        </InlineWrapper>
    );
};
