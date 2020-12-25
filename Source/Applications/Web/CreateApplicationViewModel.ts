// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { injectable } from 'tsyringe';
import { IApplications } from '@shared/platform';
import { IViewContext } from '@dolittle/vanir-react';
import { CreateApplicationProps } from './CreateApplication';

@injectable()
export class CreateApplicationViewModel {
    applicationName?: string = '';
    private _props?: CreateApplicationProps;

    constructor(readonly applications: IApplications) {}

    activate({ props }: IViewContext<CreateApplicationViewModel>) {
        this._props = props;
    }

    async createApplication() {
        //Validation?
        if (this.applicationName) {
            await this.applications.create({ name: this.applicationName });
            this._props?.onCreated();
        }
    }
}
