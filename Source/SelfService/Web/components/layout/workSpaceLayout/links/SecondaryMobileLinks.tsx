// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Icon, RouterLinkListItem } from '@dolittle/design-system';

export const SecondaryMobileLinks = () =>
    <>
        <RouterLinkListItem to='' text='Documentation' icon={<Icon icon='DescriptionRounded' />} />
        <RouterLinkListItem to='' text='Change Organization' icon={<Icon icon='SupervisedUserCircleRounded' />} />
        <RouterLinkListItem to='' text='Log out' icon={<Icon icon='LogoutRounded' />} />
    </>;
