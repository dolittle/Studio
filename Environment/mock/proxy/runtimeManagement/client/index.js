// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

const { Router } = require('express');
const { artifactBuildResult, buildResult, emptyBuildResults, respondWith, type } = require('./buildResults');
const routes = module.exports = Router({ mergeParams: true });

const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

const messages = {
    short: () => generateString(20),
    long: () => generateString(200)
}

const createArtifactBuildResults = () => [
    artifactBuildResult('72426059-f47c-4311-86c8-2a4e47fa2a4a', 'Some Alias', 1, buildResult(messages.short(), type.Information)),
    artifactBuildResult('72426059-f47c-4311-86c8-2a4e47fa2a4a', 'Some Alias', 1, buildResult(messages.long(), type.Information)),
    artifactBuildResult('b46d86d7-7c10-40dd-a4ee-d9d05259c676', 'With Error', 1, buildResult(messages.short(), type.Information)),
    artifactBuildResult('b46d86d7-7c10-40dd-a4ee-d9d05259c676', 'With Error', 1, buildResult(messages.long(), type.Error)),
    artifactBuildResult('6eec65ea-71ac-4fe4-b74c-a42de5f9c4b9', 'With Failure', 1, buildResult(messages.short(), type.Information)),
    artifactBuildResult('6eec65ea-71ac-4fe4-b74c-a42de5f9c4b9', 'With Failure', 1, buildResult(messages.long(), type.Failure)),
    artifactBuildResult('bc226a57-5699-4923-9600-67da7e153784', 'Same Alias As Another', 1, buildResult(messages.short(), type.Information)),
    artifactBuildResult('e62f7431-19b3-41f0-a6e3-bced556e510d', 'Same Alias As Another', 1, buildResult(messages.short(), type.Information)),
    artifactBuildResult('5b79b500-b43a-4805-84cb-14740317b45d', 'Different Generations', 1, buildResult(messages.short(), type.Information)),
    artifactBuildResult('5b79b500-b43a-4805-84cb-14740317b45d', 'Different Generations', 2, buildResult(messages.short(), type.Information)),
    artifactBuildResult('31e18f24-aa1a-448a-b0a2-a82f1b825edf', 'Different Aliases1', 1, buildResult(messages.short(), type.Information)),
    artifactBuildResult('31e18f24-aa1a-448a-b0a2-a82f1b825edf', 'Different Aliases2', 1, buildResult(messages.short(), type.Information)),
];

const other = [
    buildResult(messages.short(), type.Information),
    buildResult(messages.short(), type.Error),
    buildResult(messages.short(), type.Failure),
    buildResult(messages.long(), type.Information),
    buildResult(messages.long(), type.Error),
    buildResult(messages.long(), type.Failure),
];
routes.post('/GetBuildResults', (req, res) => {
    const buildResults = emptyBuildResults();
    buildResults.setEventtypesList(createArtifactBuildResults());
    buildResults.setAggregaterootsList(createArtifactBuildResults());
    buildResults.setEmbeddingsList(createArtifactBuildResults());
    buildResults.setEventhandlersList(createArtifactBuildResults());
    buildResults.setFiltersList(createArtifactBuildResults());
    buildResults.setProjectionsList(createArtifactBuildResults());
    buildResults.setOtherList(other);
    respondWith(res, buildResults);
});
