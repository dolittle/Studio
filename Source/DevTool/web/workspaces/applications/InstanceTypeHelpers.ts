// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { InstanceType } from '../../../common/applications';

const instanceTypeStrings: any = {};
instanceTypeStrings[InstanceType.container] = 'Container';
instanceTypeStrings[InstanceType.process] = 'Process';

export function GetInstanceTypeAsString(instanceType: InstanceType) {
    return instanceTypeStrings[instanceType];
}
