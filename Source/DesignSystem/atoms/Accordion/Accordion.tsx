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
        // Disable 'expand' for the whole line
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
        // Allow 'expand' for the icon only
        pointerEvents: 'auto'
    }
};

type AccordionProps = {
    id: string;
    title: string;
    children: React.ReactNode;
    isExpanded?: boolean;
    defaultExpanded?: boolean;
    onChange?: (event: React.SyntheticEvent<Element, Event>, expanded: boolean) => void;
};

export const Accordion = (props: AccordionProps) =>
    <MuiAccordion
        expanded={props.isExpanded}
        defaultExpanded={props.defaultExpanded}
        onChange={props.onChange}
        TransitionProps={{ unmountOnExit: true }}
        sx={styles.accordion}
    >
        <AccordionSummary
            expandIcon={<ExpandCircleDownRounded sx={styles.expandIcon} />}
            aria-controls={props.id}
            id={props.id}
            sx={styles.accordionSummary}
        >
            <Typography variant='subtitle1' sx={{ ml: 1.25 }}>{props.title}</Typography>
        </AccordionSummary>

        <AccordionDetails>{props.children}</AccordionDetails>
    </MuiAccordion>;
