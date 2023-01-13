// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { useNavigate } from 'react-router-dom';

export type BreadcrumbWithRedirectProps = {
    url: string;
    name: string;
};

export const BreadcrumbWithRedirect: React.FunctionComponent<BreadcrumbWithRedirectProps> = (props) => {
    const navigate = useNavigate();
    return (
        <span onClick={(event: React.MouseEvent<HTMLElement>) => {
            event.stopPropagation();
            console.log('Redirect', props!.url);
            navigate(props!.url);
        }}> {props!.name}</span >
    );
};
