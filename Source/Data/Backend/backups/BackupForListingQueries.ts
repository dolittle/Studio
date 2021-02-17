// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import fetch from 'node-fetch'
import { Query, Ctx, Arg } from 'type-graphql';
import { injectable } from 'tsyringe';
import { ILogger } from '@dolittle/vanir-backend';
import { Context } from '@dolittle/vanir-backend/dist/web';
import { BackupsForApplication, BackupLink, BackupLinkShareInput } from './BackupForListing';
import { getPlatformDownloadServerBasePath } from '../environment';

// TODO @Gøran ctx provides the tenantID ctx.tenantId

@injectable()
export class BackupForListingQueries {

    constructor(
        private readonly _logger: ILogger) {
    }

    @Query(() => BackupsForApplication)
    async allBackupsForListing(
        @Arg('application') application: string,
        @Arg('environment') environment: string,
        @Ctx() ctx: Context) {

        if (ctx.tenantId == "") {
            return {} as BackupsForApplication;
        }
        let response = await fetchBackupsByApplication(ctx.tenantId, application, environment);

        return {
            tenant: response.tenant.name,
            application: response.application,
            files: response.files,
        } as BackupsForApplication;
    }

    @Query(() => BackupLink)
    async getBackupLink(
        @Arg('tenant') tenant: string,
        @Arg('application') application: string,
        @Arg('file_path') file_path: string,
        @Ctx() ctx: Context) {

        if (ctx.tenantId == "") {
            return {} as BackupLink;
        }

        let input: BackupLinkShareInput = {
            tenant_id: ctx.tenantId,
            application,
            file_path,
        }
        // TODO user tenantId
        let response = await fetchLink(input);
        return response as BackupLink;
    }
}

async function fetchBackupsByApplication(tenant: string, name: string, environment: string) : Promise<any> {
    // TODO need to set the path to the download-server
    getPlatformDownloadServerBasePath
    const response = await fetch(`http://localhost:8080/share/logs/latest/by/app/${tenant}/${name}/${environment}`, {
        headers: {
            'x-secret': 'fake'
        }
    });

    if (!response.ok) {
        return {};
    }

    let body = await response.json();
    return body;
}

async function fetchLink(input: BackupLinkShareInput) : Promise<any> {
    const response = await fetch(`${getPlatformDownloadServerBasePath()}/logs/link`, {
        method: "POST",
        headers: {
            'x-secret': 'fake',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(input),
    });

    console.log(response);

    if (!response.ok) {
        return {};
    }

    let body = await response.json();
    return body;
}
