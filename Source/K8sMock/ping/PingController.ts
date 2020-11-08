// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Controller, Get, Route } from 'tsoa';

interface PingResponse {
    message: string;
}

@Route('api/k8s/ping')
export class PingController extends Controller {
    @Get('/')
    async getMessage(): Promise<PingResponse> {
        return {
            message: 'pong'
        };
    }
}