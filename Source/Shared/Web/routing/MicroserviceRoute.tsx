// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { MicroserviceContext } from '../MicroserviceContext';
import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { MicroserviceConfiguration } from '@shared/web/MicroserviceConfiguration';


export const MicroserviceRoute = (props: RouteProps) => {
    console.log(`Microservice Route : ${props.path}`);

    return (
        <MicroserviceContext.Consumer>
            {value => {
                const innerProps = { ...props };

                let path = `${props.path} || ''`;
                if (path.startsWith('/')) {
                    path = path.substr(1);
                }

                innerProps.path = `${value.prefix}/${path}`;
                innerProps.path = innerProps.path.replace('//', '/');

                return <Route {...innerProps} />;
            }}
        </MicroserviceContext.Consumer>
    );
};
