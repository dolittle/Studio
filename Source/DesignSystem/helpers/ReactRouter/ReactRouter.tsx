// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Link as RouterLink, LinkProps as RouterLinkProps, MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';

import { Typography } from '@mui/material';

type RouterProps = {
    initialPath?: string;
    children?: React.ReactNode;
};

export const Router = ({ initialPath, children }: RouterProps) => {
    const path = initialPath ?? '/primary-1';

    if (typeof window === 'undefined') {
        return <StaticRouter location={path}>{children}</StaticRouter>;
    }

    return <MemoryRouter initialEntries={[path]} initialIndex={0} > {children}</MemoryRouter>;
};

export const CurrentPath = () =>
    <Routes>
        <Route path='*' element={<Content />} />
    </Routes>;

export const Content = () => {
    const location = useLocation();

    return (
        <Typography variant='body2' sx={{ py: 2 }} color='text.secondary'>
            Current route: {location.pathname}
        </Typography>
    );
};

// TUTORIAL: https://mui.com/material-ui/guides/composition/
export const Link = React.forwardRef<HTMLAnchorElement, RouterLinkProps>(function Link(itemProps, ref) {
    return <RouterLink ref={ref} {...itemProps} role={undefined} />;
});
