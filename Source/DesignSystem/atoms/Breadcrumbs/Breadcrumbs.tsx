// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { Breadcrumbs as MuiBreadcrumbs, Typography } from '@mui/material';

import { Icon, Link, LinkProps } from '../../index';

import { Link as RouterLink } from '../../helpers/ReactRouter';

/**
 * The props for a {@link Breadcrumbs} component.
 */
export type BreadcrumbsProps = {
    /**
     * The pathname of the current location with leading slashes.
     */
    currentPath: string;

    /**
     * A map of the breadcrumb names and their corresponding paths.
     */
    breadcrumbsNameMap: { [key: string]: string };
};

/**
 * A component that displays the current location in the application.
 * @param {BreadcrumbsProps} props - The {@link BreadcrumbsProps}.
 * @returns A {@link Breadcrumbs} component.
 */
export const Breadcrumbs = ({ currentPath, breadcrumbsNameMap }: BreadcrumbsProps) => {
    const pathnames = currentPath?.split('/').filter(path => path);

    return (
        <MuiBreadcrumbs
            separator={<Icon icon='ChevronRight' sx={{ color: 'action.active' }} />}
            aria-label='breadcrumbs'
            sx={{ a: { textDecoration: 'none' } }}
        >
            {pathnames?.map((_, index) => {
                const currentLocation = index === pathnames.length - 1;
                const newLocation = `/${pathnames.slice(0, index + 1).join('/')}`;

                return (
                    currentLocation ? (
                        <Typography key={index} color='text.primary'>
                            {breadcrumbsNameMap[newLocation]}
                        </Typography>
                    ) : (
                        <BreadcrumbsLink key={index} label={breadcrumbsNameMap[newLocation]} navigateTo={newLocation} />
                    )
                );
            })}
        </MuiBreadcrumbs>
    );
};

// TODO: This uses `RouterLink` and we don't want it in the Design System.
type BreadcrumbsLinkProps = {
    label: string;
    navigateTo: string;
    overrides?: LinkProps['overrides'];
};

const BreadcrumbsLink = ({ label, navigateTo, overrides }: BreadcrumbsLinkProps) =>
    <Link label={label} href={navigateTo} color='subtle' overrides={{ component: RouterLink, to: navigateTo }} />;
