// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { injectable } from 'tsyringe';
import { NetworkStatus, ObservableQuery } from 'apollo-client';
import gql from 'graphql-tag';
import { IViewContext } from '@dolittle/vanir-react';
import { DataSource } from '@dolittle/vanir-web';
import { MicroserviceDetailsProps } from './MicroserviceDetails';
import { Microservice } from '../Microservice';

@injectable()
export class MicroserviceDetailsViewModel {
    microservice: Microservice = {} as Microservice;

    private _props?: MicroserviceDetailsProps;
    private _observableQuery?: ObservableQuery<MicroserviceQuery>;

    constructor(private readonly _dataSource: DataSource) {}

    activate({
        props,
    }: IViewContext<MicroserviceDetailsViewModel, MicroserviceDetailsProps>) {
        this._props = props;
        this._getMicroservice(props.applicationId, props.microserviceId);
    }

    private _getMicroservice(applicationId: string, microserviceId: string) {
        const query = gql`
            query {
                microservice(applicationId:"${applicationId}", microserviceId:"${microserviceId}") {
                    id,
                    name,
                    headImage,
                    runtimeImage
                }
            }
        `;

        this._observableQuery = this._dataSource.watchQuery<MicroserviceQuery>({
            query,
        });

        this._observableQuery?.subscribe((next) => {
            console.log('Query Returned', next);
            if (next.networkStatus === NetworkStatus.ready && next.data) {
                this.microservice = next.data.microservice;
            }
        });
    }
}

type MicroserviceQuery = {
    microservice: Microservice;
};
