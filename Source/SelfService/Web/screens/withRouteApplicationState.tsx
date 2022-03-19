// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useEffect, ComponentType } from 'react';
import { useGlobalContext } from '../stores/notifications';
import { RouteApplicationProps, useRouteApplicationProps } from '../utils/route';

export type PropsWithRouteApplicationProps = {
    routeApplicationProps: RouteApplicationProps
};

export function withRouteApplicationState<T extends PropsWithRouteApplicationProps>(
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Component: ComponentType<T>
) {
    return React.memo(function RouteApplicationState() {
        const routeApplicationProps = useRouteApplicationProps();
        const {
            currentApplicationId,
            currentEnvironment,
            setCurrentEnvironment,
            setCurrentApplicationId,
        } = useGlobalContext();

        useEffect(() => {
            if (currentApplicationId !== routeApplicationProps.applicationId) {
                setCurrentApplicationId(routeApplicationProps.applicationId);
            }

            if (currentEnvironment !== routeApplicationProps.environment) {
                setCurrentEnvironment(routeApplicationProps.environment);
            }
        }, []);

        return <Component {...({routeApplicationProps} as T)} />;
    });
}
