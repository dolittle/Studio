// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
import fetch from 'node-fetch'
import { Resolver, Query, Ctx, Arg } from 'type-graphql';
import { injectable } from 'tsyringe';
import { ILogger } from '@dolittle/vanir-backend';
import { Context } from '@dolittle/vanir-backend/dist/web';
import { BackupForListing, BackupsForApplication, BackupLink, BackupLinkShareInput } from './BackupForListing';


@injectable()
@Resolver(BackupForListing)
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

        let input: BackupLinkShareInput = {
            tenant,
            application,
            file_path,
        }
        let response = await fetchLink(input);
        return response as BackupLink;

        return {
            "tenant":"Customer-Chris",
            "application":"Taco",
            "url":"https://453e04a74f9d42f2b36cd51f.file.core.windows.net/taco-dev-backup/mongo/2021-01-22_00-34-11.gz.mongodump?se=2021-02-17T15%3A40%3A02Z\u0026sig=PV4Sv82sxB5YhU%2Fxux9Q%2BBuG8ArbKpRWf6gRlwz%2Fj2s%3D\u0026sp=r\u0026spr=https\u0026sr=f\u0026sv=2019-02-02",
            "expire":"2021-02-17T15:40:02.424735Z"
        } as BackupLink
    }
}

async function fetchBackups(domain: string) : Promise<any> {
    /*
    {
  "tenant": "Customer-Chris",
  "application": "Taco",
  "files": [
    "/taco-dev-backup/mongo/2021-02-15_13-34-05.gz.mongodump",
    "/taco-dev-backup/mongo/2021-02-15_12-34-01.gz.mongodump",
    "/taco-dev-backup/mongo/2021-02-15_11-34-03.gz.mongodump",
    "/taco-dev-backup/mongo/2021-02-15_10-34-05.gz.mongodump",
    "/taco-dev-backup/mongo/2021-02-15_09-34-07.gz.mongodump",
    "/taco-dev-backup/mongo/2021-02-15_08-34-10.gz.mongodump",
    "/taco-dev-backup/mongo/2021-02-15_07-34-02.gz.mongodump",
    "/taco-dev-backup/mongo/2021-02-15_06-34-04.gz.mongodump",
    "/taco-dev-backup/mongo/2021-02-15_05-34-07.gz.mongodump",
    "/taco-dev-backup/mongo/2021-02-15_04-34-09.gz.mongodump",
    "/taco-dev-backup/mongo/2021-02-15_03-34-03.gz.mongodump",
    "/taco-dev-backup/mongo/2021-02-15_02-34-06.gz.mongodump",
    "/taco-dev-backup/mongo/2021-02-15_01-34-10.gz.mongodump",
    "/taco-dev-backup/mongo/2021-02-15_00-34-03.gz.mongodump",
    "/taco-dev-backup/mongo/2021-02-14_23-34-06.gz.mongodump",
    "/taco-dev-backup/mongo/2021-02-14_22-34-10.gz.mongodump",
    "/taco-dev-backup/mongo/2021-02-14_21-34-03.gz.mongodump",
    "/taco-dev-backup/mongo/2021-02-14_20-34-07.gz.mongodump",
    "/taco-dev-backup/mongo/2021-02-14_19-34-10.gz.mongodump",
    "/taco-dev-backup/mongo/2021-02-14_18-34-03.gz.mongodump"
  ]
}

*/
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
    /*
    {
  "tenant": "Customer-Chris",
  "application": "Taco",
  "files": [
    "/taco-dev-backup/mongo/2021-02-15_13-34-05.gz.mongodump",
    "/taco-dev-backup/mongo/2021-02-15_12-34-01.gz.mongodump",
    "/taco-dev-backup/mongo/2021-02-15_11-34-03.gz.mongodump",
    "/taco-dev-backup/mongo/2021-02-15_10-34-05.gz.mongodump",
    "/taco-dev-backup/mongo/2021-02-15_09-34-07.gz.mongodump",
    "/taco-dev-backup/mongo/2021-02-15_08-34-10.gz.mongodump",
    "/taco-dev-backup/mongo/2021-02-15_07-34-02.gz.mongodump",
    "/taco-dev-backup/mongo/2021-02-15_06-34-04.gz.mongodump",
    "/taco-dev-backup/mongo/2021-02-15_05-34-07.gz.mongodump",
    "/taco-dev-backup/mongo/2021-02-15_04-34-09.gz.mongodump",
    "/taco-dev-backup/mongo/2021-02-15_03-34-03.gz.mongodump",
    "/taco-dev-backup/mongo/2021-02-15_02-34-06.gz.mongodump",
    "/taco-dev-backup/mongo/2021-02-15_01-34-10.gz.mongodump",
    "/taco-dev-backup/mongo/2021-02-15_00-34-03.gz.mongodump",
    "/taco-dev-backup/mongo/2021-02-14_23-34-06.gz.mongodump",
    "/taco-dev-backup/mongo/2021-02-14_22-34-10.gz.mongodump",
    "/taco-dev-backup/mongo/2021-02-14_21-34-03.gz.mongodump",
    "/taco-dev-backup/mongo/2021-02-14_20-34-07.gz.mongodump",
    "/taco-dev-backup/mongo/2021-02-14_19-34-10.gz.mongodump",
    "/taco-dev-backup/mongo/2021-02-14_18-34-03.gz.mongodump"
  ]
}
*/
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
