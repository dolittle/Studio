// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { NavigationList } from './NavigationMenu/NavigationList';
import { NavigationMenuItem } from './NavigationMenu/NavigationMenuItem';
import ExploreIcon from '@mui/icons-material/Explore';
import PetsIcon from '@mui/icons-material/Pets';

export const MainNavigationMenu = () => {
    const navigationItems: NavigationMenuItem[] = [
        {
            href: '/explorer',
            name: 'Explorer',
            icon: <ExploreIcon />,
        },
        {
            href: '/cats',
            name: 'Cats',
            icon: <PetsIcon />,
        }
    ];

    return (
        <NavigationList navigationItems={navigationItems} highlightActive />
    );
};
