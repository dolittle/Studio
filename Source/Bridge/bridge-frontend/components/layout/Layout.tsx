// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { Box } from '@mui/material';
import Head from 'next/head';
import { M3EnvironmentListDto } from '../../api/generated';
import { Sidebar } from './Sidebar/Sidebar';

export type OnEnvironmentSelected = (environment: M3EnvironmentListDto) => void;

export type HeadProps = {
    title?: string;
    description?: string;
};

export type LayoutProps = {
    head?: HeadProps;
    withSidebar?: boolean;
    sidebarSlot?: React.ReactNode;
    children?: React.ReactNode;
};

export const Layout = ({
    head,
    withSidebar = true,
    sidebarSlot, children,
}: LayoutProps) => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Head>
                <title>{head?.title ?? 'Dolittle Bridge'}</title>
                <meta name="description" content={head?.description ?? 'Dolittle Bridge'} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {withSidebar && <Sidebar>{ sidebarSlot}</Sidebar>}
            <Box component='section' sx={{ flexGrow: 1, mx: 3 }}>
                {children}
            </Box>
        </Box>
    );
};
