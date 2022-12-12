// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { ReactNode } from 'react';
import { Box } from '@mui/material';

export type SidebarFooterProps = {
    children?: ReactNode;
};

export const SidebarFooter = (props: SidebarFooterProps) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            {props.children}
        </Box>
    );
};
