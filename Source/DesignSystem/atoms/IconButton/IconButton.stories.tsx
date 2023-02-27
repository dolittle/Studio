// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { DownloadRounded } from '@mui/icons-material';

import { componentStories, IconButton } from '@dolittle/design-system';

const { metadata, createStory } = componentStories(IconButton);

metadata.argTypes = {
    ariaLabel: {
        type: 'string',
        control: {
            type: 'text'
        },
    },
    icon: {
        control: false,
        table: {
            type: {
                summary: 'ReactElement<SvgIconProps>',
            },
        },
    },
    color: {
        defaultValue: 'inherit',
    },
    size: {
        defaultValue: 'small',
    },
    href: {
        control: false,
    },
    download: {
        control: false,
    },
    onClick: {
        control: false,
    },
};

export default metadata;

export const Inherit = createStory({
    ariaLabel: 'Download',
    icon: <DownloadRounded />,
});

// TODO: Haven't figured out how to display react SVG elements in the docs tab yet, so this is a workaround.
Inherit.parameters = {
    docs: {
        source: {
            code: `<IconButton ariaLabel='Download' icon={<DownloadRounded />} />`
        },
    },
};

export const Secondary = createStory({
    ariaLabel: 'Secondary Icon Button',
    color: 'primary',
});

export const Disabled = createStory({
    ariaLabel: 'Disabled Icon Button',
    disabled: true,
});
