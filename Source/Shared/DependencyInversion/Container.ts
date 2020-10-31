import { container } from 'tsyringe';

import { IContainer } from './IContainer';

export class Container implements IContainer {
    get<T>(source: Function & { prototype: T; }): T {
        return container.resolve<T>(source as any);
    }
}