// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, useState } from 'react';

import { Accordion, AccordionProps } from '@dolittle/design-system';

/**
 * The props for a {@link AccordionList} component.
 */
export type AccordionListProps = {
    /**
     * List of accordion items to display.
     */
    items: Omit<AccordionProps, 'onExpanded'>[];

    /**
     * Id of the initial accordion item to be expanded. Optional.
     *
     * If left empty, all accordion items start collapsed.
     */
    initialId?: string;

    /**
     * Flag indicating if only one accordion item should be expanded at at time.
     *
     * If left empty, all accordion items start collapsed and can be expanded independently.
     * @default false
     */
    singleExpandMode?: boolean;
};

/**
 * The AccordionList component is used to display a list of {@link Accordion} components.
 * It supports enabling "single expanded mode", allowing only a single accordion item to be open at any time.
 * @param {AccordionListProps} props - The {@link AccordionListProps}.
 * @returns A {@link AccordionList} component.
 */
export const AccordionList = ({ singleExpandMode, items, initialId }: AccordionListProps) => {
    const [expanded, setExpanded] = useState<Set<string>>(new Set(initialId ? [initialId] : []));
    const [_items, _setItems] = useState<AccordionProps[]>(items);

    const handleExpanded = (accordionId: string, isExpanded: boolean) => {
        console.log('handleExpanded', accordionId, isExpanded);
        setExpanded(current => {
            const expandedList = singleExpandMode ? new Set<string>() : new Set<string>(current);
            if (isExpanded) {
                expandedList.add(accordionId);
            } else {
                expandedList.delete(accordionId);
            }
            console.log('expandedList', expandedList);
            return expandedList;
        });
    };

    const isExpandedControlledState = (panel: string) => expanded.has(panel);
    const isExpandedStateOverridden = (item: AccordionProps) => item.expanded !== undefined;

    useEffect(() => {
        // const shouldBeExpanded = singleExpandMode ? expanded === item.id : item.expanded;
        // if (shouldBeExpanded) {
        //     setExpanded(item.id);
        // }
        if (items === _items) {
            return;
        }
        _setItems(items);

        const itemsToChangeExpandState = items.filter(item => item.expanded !== undefined);
        itemsToChangeExpandState
            .forEach(item => item.expanded !== isExpandedControlledState(item.id) && handleExpanded(item.id, item.expanded!));
    }, [items]);

    return (
        <>
            {items.map(item => <Accordion
                key={item.id}
                // id={item.id}
                // title={item.title}
                {...item}
                expanded={isExpandedControlledState(item.id)}
                onExpanded={(event, isExpanded) => handleExpanded(item.id, isExpanded)}
            >
                {item.children}
            </Accordion>
            )}
        </>
    );
};

