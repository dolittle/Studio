// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { Typography } from '@mui/material';

import { componentStories, Accordion } from '@dolittle/design-system';

const { metadata, createStory } = componentStories(Accordion);

const DummyChildrenContent = () =>
    <Typography>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa illo similique consequuntur dolores natus ex
        sunt esse mollitia id atque. Atque molestiae cum magnam eligendi maxime id sapiente quaerat suscipit?
    </Typography>;

metadata.parameters = {
    docs: {
        description: {
            component: ``,
        },
    },
};

metadata.argTypes = {
    children: { control: false },
    expanded: { control: false },
};

metadata.args = {
    id: 'default',
    title: 'Default Accordion',
    defaultExpanded: false,
    children: <DummyChildrenContent />,
};

export default metadata;

export const Default = createStory();

export const DefaultExpanded = createStory();
DefaultExpanded.decorators = [
    () => (
        <Accordion id='expanded-1' title='Expanded By Default 1' defaultExpanded>
            <DummyChildrenContent />
        </Accordion>
    )
];

export const OneExpanded = createStory();
OneExpanded.decorators = [
    () => {
        const [isExpanded, setIsExpanded] = useState<string | false>(false);

        const handleExpanded = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setIsExpanded(isExpanded ? panel : false);
        };

        return (
            <>
                <Accordion
                    id='one-expanded-1'
                    title='Allow Only One Expanded 1'
                    expanded={isExpanded === 'one-expanded-1'}
                    onExpanded={handleExpanded('one-expanded-1')}
                >
                    <DummyChildrenContent />
                </Accordion>

                <Accordion
                    id='one-expanded-2'
                    title='Allow Only One Expanded 2'
                    expanded={isExpanded === 'one-expanded-2'}
                    onExpanded={handleExpanded('one-expanded-2')}
                >
                    <DummyChildrenContent />
                </Accordion>

                <Accordion
                    id='one-expanded-3'
                    title='Allow Only One Expanded 3'
                    expanded={isExpanded === 'one-expanded-3'}
                    onExpanded={handleExpanded('one-expanded-3')}
                >
                    <DummyChildrenContent />
                </Accordion>
            </>
        );
    }
];

export const WithStatusMessage = createStory();
