// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { componentStories } from '@dolittle/design-system';

import { AlertBox } from './AlertBox';

const { metadata, createStory } = componentStories(AlertBox);

export default metadata;

export const Error = createStory({
    severity: 'error',
    title: 'Something went wrong',
    message: 'Please try again later. If problem persists, please',
    endWithLink: {
        linkHref: 'mailto: support@dolittle.com',
        linkText: 'contact support'
    }
});

export const Warning = createStory({
    severity: 'warning',
    title: 'This is a warning.',
    message: 'Please try again later. If problem persists, please',
    endWithLink: {
        linkHref: 'mailto: support@dolittle.com',
        linkText: 'contact support'
    }
});

export const Info = createStory({
    severity: 'info',
    title: 'This is an info message.',
    message: 'For more information, please',
    endWithLink: {
        linkHref: 'https://www.dolittle.com/',
        linkText: 'look our website'
    }
});

export const Success = createStory({
    severity: 'success',
    title: 'All good!',
    message: 'You are all set up and ready to go!',
});

export const WithAction = createStory({
    severity: 'info',
    title: 'This is an info message.',
    message: 'For more information, please',
    endWithLink: {
        linkHref: 'https://www.dolittle.com/',
        linkText: 'look our website'
    },
    action: 'Close',
    closeAction: () => alert('Close action was clicked.')
});
