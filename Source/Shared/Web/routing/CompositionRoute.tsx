// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { MicroserviceContext } from '../MicroserviceContext';
import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { ContentFrame } from '@shared/web/routing/ContentFrame';

export interface CompositionRouteProps extends RouteProps {
    load: Function;
    loaded: Function;
}

export const CompositionRoute = (props: CompositionRouteProps) => {
    return (
        <MicroserviceContext.Consumer>
            {value => {
                let src = `/_/${props.path}`;
                src = src.replace('//', '/');
                return (
                    <Route {...props}>
                        <ContentFrame src={src} load={props.load} loaded={props.loaded}/>
                    </Route>
                );
            }}
        </MicroserviceContext.Consumer>
    );
};