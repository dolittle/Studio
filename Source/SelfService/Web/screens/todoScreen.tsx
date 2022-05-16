// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Typography } from '@mui/material';
import React from 'react';

type Props = {
};

export const TodoScreen: React.FunctionComponent<Props> = (props) => {
    const _props = props!;
    return (
        <>
            <Typography variant='h1' my={2}>Todo</Typography>
        </>
    );
};
