// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import fetch from 'node-fetch'
import { Query, Ctx, Arg } from 'type-graphql';
import { injectable } from 'tsyringe';
import { ILogger } from '@dolittle/vanir-backend';
import { Context } from '@dolittle/vanir-backend/dist/web';
import { BackupsForApplication, BackupLink, BackupLinkShareInput } from './BackupForListing';
// TODO @Gøran ctx provides the tenantID ctx.tenantId

@injectable()
export class BackupForListingQueries {

    constructor(
        private readonly _logger: ILogger) {
    }

    @Query(() => BackupsForApplication)
    async allBackupsForListing(
        @Arg('domain') domain: string,
        @Ctx() context: Context) {

        let response = await fetchBackups(domain);
        return response as BackupsForApplication;
    }

    @Query(() => BackupLink)
    async getBackupLink(
        @Arg('tenant') tenant: string,
        @Arg('application') application: string,
        @Arg('file_path') file_path: string,
        @Ctx() context: Context) {
            console.log(context);
        let input: BackupLinkShareInput = {
            tenant,
            application,
            file_path,
        }
        let response = await fetchLink(input);
        return response as BackupLink;
    }
}

async function fetchBackups(domain: string) : Promise<any> {
    // TODO need to set the path to the download-server
    const response = await fetch(`http://localhost:8080/share/logs/latest/${domain}`, {
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
      // TODO need to set the path to the download-server
    const response = await fetch(`http://localhost:8080/share/logs/link`, {
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
