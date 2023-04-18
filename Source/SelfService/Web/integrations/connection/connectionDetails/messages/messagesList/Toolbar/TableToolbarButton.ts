// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.


export type TableToolbarButton = {
    selectedIds: string[];
    isButtonActionExecuting?: boolean
    onSuccess: () => void;
    onActionExecuting: () => void;
};
