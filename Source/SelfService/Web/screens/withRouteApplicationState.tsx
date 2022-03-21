// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, ComponentType } from 'react';
import { useGlobalContext } from '../stores/notifications';
import { RouteApplicationParams, useRouteApplicationParams } from '../utils/route';

export type PropsWithRouteApplicationProps = {
    routeApplicationParams: RouteApplicationParams
};

export function withRouteApplicationState<T extends PropsWithRouteApplicationProps>(
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Component: ComponentType<T>
) {
    return React.memo(function RouteApplicationState() {
        const routeApplicationParams = useRouteApplicationParams();
        const {
            currentApplicationId,
            currentEnvironment,
            setCurrentEnvironment,
            setCurrentApplicationId,
        } = useGlobalContext();

        useEffect(() => {
            if (currentApplicationId !== routeApplicationParams.applicationId) {
                setCurrentApplicationId(routeApplicationParams.applicationId);
            }

            if (currentEnvironment !== routeApplicationParams.environment) {
                setCurrentEnvironment(routeApplicationParams.environment);
            }
        }, []);

        return <Component {...{routeApplicationParams} as T} />;
    });
}
