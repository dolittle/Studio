// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, ComponentType } from 'react';
import { useGlobalContext } from '../solutions/stores/notifications';
import { RouteApplicationParams, useRouteApplicationParams } from '../utils/route';

export type WithRouteApplicationProps = {
    routeApplicationParams: RouteApplicationParams
};

export function withRouteApplicationState<ComponentProps>(wrapped: ComponentType<ComponentProps & WithRouteApplicationProps>) {
    return React.memo(function RouteApplicationState(props: ComponentProps) {
        const routeApplicationParams = useRouteApplicationParams();
        const {
            currentApplicationId,
            currentEnvironment,
            setCurrentEnvironment,
            setCurrentApplicationId,
        } = useGlobalContext();

        useEffect(() => {
            if (routeApplicationParams.applicationId && currentApplicationId !== routeApplicationParams.applicationId) {
                setCurrentApplicationId(routeApplicationParams.applicationId);
            }

            if (routeApplicationParams.environment && currentEnvironment !== routeApplicationParams.environment) {
                setCurrentEnvironment(routeApplicationParams.environment);
            }
        }, []);

        const WrappedComponent = wrapped;
        return <WrappedComponent {...props} routeApplicationParams={routeApplicationParams} />;
    });
}
