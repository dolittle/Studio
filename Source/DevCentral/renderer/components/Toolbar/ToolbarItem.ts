// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

export type ToolbarItemClicked = (item: ToolbarItem) => void;

export interface ToolbarItem {
    name: string;
    icon: string;
    onClick: ToolbarItemClicked;
}
