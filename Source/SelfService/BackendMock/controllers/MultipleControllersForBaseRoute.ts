// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Exception } from '@dolittle/rudiments';

/**
 * Represents an implementation of {@link IControllers}.
 */
export class MultipleControllersForBaseRoute extends Exception {

    constructor(baseRoute: string) {
        super(`There are multiple controllers with base route '${baseRoute}'`);
    }

}
