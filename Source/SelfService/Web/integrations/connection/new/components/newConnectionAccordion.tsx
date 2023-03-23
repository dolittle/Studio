// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { Box, Typography } from '@mui/material';

import { Accordion } from '@dolittle/design-system';
import { AccordionProps } from 'Source/DesignSystem/atoms/Accordion/Accordion';

type NewConnectionAccordionProps = {
    id: string;
    title: string;
    description?: string;
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

export type AccordionListProps = {
    items: NewConnectionAccordionProps[];
    singleExpandMode: boolean;
};

export const AccordionList = ({singleExpandMode, items}: AccordionListProps) => {

    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <>
        {items.map(i => (
            <Accordion
                key={i.id}
                id={i.id}
                title={i.title}
                expanded={singleExpandMode ? expanded === i.id : undefined}
                onExpanded={handleChange(i.id)}
                sx={{ mt: 8 }}
            >
                <Box sx={{ ml: 3 }}>
                    <Typography sx={{ maxWidth: 660 }}>{i.description}</Typography>
                    {i.children}
                </Box>
            </Accordion>
        ))}
        </>
    );

};

