// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Guid } from '@dolittle/rudiments';
import { ClientBuilder } from '@dolittle/sdk';
import { ProjectionMustHaveAUniqueIdentifier } from './ProjectionMustHaveAUniqueIdentifier';
import { Constructor, PropertyAccessor } from '@dolittle/types';
import { PropertyMapBuilder, PropertyMapBuilderCallback } from './PropertyMapBuilder';
import { PropertyUtilities } from './PropertyUtilities';
import { Projection } from './Projection';
import { ModelType } from '@typegoose/typegoose/lib/types';

export type ProjectionBuilderCallback<TDocument extends object> = (builder: ProjectionBuilder<TDocument>) => void;

export class ProjectionBuilder<TDocument extends object> {
    private _id?: Guid;
    private _fromScope?: Guid;
    private _propertyMapBuilders: PropertyMapBuilder[] = [];
    private _model?: ModelType<any>;

    constructor(private readonly _targetType: Constructor<TDocument>, private readonly _clientBuilder: ClientBuilder) {
    }

    withId(id: Guid | string): ProjectionBuilder<TDocument> {
        this._id = Guid.as(id);

        return this;
    }

    fromScope(id: Guid | string): ProjectionBuilder<TDocument> {
        this._fromScope = Guid.as(id);

        return this;
    }

    useModel(model: ModelType<any>): ProjectionBuilder<TDocument> {
        this._model = model;

        return this;
    }

    set(targetProperty: PropertyAccessor<TDocument>, propertyMapBuilderCallback: PropertyMapBuilderCallback): ProjectionBuilder<TDocument> {
        const targetPropertyDescriptor = PropertyUtilities.getPropertyDescriptorFor(targetProperty);
        const propertyMapBuilder = new PropertyMapBuilder(targetPropertyDescriptor);
        propertyMapBuilderCallback(propertyMapBuilder);
        this._propertyMapBuilders.push(propertyMapBuilder);

        return this;
    }

    build() {
        if (!this._id) {
            throw new ProjectionMustHaveAUniqueIdentifier();
        }

        const distinct = (value: any, index: number, self: any[]) => {
            return self.indexOf(value) === index;
        };

        const reducers = this._propertyMapBuilders.map(_ => _.build());
        const events = reducers.flatMap(_ => _.eventTypes).filter(distinct);
        const projection = new Projection(this._id, this._targetType, reducers, this._model);

        this._clientBuilder.withEventHandlers(eh => {
            eh.createEventHandler(this._id!, b => {
                const builder = b.partitioned();
                if (this._fromScope) {
                    b.inScope(this._fromScope);
                }
                for (const eventType of events) {
                    builder.handle(eventType, projection.handle.bind(projection));
                }
            });
        });
    }
}
