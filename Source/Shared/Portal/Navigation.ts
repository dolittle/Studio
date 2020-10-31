// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { NavigationGroup } from './NavigationGroup';

export class Navigation {
    static SetStructureEvent = 'SetStructure';

    /**
     * Sets the navigation structure for the portal. Typically used by a microservice main view when initialized.
     * @param {NavigationGroup[]} groups Groups to set
     */
    static setStructure(groups: NavigationGroup[]): void {
        const event = new CustomEvent(Navigation.SetStructureEvent, { detail: groups });
        window.parent.document.dispatchEvent(event);
    }
}