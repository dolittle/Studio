// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { injectable } from 'tsyringe';
import { Guid } from '@dolittle/rudiments';
import { IApplications } from '@shared/platform';
import { SelectedOption } from './SelectedOption';

@injectable()
export class CreateEnvironmentViewModel {
    environmentName?: string = '';
    selectedApplication: string | undefined;

    constructor(readonly applications: IApplications) {}

    selectApplication(applicationSelection: SelectedOption): void {
        this.selectedApplication = applicationSelection.key;
    }

    async createEnvironment() {
        //Validation?
        if (this.environmentName && this.selectedApplication) {
            await this.applications.createEnvironment(Guid.parse(this.selectedApplication), { name: this.environmentName });
            // this._props?.onCreated();
        }
    }
}
