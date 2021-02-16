// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { DataSource, Navigation, NavigationGroup, IMessenger } from '@dolittle/vanir-web';
import { injectable } from 'tsyringe';
import { ObservableQuery, NetworkStatus } from 'apollo-client';
import gql from 'graphql-tag';
import { ApplicationForListing } from './ApplicationForListing';
import { routes } from './routing';
import { NavigatedTo } from '@dolittle/vanir-web/dist/routing';
import { RouteInfo } from '@dolittle/vanir-react';
import { Guid } from '@dolittle/rudiments';
import { BackupLink, BackupsForApplication, BackupForListing } from './BackupForListing';
import { Tenant } from './Tenant';

@injectable()
export class AppViewModel {
    private _applicationId: Guid = Guid.empty;
    private _microservice: string = '';

    private _observableQuery?: ObservableQuery<AllApplicationsForListingQuery>;
    applications: ApplicationForListing[] = [];
    backups: BackupForListing[] = [];
    tenants: Tenant[] = [];

    constructor(
        private readonly _navigation: Navigation,
        private readonly _messenger: IMessenger,
        private readonly _dataSource: DataSource) {
        _messenger.subscribeTo(NavigatedTo, _ => {
            const segments = _.path.split('/').filter(_ => _.length > 0);
            this._applicationId = Guid.parse(segments[1]);
            this._microservice = segments[3];
            //this.tenants = [];
            //this.populateTenants();
            this.backups = [];
        });
    }

    attached() {
        this.getApplicationList();
    }

    routeChanged(routeInfo: RouteInfo) {
    }


    async populateBackupsFor(tenant: string, application: string) {
        // Get me the latest
        const query = gql`
            query {
                allBackupsForListing(tenant: "${tenant}" application: "${application}") {
                    tenant
                    application
                    files
                }
            }
        `;

        const result = await this._dataSource.query<AllBackupsForListingQuery>({ query });

        let backupApplication  = result.data.allBackupsForListing;

        this.backups = backupApplication.files.map<BackupForListing>(file => {
            let parts = file.split("/");
            let when:string = parts[parts.length-1].replace(".gz.mongodump", "");

            return {
                tenant: backupApplication.tenant,
                application: backupApplication.application,
                file: file,
                when,
            };
        });
    }

    async getBackupLink(input: BackupForListing): Promise<BackupLink>{
        // Get me the latest
        const query = gql`
            query {
                getBackupLink(tenant: "${input.tenant}" application: "${input.application}" file_path: "${input.file}") {
                    tenant
                    application
                    url
                    expire
                }
            }
        `;

        const result = await this._dataSource.query<GetBackupLinkQuery>({ query });
        return  result.data.getBackupLink;
    }

    private async getApplicationList() {
        const query = gql`
            query {
                allApplicationsForListing {
                    tenant {
                        name
                    }

                    applications {
                        name
                    }

                    domains {
                        name
                    }
                }
            }
        `;

        this._observableQuery = this._dataSource.watchQuery<AllApplicationsForListingQuery>({
            query,
        });

        this._observableQuery?.subscribe((next) => {
            if (next.networkStatus === NetworkStatus.ready && next.data) {
                this.applications = next.data.allApplicationsForListing;
                this.tenants = this.applications.map(customer => {
                    let tenant: Tenant = {
                        name: customer.tenant.name,
                    }
                    return tenant;
                });
                this._populateNavigation();
            }
        });
    }

    private async _populateNavigation() {
        const navigationItems = this.applications?.map(
            (app) =>
            ({
                name: app.tenant.name,
                items: app.applications.map((ms) => ({
                    name: ms.name,
                    //path: `/applications${routes.microserviceDetails.generate({ applicationId: app.id.toString(), microserviceId: ms.id.toString() })}`
                })),

            } as NavigationGroup)
        );

        this._navigation.set(navigationItems ?? []);
    }
}

type AllTenantsForMicroservice = {
    allTenantsForMicroservice: Tenant[];
};

type AllBackupsForListingQuery = {
    allBackupsForListing: BackupsForApplication;
};

type AllApplicationsForListingQuery = {
    allApplicationsForListing: ApplicationForListing[];
};


type GetBackupLinkQuery = {
    getBackupLink: BackupLink;
};


