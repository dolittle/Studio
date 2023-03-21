// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { Box, Typography } from '@mui/material';

import { Accordion } from '@dolittle/design-system';

type NewConnectionAccordionProps = {
    id: string;
    title: string;
    description: string;
    children: React.ReactNode;

    onExpanded?: any;
};

export const NewConnectionAccordion = ({ id, title, description, children }: NewConnectionAccordionProps) => {
    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Accordion
            id={id}
            title={title}
            expanded={expanded === id}
            onExpanded={handleChange(id)}
            sx={{ mt: 8 }}
        >
            <Box sx={{ ml: 3 }}>
                <Typography sx={{ maxWidth: 660 }}>{description}</Typography>
                {children}
            </Box>
        </Accordion>
    );
};
