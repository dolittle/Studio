// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ReactNode } from 'react';
import { Box } from '@mui/material';

export type SidebarContentProps = {
    children?: ReactNode;
};

export const SidebarContent = (props: SidebarContentProps) => {
    return (
        <Box
            sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
                paddingTop: 1
            }}
        >
            {props.children}
        </Box>
    );
};
