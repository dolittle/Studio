// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React, { FunctionComponent } from 'react';
import { Constructor } from '@dolittle/types';
import { IViewContext } from './IViewContext';
import { ViewModelObserver } from './ViewModelObserver';

export function withViewModel<TViewModel, TProps = {}>(viewModelType: Constructor<TViewModel>, view: FunctionComponent<IViewContext<TViewModel, TProps>>) {
    return (props: TProps) => {
        return (
            <>
                <ViewModelObserver viewModelType={viewModelType} props={props} view={view} />
            </>
        );
    };
}
