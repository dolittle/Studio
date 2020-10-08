import React, { FunctionComponent, ReactNode, useEffect, useState } from 'react';
import { Constructor } from '@dolittle/types';
import { BehaviorSubject } from 'rxjs';
import { ViewModelHelpers } from './ViewModelHelpers';
import { IViewContext } from './IViewContext';

const viewModelChanged = '__viewModelChanged';


type ObserverProps = {
    viewContext: IViewContext<any>;
    view: FunctionComponent<any>;
};

function Observer(props: ObserverProps) {
    const viewModel = props.viewContext.viewModel as any;
    const [someState, setSomeState] = useState(0);
    (viewModel as any)[viewModelChanged] = () => setSomeState(someState + 1);

    return (
        <>
            {React.createElement(props.view, props.viewContext)}
        </>
    );
}

export function withViewModel<T>(viewModelType: Constructor<T>, view: FunctionComponent<IViewContext<T>>) {

    return (routing: any) => {
        const viewContext = {
        } as IViewContext<any>;

        const viewModel = ViewModelHelpers.createViewModelInstance<T>(viewModelType);
        ViewModelHelpers.bindViewModelFunctions(viewModel);
        viewContext.viewModel = viewModel;

        ViewModelHelpers.setLifecycleOn(viewModel);
        ViewModelHelpers.getLifecycleFor(viewModel).activate(viewContext);

        const viewModelAsAny = viewModel as any;

        const properties = ViewModelHelpers.getNonInternalPropertiesFrom(viewModel);
        for (const property of properties) {
            const observablePropertyName = ViewModelHelpers.getObservablePropertyNameFor(property);
            const propertyValue = viewModelAsAny[property];
            viewModelAsAny[observablePropertyName] = new BehaviorSubject(propertyValue);

            Object.defineProperty(viewModel, property, {
                get: () => {
                    return viewModelAsAny[observablePropertyName].value;
                },
                set: (value: any) => {
                    viewModelAsAny[observablePropertyName].next(value);
                }
            });
        }

        useEffect(() => {
            ViewModelHelpers.setSubscriptionsOn(viewModel, () => {
                if (typeof viewModelAsAny[viewModelChanged] === 'function') {
                    viewModelAsAny[viewModelChanged]();
                }
            });
            return () => {
                ViewModelHelpers.clearSubscriptionsOn(viewModel);
            };
        });

        return (
            <>
                <Observer viewContext={viewContext} view={view} />
            </>
        );
    };
}
