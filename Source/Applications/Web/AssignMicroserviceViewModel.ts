// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { IApplications } from '@shared/platform';
import { IViewContext } from '@shared/mvvm';
import { Guid } from '@dolittle/rudiments';
import { injectable } from 'tsyringe';
import { QueryForMicroservices } from './QueryForMicroservices';
import { MicroserviceModel } from './MicroserviceModel';
import { AssignMicroserviceProps } from './AssignMicroservice';
import { SelectedOption } from './SelectedOption';

@injectable()
export class AssignMicroserviceViewModel {
    microservices: MicroserviceModel[] = [];
    selectedApplicationId: string | undefined;
    selectedEnvironmentId: string | undefined;
    selectedMicroserviceId: string | undefined;
    isAssigning: boolean = false;

    constructor(
        readonly _query: QueryForMicroservices,
        readonly _applications: IApplications
    ) {}

    activate() {
        this._fetchMicroservices();
    }

    selectApplication(option?: SelectedOption) {
        this.selectedApplicationId = option?.key;
    }

    selectEnvironment(option: SelectedOption): void {
        this.selectedEnvironmentId = option?.key;
    }

    selectMicroservice(option?: SelectedOption) {
        this.selectedMicroserviceId = option?.key;
    }

    async _fetchMicroservices(): Promise<void> {
        const microservices = await this._query.allMicroservices();
        this.microservices = microservices;
    }

    async assignMicroservice() {
        const applicationId = this.selectedApplicationId,
            environmentId = this.selectedEnvironmentId,
            microserviceId = this.selectedMicroserviceId;
        if (applicationId && microserviceId) {
            this.isAssigning = true;
            try {
                console.log(applicationId, environmentId, microserviceId);
                // await this._applications.assignMicroserviceToApplication(
                //     Guid.parse(applicationId),
                //     Guid.parse(microserviceId)
                // );
            } catch (e) {
                console.log(e.message);
            } finally {
                this.isAssigning = false;
            }
        }
    }
}

