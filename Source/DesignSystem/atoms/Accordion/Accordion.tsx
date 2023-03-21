// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Accordion as MuiAccordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { ExpandCircleDownRounded } from '@mui/icons-material';

const styles = {
    accordion: {
        backgroundColor: 'transparent',
        backgroundImage: 'none',
    },
    accordionSummary: {
        'p': 0,
        // Move the expansion arrow to the left side
        'flexDirection': 'row-reverse',
        // Disable 'expand' click for the entire row
        'pointerEvents': 'none',
        '& .MuiAccordionSummary-expandIconWrapper': {
            transform: 'rotate(180deg)',
        },
        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(0deg)',
        },
    },
    expandIcon: {
        color: 'text.secondary',
        // Enable 'expand' click on icon only
        pointerEvents: 'auto',
    },
};

export type AccordionProps = {
    id: string;
    title: string;
    defaultExpanded?: boolean;
    expanded?: boolean;
    handleChange?: (event: React.SyntheticEvent, isExpanded: boolean) => void;
    children: React.ReactNode;
};

export const Accordion = ({ id, title, handleChange, expanded, defaultExpanded, children }: AccordionProps) =>
    <MuiAccordion
        defaultExpanded={defaultExpanded}
        expanded={expanded}
        onChange={handleChange}
        sx={styles.accordion}
    >
        <AccordionSummary
            expandIcon={<ExpandCircleDownRounded sx={styles.expandIcon} />}
            aria-controls={`${id}-content`}
            id={`${id}-header`}
            sx={styles.accordionSummary}
        >
            <Typography variant='subtitle1' sx={{ ml: 1.25 }}>{title}</Typography>
        </AccordionSummary>

        <AccordionDetails>{children}</AccordionDetails>
    </MuiAccordion>;
