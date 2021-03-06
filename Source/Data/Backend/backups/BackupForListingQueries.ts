// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import { Query, Ctx, Arg } from 'type-graphql';
import { injectable } from 'tsyringe';
import { ILogger } from '@dolittle/vanir-backend';
import { Context } from '@dolittle/vanir-backend/dist/web';
import { BackupsForApplication, BackupLink, BackupLinkShareInput } from './BackupForListing';
import { fetchBackupsByApplication, fetchLink } from './api';
@injectable()
export class BackupForListingQueries {

    constructor(
        private readonly _logger: ILogger) {
    }

    @Query((returns) => BackupsForApplication)
    async allBackupsForListing(
        @Arg('application') application: string,
        @Arg('environment') environment: string,
        @Ctx() ctx: Context): Promise<BackupsForApplication> {

        if (ctx.tenantId === '') {
            return {
                tenant: '',
                environment: '',
                application: '',
                files: []
            };
        }
        const response = await fetchBackupsByApplication(ctx.tenantId, application, environment);

        return {
            tenant: response.tenant.name,
            environment,
            application: response.application,
            files: response.files,
        };
    }

    @Query((returns) => BackupLink)
    async getBackupLink(
        @Arg('application') application: string,
        @Arg('environment') environment: string,
        @Arg('file_path') filePath: string,
        @Ctx() ctx: Context): Promise<BackupLink> {

        if (ctx.tenantId === '') {
            return {
                tenant: '',
                application: '',
                expire: '',
                url: ''
            };
        }

        const input: BackupLinkShareInput = {
            tenant_id: ctx.tenantId,
            environment,
            application,
            file_path: filePath,
        };

        const response = await fetchLink(input);
        return response as BackupLink;
    }
}

