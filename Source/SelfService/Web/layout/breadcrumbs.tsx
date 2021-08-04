// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useHistory } from 'react-router-dom';

import {
    Link,
} from '@fluentui/react';

import useBreadcrumbs, { BreadcrumbsRoute } from 'use-react-router-breadcrumbs';

type BreadcrumbItem = {
    text: string
    key: string
    onClick?: (ev?: React.MouseEvent<HTMLElement>, item?: BreadcrumbItem) => void;
};

type Props = {
    routes?: BreadcrumbsRoute[]
};
export const BreadCrumbContainer: React.FunctionComponent<Props> = (props?) => {

    const history = useHistory();
    const defaultRoutes = [
        // Insights
        {
            path: '/insights/application/:applicationId',
            breadcrumb: 'Insights'
        },
        {
            path: '/insights/application/:applicationId/:environment/overview',
            breadcrumb: 'Overview'
        },
        {
            path: '/insights/application/:applicationId/:environment/runtime-v1',
            breadcrumb: 'Runtime Stats'
        },

        // Microservices
        {
            path: '/microservices/application/:applicationId/:environment',
            breadcrumb: 'Microservices',
        },
        {
            path: '/microservices/application/:applicationId/:environment/overview',
            breadcrumb: 'Overview',
        },
        {
            path: '/microservices/application/:applicationId/:environment/create',
            breadcrumb: 'Create',
        },
        {
            path: '/microservices/application/:applicationId/:environment/edit',
            breadcrumb: 'Edit',
        },
        {
            path: '/microservices/application/:applicationId/:environment/view',
            breadcrumb: 'View',
        },

        // Backups
        {
            path: '/backups/application/:applicationId/overview',
            breadcrumb: 'Backup',
        },
        {
            path: '/backups/application/:applicationId/all/:environment',
            breadcrumb: 'All',
        }
    ];

    // eslint-disable-next-line react/prop-types
    const routes = props?.routes ? props!.routes : defaultRoutes;

    const _breadcrumbs = useBreadcrumbs(routes, { disableDefaults: true });

    const data: BreadcrumbItem[] = _breadcrumbs.map(({
        match,
        breadcrumb
    }) => {
        return {
            text: breadcrumb, key: match.url
        };
    }) as BreadcrumbItem[];
    console.log(data);

    const items = data.map((_item, i) => {
        const a = [
            i > 0 && _getCustomDivider(i),
            <Link key={`bc-${i}`} onClick={(ev?: React.MouseEvent<HTMLElement>) => {
                history.push(_item.key);
            }}>
                {_item.text}
            </Link >
        ];
        return a;
    }
    );
    return (
        <>
            {items}
        </>
    );

};

function _getCustomDivider(key: number): JSX.Element {
    const _key = `bcd-${key}`;
    return (
        <span key={key} aria-hidden="true" style={{ cursor: 'pointer', padding: 5 }}>
            /
        </span>
    );
}

