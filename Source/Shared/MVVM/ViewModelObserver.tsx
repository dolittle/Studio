// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { FunctionComponent } from 'react';
import { BehaviorSubject } from 'rxjs';
import { ViewModelHelpers } from './ViewModelHelpers';
import { IViewContext } from './IViewContext';
import { Constructor } from '@dolittle/types';
import { IViewModelLifecycleManager } from './IViewModelLifecycleManager';

export type ViewModelObserverProps<TViewModel, TProps = {}> = {
    view: FunctionComponent<IViewContext<TViewModel, TProps>>,
    viewModelType: Constructor<TViewModel>
    props: TProps
};

export class ViewModelObserver<TViewModel, TProps = {}> extends React.Component<ViewModelObserverProps<TViewModel, TProps>, IViewContext<TViewModel, TProps>> {

    constructor(props: ViewModelObserverProps<TViewModel, TProps>) {
        super(props);

        this.initialize();
    }

    private initialize() {
        const viewModel = ViewModelHelpers.createViewModelInstance<TViewModel>(this.props.viewModelType);

        ViewModelHelpers.bindViewModelFunctions(viewModel);

        const viewContext = {
            viewModel,
            props: this.props.props,
            view: this.props.view
        } as IViewContext<TViewModel, TProps>;

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

        ViewModelHelpers.setSubscriptionsOn(viewModel, () => {
            this.mutate();
        });

        this.state = viewContext;
    }

    componentDidMount() {
    }


    componentDidUpdate(prevProps: ViewModelObserverProps<TViewModel, TProps>) {
        for (const key in prevProps.props) {
            if (prevProps.props[key] !== this.props.props[key]) {
                this.setState({ props: this.props.props });
                break;
            }
        }
    }

    private mutate() {
        this.forceUpdate();
    }

    render() {
        return (
            <>
                {React.createElement(this.props.view, this.state)}
            </>
        );
    }

}
