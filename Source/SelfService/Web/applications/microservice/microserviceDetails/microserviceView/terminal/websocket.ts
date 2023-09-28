// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

export type WebSocketConnection<T extends Uint8Array | string = Uint8Array | string> = {
    readable: ReadableStream<T>;
    writable: WritableStream<T>;
    protocol: string;
    extensions: string;
};

export type WebSocketCloseInfo = {
    code?: number;
    reason?: string;
};

export type WebSocketStreamOptions = {
    protocols?: string[];
    signal?: AbortSignal;
};

/**
 * A polyfill for using WebSockets as streams - the hope is that the proposal for this will be accepted, and then we don't need this class in the future.
 * @see https://web.dev/websocketstream/
 * @see https://github.com/CarterLi/websocketstream-polyfill/
 */
export class WebSocketStream<T extends Uint8Array | string = Uint8Array | string> {
    readonly url: string;

    readonly connection: Promise<WebSocketConnection<T>>;

    readonly closed: Promise<WebSocketCloseInfo>;

    readonly close: (closeInfo?: WebSocketCloseInfo) => void;

    constructor(url: string, options: WebSocketStreamOptions = {}) {
        if (options.signal?.aborted) {
            throw new DOMException('This operation was aborted', 'AbortError');
        }

        this.url = url;

        const ws = new WebSocket(url, options.protocols ?? []);

        const close = ({ code, reason }: WebSocketCloseInfo = {}) => ws.close(code, reason);

        this.connection = new Promise((resolve, reject) => {
            ws.addEventListener('open', () => {
                resolve({
                    readable: new ReadableStream<T>({
                        start(controller) {
                            ws.addEventListener('message', ({ data }) => controller.enqueue(data));
                            ws.addEventListener('error', error => controller.error(error));
                        },
                        cancel: close,
                    }),
                    writable: new WritableStream<T>({
                        write(chunk) { ws.send(chunk); },
                        abort() { ws.close(); },
                        close,
                    }),
                    protocol: ws.protocol,
                    extensions: ws.extensions,
                });
                ws.removeEventListener('error', reject);
            });

            ws.addEventListener('error', reject);
        });

        this.closed = new Promise<WebSocketCloseInfo>((resolve, reject) => {
            ws.addEventListener('close', ({ code, reason }) => {
                resolve({ code, reason });
                ws.removeEventListener('error', reject);
            });
            ws.addEventListener('error', reject);
        });

        if (options.signal) {
            options.signal.onabort = () => ws.close();
        }

        this.close = close;
    }
}
