// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Subscription } from 'rxjs';
import { ViewModelHelpers } from './ViewModelHelpers';

export class PropertySubscriptions {
    private _subscriptions: Subscription[] = [];

    constructor(viewModel: any, callback: () => void) {
        let initial = true;

        const properties = ViewModelHelpers.getNonInternalPropertiesFrom(viewModel);

        for (const property of properties) {
            const observablePropertyName = ViewModelHelpers.getObservablePropertyNameFor(property);
            const subscription = viewModel[observablePropertyName].subscribe((next: any) => {
                if (initial) return;
                callback();
            });

            this._subscriptions.push(subscription);
        }

        initial = false;
    }

    unsubscribe() {
        for (const subscription of this._subscriptions) {
            subscription.unsubscribe();
        }
    }
}
