// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import './breadcrumbs.scss';



type BreadcrumbsRoute = {
    path: string
    to: string
    name: string
};

type Props = {
    routes: BreadcrumbsRoute[]
};

export const BreadCrumbContainer: React.FunctionComponent<Props> = (props) => {
    const history = useHistory();

    const crumbs = props!.routes.filter(r => {
        const match = useRouteMatch(r.path);
        return match ? r : false;
    });


    const items = crumbs.map((_item, i) => {
        const a = [
            i > 0 && _getCustomDivider(i),
            <a
                key={`bc-${i}`}
                href={_item.to}
                onClick={(event) => {
                    event.preventDefault();
                    history.push(_item.to);
                }}>
                {_item.name}
            </a>
        ];
        return a;
    }
    );
    return (
        <>
            <div className="breadcrumbs">
                {items}
            </div>
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
