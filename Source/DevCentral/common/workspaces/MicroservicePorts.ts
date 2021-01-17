// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

export class MicroservicePorts {
    static default = new MicroservicePorts('', 3000, 9000, 50052, 9700);

    constructor(readonly id: string, readonly backend: number, readonly web: number, readonly runtime: number, readonly metrics: number) { }
}
