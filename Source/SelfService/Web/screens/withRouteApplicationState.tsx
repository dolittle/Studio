// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useContext, useMemo, ComponentType } from 'react';
import { GlobalContext } from '../stores/notifications';
import { RouteApplicationProps, useRouteApplicationProps } from '../utils/route';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function withRouteApplicationState<T extends RouteApplicationProps>(Component: ComponentType<T>) {

    return React.memo(function RouteApplicationState() {
        const routeApplicationProps = useRouteApplicationProps();
        const context = useContext(GlobalContext);

        useMemo(() => {
            console.log('setting context from url', routeApplicationProps.applicationId, routeApplicationProps.environment);
            context.setCurrentApplicationId(routeApplicationProps.applicationId);
            context.setCurrentEnvironment(routeApplicationProps.environment);
        }, [routeApplicationProps.applicationId, routeApplicationProps.environment]);
        return <Component {...routeApplicationProps as T}/>;
    });
};
