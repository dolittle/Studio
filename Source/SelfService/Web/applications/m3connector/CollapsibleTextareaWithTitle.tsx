// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { TextareaAutosize, Typography } from '@mui/material';

export type CollapsibleTextareaWithTitleProps = {
    value: string;
    title: string;
    open: boolean;
};

export const CollapsibleTextareaWithTitle = ({ value, title, open }: CollapsibleTextareaWithTitleProps) => {
    const [textAreaIsOpen, setTextAreaIsOpen] = useState(open);

    return (
        <>
            <Typography variant='h2' onClick={() => setTextAreaIsOpen(!textAreaIsOpen)} sx={{ my: 2, textDecoration: 'underline', cursor: 'pointer' }}>
                {title}
            </Typography>

            {textAreaIsOpen ? <TextareaAutosize value={value} style={{ width: 1 }} /> : null}
        </>
    );
};
