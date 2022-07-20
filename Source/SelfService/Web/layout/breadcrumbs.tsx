// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { SeperatorArrow } from '../assets/icons';

import { Link } from '@mui/material';

export type BreadcrumbsRoute = {
    path: string;
    to: string;
    name: string;
};

type Props = {
    routes: BreadcrumbsRoute[];
};

const styles = {
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '20px',
    color: '#FAFAFA',
    textDecoration: 'none'
};

export const BreadCrumbContainer: React.FunctionComponent<Props> = (props) => {
    const history = useHistory();

    const crumbs = props!.routes.filter((r) => {
        const match = useRouteMatch(r.path);
        return match ? r : false;
    });

    const items = crumbs.map((_item, i) => {
        const links = [
            i > 0 && _getCustomDivider(i),
            <Link
                key={`bc-${i}`}
                href={_item.to}
                sx={styles}
                onClick={(event) => {
                    event.preventDefault();
                    history.push(_item.to);
                }}
            >
                {_item.name}
            </Link>,
        ];

        return links;
    });

    return <div>{items}</div>;
};

function _getCustomDivider(key: number): JSX.Element {
    return (
        <span key={key} aria-hidden='true' style={{ cursor: 'pointer', padding: 5 }}>
            <SeperatorArrow style={{ verticalAlign: 'middle' }} />
        </span>
    );
}
