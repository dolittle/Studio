// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

function getPlatformDownloadServerBasePath(): string {
    return process.env.PLATFORM_DOWNLOAD_SERVER_BASE_PATH ?? 'http://localhost:8080/share';
}

export {
    getPlatformDownloadServerBasePath,
};
