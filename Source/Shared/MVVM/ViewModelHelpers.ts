import { Constructor } from '@dolittle/types';

import { Container } from 'typescript-ioc';
import { PropertySubscriptions } from './PropertySubscriptions';
import { ViewModelLifecycle } from './ViewModelLifecycle';

const privatePrefix = '_';
const internalPrefix = '__';
const subscriptionsPropertyName = `${internalPrefix}subscriptions`;
const lifecyclePropertyName = `${internalPrefix}viewModelLifecycle`;

export class ViewModelHelpers {

    static isInternal(item: string): boolean {
        return item.indexOf(internalPrefix) === 0;
    }

    static isPrivate(item: string): boolean {
        return item.indexOf(privatePrefix) === 0;
    }

    static getNonInternalPropertiesFrom(object: any): string[] {
        let properties = Reflect.ownKeys(object) as string[];
        properties = properties.filter(_ => !ViewModelHelpers.isInternal(_) && !ViewModelHelpers.isPrivate(_) && typeof object[_] !== 'function');
        return properties;
    }

    static bindViewModelFunctions(vm: any): void {
        const proto = Reflect.getPrototypeOf(vm) as any;
        let functions = Reflect.ownKeys(proto) as string[];
        functions = functions.filter(_ => _.indexOf('constructor') < 0 && typeof proto[_] === 'function');
        for (const _function of functions) {
            vm[_function] = vm[_function].bind(vm);
        }
    }

    static createViewModelInstance<T>(viewModelType: Constructor<T>): any {
        const args = (viewModelType as any).__inject?.map((_: Function) => Container.get(_)) || [];
        const vm = new viewModelType(...args) as any;
        return vm;
    }

    static getObservablePropertyNameFor(property: string): string {
        return `${internalPrefix}${property}`;
    }

    static clearSubscriptionsOn(viewModel: any) {
        if (viewModel[subscriptionsPropertyName]) {
            viewModel[subscriptionsPropertyName].unsubscribe();
            delete viewModel[subscriptionsPropertyName];
        }
    }

    static setSubscriptionsOn(viewModel: any, callback: () => void) {
        ViewModelHelpers.clearSubscriptionsOn(viewModel);
        viewModel[subscriptionsPropertyName] = new PropertySubscriptions(viewModel, callback);
    }

    static setLifecycleOn(viewModel: any): ViewModelLifecycle {
        const lifecycle = new ViewModelLifecycle(viewModel);
        viewModel[lifecyclePropertyName] = lifecycle;
        return lifecycle;
    }

    static getLifecycleFor(viewModel: any): ViewModelLifecycle {
        if (viewModel[lifecyclePropertyName]) return viewModel[lifecyclePropertyName] as ViewModelLifecycle;
        return ViewModelHelpers.setLifecycleOn(viewModel);
    }
}
