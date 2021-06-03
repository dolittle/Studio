// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

export type ProcessingResult = {
    WasProcessed: boolean;
    Result: any;
};

export interface EntityTransformer {
    Name: string;
    Filter(data: any): boolean;
    Transform(data: any): any;
}

export class RawDataProcessor {
    transforms = new Array<EntityTransformer>();

    constructor() {
    }

    Process(input: any): ProcessingResult {
        for (const filter of this.transforms) {
            if (filter.Filter(input)) {
                return {
                    WasProcessed: true,
                    Result: filter.Transform(input)
                };
            }
        }

        return {
            WasProcessed: false,
            Result: null
        };
    }

    AddEntityTransformer(transformer: EntityTransformer) {
        this.transforms = this.transforms.concat(transformer);
    }

}
