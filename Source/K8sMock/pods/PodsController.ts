// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Body, Controller, Get, Route, Tags } from 'tsoa';
import { injectable } from 'tsyringe';


export interface PodListMetadata {
    continue: string;
    remainingItemCount: number;
    resourceVersion: string
    selfLink: string;
}

export interface Pod {

}

export interface PodList {
    apiVersion: string;
    items: Pod[];
    kind: string;
    metadata: PodListMetadata;
}

@Route('api/v1/namespaces')
@Tags('core_v1')
@injectable()
export class PodsController extends Controller {

    @Get('{namespace}/pods')
    async getPods(): Promise<PodList> {
        return {
            apiVersion: '1',
            items: [],
            kind: 'something',
            metadata: {
                continue: 'no',
                remainingItemCount: 42,
                resourceVersion: '1',
                selfLink: 'self'
            }
        };
    }
}