// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { List } from '@mui/material';
import { NavigationListItem } from './NavigationListItem';
import { NavigationMenuItem } from './NavigationMenuItem';

export type NavigationListProps = {
    navigationItems?: NavigationMenuItem[]
};

export const NavigationList = ({ navigationItems }: NavigationListProps) => {
    return (
        <List
            sx={{
                padding: '0',
                margin: '0'
            }}>
            {navigationItems?.map((item, i) =>
                <NavigationListItem
                    key={item.name + i.toString()}
                    navigationMenuItem={item}
                />)
            }
        </List>
    );
};


