// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { SvgIcons, SvgIconsDefinition } from '@dolittle/design-system';

/**
 * The props for a {@link Icon} component.
 */
type IconProps = {
    /**
     * Usual MUI icon writen as a `string`. Must be a valid `SvgIconsDefinition`.
     */
    icon: SvgIconsDefinition['icon'];

    /**
     * Most icons will use the default `inherit` color.
     * @default inherit
     */
    color?: 'inherit' | 'primary' | 'secondary' | 'action' | 'disabled' | 'error';

    /**
     * You can change icon size to be `medium`.
     * @default small
     */
    size?: 'small' | 'medium';
};

/**
 * The {@link Icon} component is used to display icons.
 * @param {IconProps} props - The {@link IconProps} that contains the properties for the icon component.
 * @returns A {@link Icon} component.
 */
export const Icon = ({ icon, color = 'inherit', size = 'small' }: IconProps) => {
    const clonedIcon = React.cloneElement(SvgIcons[icon], { 'fontSize': size, color, 'aria-hidden': true });

    return <>{clonedIcon}</>;
};
