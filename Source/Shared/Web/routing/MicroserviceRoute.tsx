// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { MicroserviceContext } from '../MicroserviceContext';
import React from 'react';
import { Route, RouteProps } from 'react-router-dom';

export const MicroserviceRoute = (props: RouteProps) => {
    return (
        <MicroserviceContext.Consumer>
            {value => {
                const innerProps = {...props};

                innerProps.path = `${value.prefix}/${props.path || ''}`;
                innerProps.path = innerProps.path.replace('//','/');

                return <Route {...innerProps} />;
            }}
        </MicroserviceContext.Consumer>
    );
};