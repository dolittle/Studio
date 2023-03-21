// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Box, Typography } from '@mui/material';

import { Accordion } from '@dolittle/design-system';

type NewConnectionAccordionProps = {
    id: string;
    title: string;
    description: string;
    children: React.ReactNode;
};

export const NewConnectionAccordion = ({ id, title, description, children }: NewConnectionAccordionProps) =>
    <Accordion id={id} title={title} sx={{ mt: 8 }}>
        <Box sx={{ ml: 3 }}>
            <Typography sx={{ maxWidth: 660 }}>{description}</Typography>
            {children}
        </Box>
    </Accordion>;
