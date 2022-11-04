// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Accordion as MuiAccordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { ExpandCircleDownRounded } from '@mui/icons-material';

type AccordionProps = {
    id: string;
    expanded: boolean;
    title: string;
    children: React.ReactNode;
    onChange: () => void;
};

export const Accordion = (props: AccordionProps) => {
    return (
        <MuiAccordion
            expanded={props.expanded}
            onChange={props.onChange}
            sx={{
                backgroundColor: 'transparent',
                backgroundImage: 'none',
                pt: 1.875
            }}>
            <AccordionSummary
                expandIcon={<ExpandCircleDownRounded sx={{ color: 'text.secondary' }} />}
                aria-controls={props.id}
                id={props.id}
                sx={{
                    'flexDirection': 'row-reverse',
                    'p': 0,
                    '& .MuiAccordionSummary-expandIconWrapper': {
                        transform: 'rotate(180deg)',
                    },
                    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
                        transform: 'rotate(0deg)',
                    },
                }}
            >
                <Typography variant='subtitle1' sx={{ ml: 1.25 }}>{props.title}</Typography>
            </AccordionSummary>

            <AccordionDetails>
                {props.children}
            </AccordionDetails>
        </MuiAccordion>
    );
};
