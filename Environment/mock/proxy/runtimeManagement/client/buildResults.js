// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

const { ArtifactBuildResult, BuildResult, BuildResults } = require('@dolittle/contracts.web/Runtime/Client/BuildResult_pb');
const {GetBuildResultsResponse } = require('@dolittle/contracts.web/Runtime/Management/Client/Client_pb');
const { pbArtifact } = require('../artifacts')
const { respondWith } = require('../responses')
module.exports = {
    emptyBuildResults: () => {
        return new BuildResults();
    },
    artifactBuildResult: (idString, alias = '', generation = 1, buildResult = undefined) => {
        const result = new ArtifactBuildResult();
        result.setAritfact(pbArtifact(idString, generation));
        result.setAlias(alias);
        result.setBuildresult(buildResult);
        return result;
    },
    buildResult: (message, type) => {
        const result = new BuildResult();
        result.setMessage(message);
        result.setType(type);
        return result;
    },
    respondWith: (res, buildResults) => {
        const response = new GetBuildResultsResponse();
        response.setBuildresults(buildResults);
        respondWith(res, response);
    },
    type: {
        Information: BuildResult.Type.INFORMATION,
        Failure: BuildResult.Type.FAILURE,
        Error: BuildResult.Type.ERROR,
    }
}