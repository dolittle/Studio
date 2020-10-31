export * from './IContainer';
export * from './Container';

import { constructor } from 'tsyringe/dist/typings/types';
export { constructor };

import { container } from 'tsyringe';
import { Container } from './Container';
import { IContainer } from './IContainer';

export const containerInstance: IContainer = new Container();

export function initialize() {
    container.registerInstance(IContainer as constructor<IContainer>, containerInstance);
}