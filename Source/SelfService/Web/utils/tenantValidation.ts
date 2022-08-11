// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Guid } from '@dolittle/rudiments';
import { EnvironmentsProps } from '../application/create/create';

export const checkTenantIdValidity = (environments: EnvironmentsProps) => {
    let isValid = true;

    environments
        .filter(e => e.checked)
        .forEach(environment => {
            const atLeastOneCustomerTenant = environment.customerTenants.length === 0;
            if (atLeastOneCustomerTenant) {
                isValid = false;
                return;
            }

            environment.customerTenants.forEach(tenant => {
                let parsed: Guid;
                try {
                    parsed = Guid.parse(tenant);
                } catch (error) {
                    isValid = false;
                    return;
                }
                if (parsed.toString().includes('NaN') || tenant.length !== 36) {
                    isValid = false;
                    return;
                }
            });
        });

    if (environments.every(e => !e.checked)) {
        isValid = false;
    }
};
