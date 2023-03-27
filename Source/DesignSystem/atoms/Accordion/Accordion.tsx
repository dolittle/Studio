// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Accordion as MuiAccordion, AccordionDetails, AccordionSummary, SxProps, Typography } from '@mui/material';
import { ExpandCircleDownRounded } from '@mui/icons-material';

const styles = {
    accordion: {
        'backgroundColor': 'transparent',
        'backgroundImage': 'none',
        'boxShadow': 'none',
        '::before': {
            display: 'none',
        },
    },
    accordionSummary: {
        'p': 0,
        // Move the expansion arrow to the left side.
        'flexDirection': 'row-reverse',
        // Disable 'expand' click for the entire row.
        'pointerEvents': 'none',
        // Enable 'expand' click on title.
        '& h6': {
            pointerEvents: 'auto',
        },
        '& .MuiAccordionSummary-expandIconWrapper': {
            transform: 'rotate(-90deg)',
        },
        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(0deg)',
        },
    },
    expandIcon: {
        color: 'text.secondary',
        // Enable 'expand' click on icon.
        pointerEvents: 'auto',
    },
};

/**
 * The props for a {@link Accordion} component.
 */
export type AccordionProps = {
    /**
     * The id of the accordion. Used for accessibility.
     */
    id: string;

    /**
     * The title of the accordion. Displayed in the header.
     */
    title: string;

    /**
     * Whether the accordion is expanded or not on initial render.
     *
     * @default false
     */
    defaultExpanded?: boolean;

    /**
     * Whether the accordion is expanded or not.
     *
     * If provided, the accordion will be controlled by the parent.
     *
     * @default false
     */
    expanded?: boolean;

    /**
     * The callback function that is called when the accordion is expanded or collapsed.
     */
    onExpanded?: (event: React.SyntheticEvent, isExpanded: boolean) => void;

    /**
     * The content of the accordion.
     *
     * This is the content that is displayed when the accordion is expanded.
     */
    children: React.ReactNode;

    /**
     * The sx prop lets you add custom styles to the component, overriding the styles defined by Material-UI.
     */
    sx?: SxProps;
};

/**
 * The Accordion component is used to display a collapsible section of content.
 * @param {AccordionProps} props - The {@link AccordionProps}.
 * @returns A {@link Accordion} component.
 */
export const Accordion = ({ id, title, defaultExpanded, expanded, onExpanded, children, sx }: AccordionProps) =>
    <MuiAccordion
        defaultExpanded={defaultExpanded}
        expanded={expanded}
        onChange={onExpanded}
        sx={{ ...styles.accordion, ...sx }}
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
