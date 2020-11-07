// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

export class ProjectionMustHaveAUniqueIdentifier extends Error {
    constructor() {
        super('Projection must have a unique identifier - use the widthId() on the builder');
    }
}
