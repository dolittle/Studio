// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { themeDark } from '../theme/theme';
import { Link, Breadcrumbs, Stack } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const styles = {
    fontWeight: 400,
    fontSize: '1rem',
    lineHeight: '1.25rem',
    color: themeDark.palette.text.primary,
    textDecoration: 'none'
};

export type BreadcrumbsRoute = {
    path: string
    to: string
    name: string
};

type Props = {
    routes: BreadcrumbsRoute[]
};

export const BreadCrumbContainer = (props: Props) => {
    const history = useHistory();

    const crumbs = props!.routes.filter((route) => useRouteMatch(route.path) ? route : false);

    const breadcrumbs = crumbs.map((item, index) => {
        const links = [
            <Link
                key={index}
                href={item.to}
                sx={styles}
                onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
                    event.preventDefault();
                    history.push(item.to);
                }}>
                {item.name}
            </Link >
        ];

        return links;
    });

    return (
        <Stack spacing={2}>
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
            >
                {breadcrumbs}
            </Breadcrumbs>
        </Stack>
    );
};
