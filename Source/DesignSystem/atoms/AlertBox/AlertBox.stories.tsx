// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { componentStories } from '@dolittle/design-system';

import { AlertBox } from './AlertBox';

const { metadata, createStory } = componentStories(AlertBox);

export default metadata;

export const Error = createStory({
    title: 'Something went wrong',
    severity: 'error',
    message: 'Please try again later. If problem persists, please',
    link: {
        href: 'mailto: support@dolittle.com',
        text: 'contact support'
    }
});

export const Warning = createStory({
    title: 'This is a warning.',
    severity: 'warning',
    message: 'Please try again later. If problem persists, please',
    link: {
        href: 'mailto: support@dolittle.com',
        text: 'contact support'
    }
});

export const Info = createStory({
    title: 'This is an info message.',
    severity: 'info',
    message: 'For more information, please',
    link: {
        href: 'https://www.dolittle.com/',
        text: 'look our website'
    }
});

export const Success = createStory({
    title: 'All good!',
    severity: 'success',
    message: 'You are all set up and ready to go!',
});
