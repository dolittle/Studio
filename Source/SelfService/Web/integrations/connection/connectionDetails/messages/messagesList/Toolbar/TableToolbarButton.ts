// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { MessageMappingModel } from '../../../../../../apis/integrations/generated';


export type TableToolbarButton = {
    connectionId: string;
    selectedMessageTypes: MessageMappingModel[];
    disable?: boolean
    onSuccess: () => void;
    onActionExecuting: () => void;
};
