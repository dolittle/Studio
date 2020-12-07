// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Controller, Get, Route, Tags } from 'tsoa';
import { PodList } from '@shared/backend/k8s/PodList';

const namespaces = require('./namespaces.json') as PodList;

@Route('api/v1/namespaces')
@Tags('core_v1')
export class NamespacesController extends Controller {

    @Get()
    async getNamespaces(): Promise<PodList> {
        return namespaces;
    }
}