// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';
import { SxProps } from '@mui/material';
import { Accordion, AccordionProps } from '../Accordion/Accordion';

/**
 * The props for a {@link AccordionList} component.
 */
export type AccordionListProps = {
    /**
     * List of accordion items to display.
     *
     */
    items: AccordionProps[];

    /**
     * Id of the initial accordion item to be expanded. Optional.
     * If left empty, all accordion items start collapsed.
     *
     */
    initialId?: string;
    /**
     * Flag indicating if only one accordion item should be expanded at at time.
     * If left empty, all accordion items start collapsed and can be expanded independently.
     *
     */
    singleExpandMode: boolean;
};

/**
 * The AccordionList component is used to display a list of {@link Accordion} components.
 * It supports enabling "singøe expanded mode", allowing only a single accordion item to be open at any time.
 * @param {AccordionListProps} props - The {@link AccordionListProps}.
 * @returns A {@link AccordionList} component.
 */
export const AccordionList = ({ singleExpandMode, items, initialId = '' }: AccordionListProps) => {

    const [expanded, setExpanded] = useState<string>(initialId);

    const handleExpanded = (panel: string, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : '');
    };

    return (
        <>
            {items.map(i => (
                <Accordion
                    key={i.id}
                    id={i.id}
                    title={i.title}
                    expanded={singleExpandMode ? expanded === i.id : undefined}
                    onExpanded={(event, isExpanded) => handleExpanded(i.id, isExpanded)}
                    sx={{ ...i.sx }}
                >
                    {i.children}
                </Accordion>
            ))}
        </>
    );
};
