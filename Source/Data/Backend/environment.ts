
function getPlatformDownloadServerBasePath(): string {
    return process.env.PLATFORM_DOWNLOAD_SERVER_BASE_PATH ?? 'http://localhost:8080/share';
}

export {
    getPlatformDownloadServerBasePath,
}
