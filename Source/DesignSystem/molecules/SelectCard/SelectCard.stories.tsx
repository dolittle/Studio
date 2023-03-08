// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { componentStories, SelectCard } from '@dolittle/design-system';

const { metadata, createStory } = componentStories(SelectCard);

metadata.title = 'Select Card';

metadata.args = {
    icon: 'DnsRounded',
    title: 'On Premise',
    description: 'Your team will be responsible for hosting, establishing backups and making sure the connector is running.',
    listTitle: `What you'll need`,
    listItems: [
        'Docker',
        'Firewall access',
        'Ion M3 (and optionally the meta data publisher)',
        'Admin level access to M3',
        'Approximately 16gb ram'
    ],
    footerTitle: 'Approximate setup time',
    footerText: '10 min',
};

export default metadata;

export const Default = createStory();
