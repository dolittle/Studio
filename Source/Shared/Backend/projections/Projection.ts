// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Guid } from '@dolittle/rudiments';
import { Constructor } from '@dolittle/types';
import { EventContext, EventTypeId } from '@dolittle/sdk.events';

import { getModelForClass } from '@typegoose/typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { IReducer } from './IReducer';

export class Projection {
    private readonly _databaseModel: ModelType<any>;

    constructor(readonly stream: Guid,
        private readonly _targetType: Constructor,
        private readonly _reducers: IReducer<any>[],
        databaseModel?: ModelType<any>) {
        this._databaseModel = databaseModel || getModelForClass(_targetType);
    }

    async handle(event: any, context: EventContext) {
        try {
            const currentProjectionState = await this._databaseModel.findById(context.eventSourceId.value).exec();

            let currentState = currentProjectionState || {};

            const reducers = this._reducers.filter(_ => _.eventTypes.some(et => et === event.constructor));
            for (const reducer of reducers) {
                currentState = reducer.perform(currentState, [event]);
            }

            await this._databaseModel.updateOne({ _id: context.eventSourceId.value }, currentState, { upsert: true });

        } catch (ex) {
            console.log(ex);
        }
    }
}
