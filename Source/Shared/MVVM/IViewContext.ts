// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { FunctionComponent } from 'react';

export interface IViewContext<T, TProps = any> {
    view: FunctionComponent<IViewContext<T, TProps>>;
    viewModel: T,
    props: TProps
}
