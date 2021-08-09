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

    const routes = props!.routes;

    const _breadcrumbs = useBreadcrumbs(routes, { disableDefaults: true });

    const data: BreadcrumbItem[] = _breadcrumbs.map(({
        match,
        breadcrumb
    }) => {
        return {
            text: breadcrumb, key: match.url
        };
    }) as BreadcrumbItem[];

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

