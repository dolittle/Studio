// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

const { Artifact } = require('@dolittle/contracts.web/Artifacts/Artifact_pb');
const { toUuid } = require('./guids')
module.exports = {
    pbArtifact: (guidString, generation = 1) => {
        const artifact = new Artifact();
        artifact.setId(toUuid(guidString));
        artifact.setGeneration(generation);
        return artifact;
    }
}