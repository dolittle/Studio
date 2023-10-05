// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Observable } from 'rxjs';

import { TailRequest, TailResponseMessage } from './types';
import { buildRequestQuerystring } from './queries';

const webSocketOrigin = `${window.location.protocol === 'http:' ? 'ws:' : 'wss:'}//${window.location.host}`;

/**
 * Creates an {@link Observable} that makes a '/loki/api/v1/tail' WebSocket request to Loki, and streams the messages.
 * @param request The request to make.
 * @returns An {@link Observable} that when observed creates a WebSocket request to Loki, and returns the streamed messages.
 */
export const tail = (request: TailRequest): Observable<TailResponseMessage> => new Observable((subscriber) => {
    const socket = new WebSocket(`${webSocketOrigin}/api/system/monitoring/logs/v1/tail?${buildRequestQuerystring(request)}`);

    socket.addEventListener('message', msg => {
        if (typeof msg.data === 'string') {
            const message = JSON.parse(msg.data) as TailResponseMessage;
            subscriber.next(message);
        }
    });

    return () => socket.close();
});
