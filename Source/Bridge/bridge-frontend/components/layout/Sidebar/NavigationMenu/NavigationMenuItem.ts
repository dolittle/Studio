// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

export type NavigationMenuItem = {
    href: string;
    name: string;
    icon?: React.ReactNode;
    disabled?: boolean
    /**
     * Callback to handle click action on the {@link NavigationMenuItem}
     * Adding an onClickHandler will disable the default href behaviour
     */
    onClick?: (item: NavigationMenuItem) => void;
};
