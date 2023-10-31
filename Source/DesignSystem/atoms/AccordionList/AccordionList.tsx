// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { Accordion, AccordionProps } from '../../index';

export type AccordionListItem = Omit<AccordionProps, 'defaultExpanded' | 'expanded' | 'onExpanded'>;

/**
 * The props for a {@link AccordionList} component.
 */
export type AccordionListProps = {
    /**
     * List of accordion items to display.
     */
    items: AccordionListItem[];

    /**
     * Flag indicating if only one accordion item should be expanded at at time.
     *
     * If left empty, all accordion items start collapsed and can be expanded independently.
     * @default false
     */
    singleExpandMode?: boolean;

    /**
     * List of accordion items to expand.
     */
    expandedModel?: AccordionListItem['id'][];

    /**
     * Callback triggered when expanded model changes.
     */
    onExpandedModelChange?: (expandedModel: AccordionListItem['id'][]) => void;
};

/**
 * The AccordionList component is used to display a list of {@link Accordion} components.
 * It supports enabling "single expanded mode", allowing only a single accordion item to be open at any time.
 * @param {AccordionListProps} props - The {@link AccordionListProps}.
 * @returns A {@link AccordionList} component.
 */
export const AccordionList = ({ singleExpandMode, items, expandedModel, onExpandedModelChange }: AccordionListProps) => {
    const hasMultipleExpanded = expandedModel && expandedModel.length > 1;

    if (singleExpandMode && hasMultipleExpanded) {
        console.warn('AccordionList: singleExpandMode is enabled, but more than one accordion item is expanded. Selecting first item.');
        expandedModel = [expandedModel![0]];
    }

    const [expanded, setExpanded] = useState<Set<string>>(new Set(expandedModel || []));

    const handleExpanded = (accordionId: string, isExpanded: boolean) => {
        setExpanded(current => {
            const expandedList = singleExpandMode ? new Set<string>() : new Set<string>(current);

            if (isExpanded) {
                expandedList.add(accordionId);
            } else {
                expandedList.delete(accordionId);
            }

            onExpandedModelChange?.([...expandedList]);
            return expandedList;
        });
    };

    const isExpandedControlledState = (panel: string) => expanded.has(panel);

    useEffect(() => {
        if (expandedModel && (expandedModel.length !== [...expanded].length || !expandedModel.every(model => expanded.has(model)))) {
            setExpanded(new Set(expandedModel));
        }
    }, [expandedModel]);

    return (
        <>
            {items.map(item => (
                <Accordion
                    key={item.id}
                    {...item}
                    expanded={isExpandedControlledState(item.id)}
                    onExpanded={(event, isExpanded) => handleExpanded(item.id, isExpanded)}
                >
                    {item.children}
                </Accordion>
            ))}
        </>
    );
};
