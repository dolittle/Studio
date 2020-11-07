// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { withViewModel } from '@shared/mvvm';
import { Application, IApplications } from '@shared/platform';
import React from 'react';
import { injectable } from 'tsyringe';

import { PrimaryButton } from 'office-ui-fabric-react';

@injectable()
class ViewModel {
    constructor(private readonly _applications: IApplications) {

    }

    async create() {
        const result = await this._applications.create(new Application());
        console.log(`Result : ${result.message}`);
    }
}

export const Something = withViewModel(ViewModel, ({ viewModel }) => {
    return (
        <PrimaryButton onClick={viewModel.create}>Create app</PrimaryButton>
    );
});
