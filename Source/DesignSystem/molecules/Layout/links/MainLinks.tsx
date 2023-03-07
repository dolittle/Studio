// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { RouterLinkListItem } from '@dolittle/design-system';

export const MainLinks = () =>
    <>
        <RouterLinkListItem to='' text='home' variantButton />
        <RouterLinkListItem to='' text='solutions' variantButton />
        <RouterLinkListItem to='' text='integrations' selected variantButton />
    </>;
