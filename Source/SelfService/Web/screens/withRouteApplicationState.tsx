// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, ComponentType } from 'react';
import { useGlobalContext } from '../stores/notifications';
import { RouteApplicationParams, useRouteApplicationParams } from '../utils/route';

export type PropsWithRouteApplicationProps = {
    routeApplicationParams: RouteApplicationParams
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export function withRouteApplicationState(Component: ComponentType) {
    return React.memo(function RouteApplicationState() {
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

        return <Component />;
    });
}
