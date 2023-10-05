// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, ComponentType } from 'react';

import { useGlobalContext } from '../context/globalContext';

import { RouteApplicationParams, useRouteApplicationParams } from './route';

export type WithRouteApplicationProps = {
    routeApplicationParams: RouteApplicationParams;
};

export function withRouteApplicationState<ComponentProps>(wrapped: ComponentType<ComponentProps & WithRouteApplicationProps>) {
    return React.memo(function RouteApplicationState(props: ComponentProps) {
        const routeApplicationParams = useRouteApplicationParams();
        const { currentApplicationId, setCurrentApplicationId } = useGlobalContext();

        useEffect(() => {
            if (routeApplicationParams.applicationId && currentApplicationId !== routeApplicationParams.applicationId) {
                setCurrentApplicationId(routeApplicationParams.applicationId);
            }
        }, []);

        const WrappedComponent = wrapped;
        return <WrappedComponent {...props} routeApplicationParams={routeApplicationParams} />;
    });
};
