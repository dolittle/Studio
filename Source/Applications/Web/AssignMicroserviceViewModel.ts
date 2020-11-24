// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { IViewContext } from '@shared/mvvm';
import gql from 'graphql-tag';
import { Guid } from '@dolittle/rudiments';
import { injectable } from 'tsyringe';
import { AssignMicroserviceProps } from './AssignMicroservice';
import { DataSource } from './DataSource';

@injectable()
export class AssignMicroserviceViewModel {
    microservices: {key: string, text: string}[] = [];
    selectedMicroserviceId: string | undefined;
    private _props! : AssignMicroserviceProps;

    constructor(
        readonly _dataSource: DataSource
    ) {}

    activate({props}: IViewContext<AssignMicroserviceViewModel>) {
        console.log('activating', props)
        this._props = props;
        this._fetchMicroservices();
    }

    selectMicroservice(option? : SelectedOption) {
        console.log('selected', option, this._props);
        this.selectedMicroserviceId = option?.key;
    }

    async _fetchMicroservices(): Promise<void> {
        const query = gql`
            query {
                allMicroservices {
                    microserviceId
                    name
                }
            }
        `;

        const result = await this._dataSource.query<MicroservicesQuery>({ query });

        this.microservices = result
            .data
            ?.allMicroservices
            .map(ms => ({key: ms.microserviceId, text: ms.name}));
    }

    async assignMicroservice(
        applicationId: Guid,
        microserviceId: string | undefined
    ) {
        console.log(
            'assign microservice',
            microserviceId,
            'to application',
            applicationId);
        if (applicationId && microserviceId) {
            // no op
        }
        // //Validation?
        // if (this.applicationName) {
        //     await this.applications.create({ name: this.applicationName });
        //     this._props?.onCreated();
        // }
    }

}

export type SelectedOption = {
    key?: string
}

export type MicroservicesQuery = {
    allMicroservices: MicroserviceModel[]
};

export type MicroserviceModel = {
    microserviceId: string,
    name: string
}
