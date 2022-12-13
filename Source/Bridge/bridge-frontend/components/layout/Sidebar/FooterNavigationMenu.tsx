// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { NavigationList } from './NavigationMenu/NavigationList';
import { NavigationMenuItem } from './NavigationMenu/NavigationMenuItem';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import LogoutRounded from '@mui/icons-material/LogoutRounded';

export const FooterNavigationMenu = () => {
    const navigationItems: NavigationMenuItem[] = [
        {
            href: '',
            name: 'Logout',
            icon: <LogoutRounded />,
            disabled: true,
        },
        {
            href: '',
            name: 'Collapse',
            icon: <KeyboardDoubleArrowLeftIcon />,
            disabled: true,
        }
    ];

    return (
        <NavigationList navigationItems={navigationItems} />
    );
};
