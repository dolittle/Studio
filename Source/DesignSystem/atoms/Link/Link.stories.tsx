// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { componentStories, Link } from '../../index';

const { metadata, createStory } = componentStories(Link);

export default metadata;

metadata.parameters = {
    docs: {
        description: {
            component: `Links are used to navigate the user to another part of the application or to an external resource. 
            There are three variants of links: external, secondary and subtle.`
        },
    },
};

metadata.args = {
    href: '#',
    target: false,
    ariaLabel: 'Write a meaningful aria label here',
    color: 'primary',
    message: 'Default internal link',
};

export const Default = createStory();

export const ExternalLink = createStory({
    href: 'https://dolittle.io',
    target: true,
    ariaLabel: 'To learn more, visit our website which opens in a new window.',
    message: 'Go to Dolittle website',
});
ExternalLink.parameters = {
    docs: {
        description: {
            story: `External links are commonly used to reference external documentation or link to a support email. 
            Primary links should be displayed in the primary color with an underline.
            External links should always open in a new tab.`
        },
    },
};

export const SecondaryLink = createStory({
    href: '#',
    color: 'secondary',
    message: 'Informative link',
});
SecondaryLink.parameters = {
    docs: {
        description: {
            story: `Secondary links link to additional information within the interface. They often provide 
            supporting details or data a user can view. A common example is showing more rows of data within a card or data.
            Secondary links should be displayed in the secondary color with an underline.`
        },
    },
};

export const SubtleLink = createStory({
    href: '#',
    color: 'subtle',
    message: 'Not so important link',
});
SubtleLink.parameters = {
    docs: {
        description: {
            story: `Subtle links can link to internal or external pages. They are used when we do not want to steal focus 
            in the interface, especially when there is a lot of context for the user to read.
            Subtle links should be displayed in the inherit color with an underline.`
        },
    },
};
