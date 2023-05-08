// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useState } from 'react';

import { componentStories, Accordion, StatusIndicatorProps } from '@dolittle/design-system';

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
            options: ['success', 'waiting', 'warning', 'error', 'unknown'],
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
        const [status, setStatus] = useState<StatusIndicatorProps['status']>('waiting');

        // eslint-disable-next-line no-restricted-globals
        setTimeout(() => {
            if (status !== 'waiting') {
                setStatus('waiting');
            } else {
                const random = Math.random();

                if (random < 0.2) setStatus('success');
                else if (random < 0.4) setStatus('table-success');
                else if (random < 0.6) setStatus('warning');
                else if (random < 0.8) setStatus('error');
                else setStatus('unknown');
            }
        }, 4000);

        return (
            <Accordion
                id='with-status-message'
                title='With Status Message'
                progressStatus={status}
                progressLabel={status === 'waiting' ? 'Waiting for something to happen...' : status}
            >
                <DummyChildrenContent />
            </Accordion>
        );
    }
];
