// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Accordion as MuiAccordion, AccordionDetails, AccordionSummary, SxProps, Typography } from '@mui/material';
import { ExpandCircleDownRounded } from '@mui/icons-material';

import { StatusIndicator, StatusIndicatorProps } from '@dolittle/design-system';

const styles = {
    accordion: {
        'backgroundColor': 'transparent',
        'backgroundImage': 'none',
        'boxShadow': 'none',
        '::before': { display: 'none' },
        '&.Mui-disabled': {
            'backgroundColor': 'inherit',
            '& h6': {
                pointerEvents: 'none',
            },
            '& .MuiAccordionSummary-expandIconWrapper .MuiSvgIcon-root': {
                pointerEvents: 'none',
            }
        }
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
        }
    },
    expandIcon: {
        color: 'text.secondary',
        // Enable 'expand' click on icon.
        pointerEvents: 'auto'
    }
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
     * The status of the accordion. Displayed in the header.
     * @default undefined
     */
    progressStatus?: StatusIndicatorProps['status'];

    /**
     * The status text of the accordion. Displayed in the header.
     *
     * If not provided, the `progressStatus` will be used as the label.
     */
    progressLabel?: StatusIndicatorProps['label'];

    /**
     * Whether the accordion is expanded or not on initial render.
     * @default false
     */
    defaultExpanded?: boolean;

    /**
     * Whether the accordion is expanded or not.
     *
     * If provided, the accordion will be controlled by the parent.
     * @default false
     */
    expanded?: boolean;

    /**
     * The callback function that is called when the accordion is expanded or collapsed.
     */
    onExpanded?: (event: React.SyntheticEvent, isExpanded: boolean) => void;

    /**
     * Disable the accordion button. This will prevent the accordion from being expanded or collapsed, and instead will be shown in whatever state it is currently in.
     */
    disabled?: boolean;

    /**
     * The content of the accordion.
     *
     * This is the content that is displayed when the accordion is expanded.
     */
    children: React.ReactNode;

    /**
     * The `sx` prop lets you add custom styles to the component, overriding the styles defined by Material-UI.
     */
    sx?: SxProps;
};

/**
 * The Accordion component is used to display a collapsible section of content.
 * @param {AccordionProps} props - The {@link AccordionProps}.
 * @returns A {@link Accordion} component.
 */
export const Accordion = ({ id, title, progressStatus, progressLabel, defaultExpanded, expanded, onExpanded, disabled, children, sx }: AccordionProps) => {
        console.log('expanded', expanded);
        return <MuiAccordion
            defaultExpanded={defaultExpanded}
            expanded={expanded}
            onChange={onExpanded}
            disabled={disabled}
            sx={{ ...styles.accordion, ...sx }}
        >
            <AccordionSummary
                expandIcon={<ExpandCircleDownRounded sx={styles.expandIcon} />}
                aria-controls={`${id}-content`}
                id={`${id}-header`}
                disabled={disabled}
                sx={styles.accordionSummary}
            >
                <Typography variant='subtitle1' sx={{ ml: 1.25, mr: 3 }}>{title}</Typography>
                {progressStatus && <StatusIndicator status={progressStatus} label={progressLabel} />}
            </AccordionSummary>

            <AccordionDetails>{children}</AccordionDetails>
        </MuiAccordion>;
    };
