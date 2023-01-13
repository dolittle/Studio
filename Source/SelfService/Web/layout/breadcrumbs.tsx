// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useNavigate, useRouteMatch } from 'react-router-dom';

import { Link, Breadcrumbs, Stack } from '@mui/material';
import { ChevronRight } from '@mui/icons-material';

const styles = {
    fontWeight: 400,
    fontSize: 16,
    lineHeight: '1.25rem',
    color: 'text.primary',
    textDecoration: 'none'
};

export type BreadcrumbsRoute = {
    path: string;
    to: string;
    name: string;
};

type Props = {
    routes: BreadcrumbsRoute[]
};

export const BreadCrumbContainer = (props: Props) => {
    const navigate = useNavigate();

    const crumbs = props!.routes.filter((route) => useRouteMatch(route.path) ? route : false);

    const breadcrumbs = crumbs.map((item, index) => {
        const links = [
            <Link
                key={index}
                href={item.to}
                sx={styles}
                onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
                    event.preventDefault();
                    navigate(item.to);
                }}>
                {item.name}
            </Link >
        ];

        return links;
    });

    return (
        <Stack spacing={2}>
            <Breadcrumbs
                separator={<ChevronRight fontSize="small" sx={{ color: 'rgba(255, 255, 255, 0.38);', }} />}
                aria-label="breadcrumb"
            >
                {breadcrumbs}
            </Breadcrumbs>
        </Stack>
    );
};
