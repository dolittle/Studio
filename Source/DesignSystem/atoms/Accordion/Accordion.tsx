// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Accordion as MuiAccordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { ExpandCircleDownRounded } from '@mui/icons-material';

const styles = {
    accordion: {
        backgroundColor: 'transparent',
        backgroundImage: 'none'
    },
    accordionSummary: {
        // Move expand arrow to the left side
        'flexDirection': 'row-reverse',
        // Disable 'expand' click for the whole line
        'pointerEvents': 'none',
        'p': 0,
        '& .MuiAccordionSummary-expandIconWrapper': {
            transform: 'rotate(180deg)',
        },
        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(0deg)',
        }
    },
    expandIcon: {
        color: 'text.secondary',
        // Allow 'expand' click for the icon only
        pointerEvents: 'auto'
    }
};

export type AccordionProps = {
    id: string;
    title: string;
    children: React.ReactNode;
    defaultExpanded?: boolean;
};

export const Accordion = ({ defaultExpanded, id, title, children }: AccordionProps) =>
    <MuiAccordion
        defaultExpanded={defaultExpanded}
        TransitionProps={{ unmountOnExit: true }}
        sx={styles.accordion}
    >
        <AccordionSummary
            expandIcon={<ExpandCircleDownRounded sx={styles.expandIcon} />}
            aria-controls={id}
            id={id}
            sx={styles.accordionSummary}
        >
            <Typography variant='subtitle1' sx={{ ml: 1.25 }}>{title}</Typography>
        </AccordionSummary>

        <AccordionDetails>{children}</AccordionDetails>
    </MuiAccordion>;
