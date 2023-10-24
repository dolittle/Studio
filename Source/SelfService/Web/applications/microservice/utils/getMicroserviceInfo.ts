// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { canEditMicroservice } from '../../stores/microservice';

import { MicroserviceSimple } from '../../../apis/solutions/index';
import { HttpResponseApplication } from '../../../apis/solutions/application';
import { MicroserviceObject } from '../../../apis/solutions/api';

// Check if there is microservice.edit data. If not, use microservice.live data.
export const getMicroserviceInfo = (application: HttpResponseApplication, microservice: MicroserviceObject): MicroserviceSimple => {
    const canEdit = canEditMicroservice(application.environments, microservice.environment, microservice.id);

    if (canEdit) {
        return microservice.edit;
    } else {
        // Can I not move this to the store?
        const headImage = microservice.live.images.find(img => img.name === 'head')?.image || 'N/A';
        const runtimeImage = microservice.live.images.find(img => img.name === 'runtime')?.image || 'N/A';

        const headCommand = {
            command: [],
            args: [],
        };

        const environmentInfo = application.environments.find(environment => environment.name === microservice.environment)!;

        // TODO currently we don't use the ms.extra.ingress in the view
        // Look to "liveIngressView" for how we "set" the data to uniq paths
        return {
            dolittle: {
                applicationId: application.id,
                customerId: application.customerId,
                microserviceId: microservice.id,
            },
            name: microservice.name,
            kind: 'unknown',
            environment: microservice.environment,
            extra: {
                ingress: {
                    path: '',
                    pathType: '',
                },
                headPort: 80,
                isPublic: true,
                headImage,
                runtimeImage,
                headCommand,
                connections: environmentInfo.connections,
            },
        };
    }
};
