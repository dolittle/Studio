// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ReactNode } from 'react';
import { Box } from '@mui/material';

export type SidebarHeaderProps = {
    children?: ReactNode;
};

export const SidebarHeader = (props: SidebarHeaderProps) => {
    return (
        <Box>
            {props.children}
        </Box>
    );
};
