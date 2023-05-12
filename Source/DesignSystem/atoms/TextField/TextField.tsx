// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, TextField as MuiTextField } from '@mui/material';

export const TextField = () =>
    <Box>
        <MuiTextField size='small' id="outlined-basic" label="Outlined" variant="outlined" />
    </Box>;

// component="form"
// sx={{
//     '& > :not(style)': { m: 1, width: '25ch' },
// }}
// noValidate
// autoComplete="off"


{/*<MuiTextField id="filled-basic" label="Filled" variant="filled" />
<MuiTextField id="standard-basic" label="Standard" variant="standard" /> */}
