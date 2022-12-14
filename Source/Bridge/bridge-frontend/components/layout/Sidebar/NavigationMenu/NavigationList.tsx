// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { List } from '@mui/material';
import { useRouter } from 'next/router';
import { NavigationListItem } from './NavigationListItem';
import { NavigationMenuItem } from './NavigationMenuItem';

export type NavigationListProps = {
    navigationItems?: NavigationMenuItem[]
    highlightActive?: boolean;
};

export const NavigationList = ({ navigationItems, highlightActive }: NavigationListProps) => {

    const router = useRouter();

    const isActiveRoute = (path: string) => {
        return router.pathname.startsWith(path);
    };

    return (
        <List
            component='nav'
            sx={{
                padding: '0',
                margin: '0'
            }}>
            {navigationItems?.map((item, i) =>
                <NavigationListItem
                    key={item.name + i.toString()}
                    navigationMenuItem={item}
                    selected={highlightActive ? isActiveRoute(item.href) : false}
                />)
            }
        </List>
    );
};


