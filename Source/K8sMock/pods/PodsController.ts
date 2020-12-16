// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Controller, Get, Route, Tags } from 'tsoa';
import { V1PodList } from '@kubernetes/client-node';

// const pods = require('./pods.json') as V1PodList;

@Route('api/v1/namespaces')
@Tags('core_v1')
export class PodsController extends Controller {

    @Get('{namespace}/pods')
    getPods(namespace: string): V1PodList {
        return new V1PodList();
    }
}
