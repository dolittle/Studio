// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { RefObject } from 'react';
import { Constructor } from '@dolittle/types';
import { MessageHandler } from './MessageHandler';
import { Observable } from 'rxjs';
import { Message } from './Message';

export abstract class IMessenger {
    abstract observeAll(): Observable<Message>;
    abstract observe<T>(type: Constructor<T>): Observable<T>;

    abstract subscribeTo<T>(type: Constructor<T>, handler: MessageHandler<T>): void;

    abstract publish(message: any): void;

    abstract setCurrentContent(content: RefObject<HTMLIFrameElement>): void;
}
