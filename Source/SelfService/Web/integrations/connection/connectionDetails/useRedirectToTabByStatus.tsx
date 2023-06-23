// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { useMemo } from 'react';
import {type Location, useLocation } from 'react-router-dom';
import { childRoutePaths} from '.';
import { ConnectionStatus } from '../../../apis/integrations/generated';

export const pendingStatuses = ['registered', 'pending', 'failing'];

/**
 * Hook that resolves the sub-tab to redirect to based on the status of the connection
 * @param status status of a connection
 * @returns short path name of the tab to redirect to. Does not include the full path
 */
export function useRedirectToTabByStatus(status?: ConnectionStatus) {
    const location = useLocation();
    return useMemo(() => {
        if (!status?.name || childRoutePaths.some((path) => location.pathname.endsWith(path))) {
            return null;
        } else {
            return pendingStatuses.includes(status.name.toLowerCase())
                ? 'configuration'
                : 'messages';
        }
    }, [status?.name, location.pathname]);
}
