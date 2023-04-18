// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { componentStories, Accordion } from '@dolittle/design-system';

import { DummyChildrenContent } from '@dolittle/design-system/helpers/dummyContent';

const { metadata, createStory } = componentStories(Accordion);

metadata.parameters = {
    docs: {
        description: {
            component: ``,
        },
    },
};

metadata.argTypes = {
    progressStatus: {
        control: {
            type: 'select',
            options: ['connected', 'waiting', 'pending', 'failed', 'unknown'],
        },
    },
    children: { control: false },
    expanded: { control: false },
    sx: { control: false },
};

metadata.args = {
    id: 'default',
    title: 'Default Accordion',
    defaultExpanded: false,
    children: <DummyChildrenContent />,
};

export default metadata;

export const Default = createStory();

export const DefaultExpanded = createStory({
    id: 'expanded-1',
    title: 'Expanded By Default 1',
    defaultExpanded: true,
    children: <DummyChildrenContent />,
});

export const WithStatusMessage = createStory();
WithStatusMessage.decorators = [
    () => {
        const [status, setStatus] = useState('waiting');

        // eslint-disable-next-line no-restricted-globals
        setInterval(() => {
            if (status !== 'waiting') setStatus('waiting');
            else {
                const random = Math.random();

                if (random < 0.2) setStatus('failed');
                else if (random < 0.4) setStatus('pending');
                else if (random < 0.8) setStatus('connected');
                else setStatus('unknown');
            }
        }, 4000);

        return (
            <Accordion
                id='with-status-message'
                title='With Status Message'
                progressStatus={status}
                progressMessage={status === 'waiting' ? 'Waiting for something to happen...' : undefined}
            >
                <DummyChildrenContent />
            </Accordion>
        );
    }
];
