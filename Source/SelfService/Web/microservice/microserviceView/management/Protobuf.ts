// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Uuid } from '@dolittle/contracts.web/Protobuf/Uuid_pb';
import { Artifact as PbArtifact } from '@dolittle/contracts.web/Artifacts/Artifact_pb';
import { Guid } from '@dolittle/rudiments';
import { Artifact } from './Types';

export function toGuid(uuid: Uuid) {
    return new Guid(uuid.getValue_asU8());
}

export function toUuid(guid: Guid | string) {
    const uuid = new Uuid();
    uuid.setValue(new Uint8Array(Guid.as(guid).bytes));
    return uuid;
}

export function toArtifact(artifact: PbArtifact): Artifact {
    return {generation: artifact.getGeneration(), id: toGuid(artifact.getId()!).toString()};
}
