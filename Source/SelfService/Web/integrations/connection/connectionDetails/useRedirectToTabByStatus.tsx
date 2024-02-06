// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { useMemo } from 'react';

import { useLocation } from 'react-router-dom';

import { ConnectionStatus } from '../../../apis/integrations/generated';

import { childRoutePaths } from './getConnectionTabs';

const attentionToConfigurationRequiredStatuses = ['registered', 'pending', 'failing'];

/**
 * Hook that resolves the sub-tab to redirect to based on the status of the connection.
 * @param status status of a connection.
 * @returns short path name of the tab to redirect to. Does not include the full path.
 */
export function useRedirectToTabByStatus(status?: ConnectionStatus) {
    const location = useLocation();

    return useMemo(() => {
        if (!status?.name || childRoutePaths.some((path) => location.pathname.includes(path))) {
            return null;
        } else {
            return attentionToConfigurationRequiredStatuses.includes(status.name.toLowerCase())
                ? 'configuration'
                : 'messages';
        }
    }, [status?.name, location.pathname]);
};
