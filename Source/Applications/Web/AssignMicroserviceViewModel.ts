// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { injectable } from 'tsyringe';
import { IApplications } from '@shared/platform';
import { IViewContext } from '@shared/mvvm';
import { AssignMicroserviceProps } from './AssignMicroservice';

@injectable()
export class AssignMicroserviceViewModel {
    applicationName?: string = '';
    microservices: {key: string, text: string}[] = [];
    private _props?: AssignMicroserviceProps;

    constructor(readonly applications: IApplications) {}

    activate({ props }: IViewContext<AssignMicroserviceViewModel>) {
        this._props = props;
        this._fetchMicroservices();
    }

    private _fetchMicroservices(): void {
        this.microservices = [
            { key: '50275f5d-33cc-4ffd-9d71-e4ec1de5790f', text: 'Apple' },
            { key: '97c016c1-3f6b-4a04-87bf-b365a1c8898f', text: 'Banana' },
            { key: 'acc140b5-d8f8-4f9a-be4d-082782473c89', text: 'Orange'},
            { key: 'dd1b3856-878a-44f0-81a4-0c65b8e9771d', text: 'Grape' },
            { key: '1fbacded-2b90-4e5f-b033-42785078134b', text: 'Broccoli' },
            { key: '727f457b-1b85-44bf-b5c1-4ee9e8a4b471', text: 'Carrot' },
            { key: '4c1829a0-3f22-40e1-a405-805a5da6b925', text: 'Lettuce' },
        ];


    }

    async assignMicroservice() {
        // //Validation?
        // if (this.applicationName) {
        //     await this.applications.create({ name: this.applicationName });
        //     this._props?.onCreated();
        // }
    }

}
