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
                innerProps.path = `${value.prefix}/${props.path || ''}`;
                innerProps.path = innerProps.path.replace('//', '/');

                console.log(`Route path : ${innerProps.path}`);

                return <Route {...innerProps} />;
            }}
        </MicroserviceContext.Consumer>
    );
};
