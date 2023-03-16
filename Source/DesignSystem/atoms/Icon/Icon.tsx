// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { SvgIcons, SvgIconsDefinition } from '@dolittle/design-system';

type IconProps = {
    icon: SvgIconsDefinition['icon'];
    color?: 'inherit' | 'primary' | 'secondary' | 'action' | 'disabled' | 'error';
    size?: 'small' | 'medium';
};

export const Icon = ({ icon, color = 'inherit', size = 'small' }: IconProps) => {
    const clonedIcon = React.cloneElement(SvgIcons[icon], { fontSize: size, color });

    return <>{clonedIcon}</>;
};
