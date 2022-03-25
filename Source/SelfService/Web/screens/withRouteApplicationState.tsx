// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, ComponentType } from 'react';
import { useGlobalContext } from '../stores/notifications';
import { RouteApplicationParams, useRouteApplicationParams } from '../utils/route';

export type WithRouteApplicationProps = {
    routeApplicationParams: RouteApplicationParams
};

export function withRouteApplicationState<ComponentProps>(
    // eslint-disable-next-line @typescript-eslint/naming-convention
    WrappedComponent: ComponentType<ComponentProps & WithRouteApplicationProps>
) {
    // // eslint-disable-next-line @typescript-eslint/naming-convention
    // export function withRouteApplicationState(Component: ComponentType) {
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

        return <WrappedComponent {...props as ComponentProps} routeApplicationParams={routeApplicationParams} />;
    });
}
