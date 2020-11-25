// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { IApplications } from '@shared/platform';
import { IViewContext } from '@shared/mvvm';
import { Guid } from '@dolittle/rudiments';
import { injectable } from 'tsyringe';
import { QueryForMicroservices } from './QueryForMicroservices';
import { AssignMicroserviceProps } from './AssignMicroservice';

@injectable()
export class AssignMicroserviceViewModel {
    microservices: { key: string; text: string }[] = [];
    selectedMicroserviceId: string | undefined;
    private _props!: AssignMicroserviceProps;

    constructor(
        readonly _query: QueryForMicroservices,
        readonly _applications: IApplications
        ) {}

    activate({
        props,
    }: IViewContext<AssignMicroserviceViewModel, AssignMicroserviceProps>) {
        console.log('activating', props);
        this._props = props;
        this._fetchMicroservices();
    }

    selectMicroservice(option?: SelectedOption) {
        console.log('selected', option, this._props);
        this.selectedMicroserviceId = option?.key;
    }

    async _fetchMicroservices(): Promise<void> {
        const microservices = await this._query.allMicroservices();
        this.microservices = microservices.map((ms) => ({
            key: ms.microserviceId,
            text: ms.name,
        }));
    }

    async assignMicroservice(applicationId: Guid, microserviceId: string | undefined) {
        console.log(
            'assign microservice',
            microserviceId,
            'to application',
            applicationId
        );
        if (applicationId && microserviceId) {
            await this._applications.assignMicroserviceToApplication(applicationId, Guid.parse(microserviceId));
        }

    }
}

export type SelectedOption = {
    key?: string;
};
