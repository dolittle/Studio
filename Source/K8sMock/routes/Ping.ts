// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Get, Route } from 'tsoa';

interface PingResponse {
    message: string;
}

@Route('api/k8s/ping')
export default class PingController {
    @Get('/')
    public async getMessage(): Promise<PingResponse> {
        return {
            message: 'pong'
        };
    }
}