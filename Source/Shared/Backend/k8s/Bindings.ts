// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { container } from 'tsyringe';
import { constructor } from '@shared/dependencyinversion';
import { K8sClient } from './K8sClient';
import { IK8sClient } from './IK8sClient';

export class Bindings {
    static initialize() {
        container.registerInstance(
            IK8sClient as constructor<IK8sClient>,
            new K8sClient()
        );
    }
}
