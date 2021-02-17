// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { DataSource, Navigation, NavigationGroup, NavigationItem, IMessenger } from '@dolittle/vanir-web';
import { injectable } from 'tsyringe';
import { ObservableQuery, NetworkStatus } from 'apollo-client';
import gql from 'graphql-tag';
import { ApplicationForListing, CustomerApplication } from './ApplicationForListing';
import { routes } from './routing';
import { NavigatedTo } from '@dolittle/vanir-web/dist/routing';
import { RouteInfo } from '@dolittle/vanir-react';
import { Guid } from '@dolittle/rudiments';
import { BackupLink, BackupsForApplication, BackupForListing } from './BackupForListing';
import { Tenant } from './Tenant';

@injectable()
export class AppViewModel {
    // TODO change this name
    applications: ApplicationForListing = <ApplicationForListing>{};
    backups: BackupForListing[] = [];

    constructor(
        private readonly _navigation: Navigation,
        private readonly _messenger: IMessenger,
        private readonly _dataSource: DataSource) {
        _messenger.subscribeTo(NavigatedTo, _ => {
            // TODO removed code about uri filtering for no
            this.applications =<ApplicationForListing>{};
            this.backups = [];
        });
    }

    attached() {
        this.getApplicationList();
    }

    routeChanged(routeInfo: RouteInfo) {
    }


    async populateBackupsFor(application: string, environment: string) {
        // Get me the latest
        const query = gql`
            query {
                allBackupsForListing(application: "${application}" environment: "${environment}") {
                    tenant
                    application
                    environment
                    files
                }
            }
        `;

        const result = await this._dataSource.query<AllBackupsForListingQuery>({ query, fetchPolicy: 'no-cache'});
        const backupApplication  = result.data.allBackupsForListing;

        this.backups = backupApplication.files.map<BackupForListing>(file => {
            const parts = file.split('/');
            const when: string = parts[parts.length-1].replace('.gz.mongodump', '');

            return {
                tenant: backupApplication.tenant,
                application: backupApplication.application,
                environment: backupApplication.environment,
                file,
                when,
            };
        });
    }

    async getBackupLink(input: BackupForListing): Promise<BackupLink>{
        // Get me the latest
        const query = gql`
            query {
                getBackupLink(application: "${input.application}" environment: "${input.environment}" file_path: "${input.file}") {
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
                        id
                        name
                    }
                    applications {
                        id
                        name
                        environment
                    }
                }
            }
        `;

        const result = await this._dataSource.query<AllApplicationsForListingQuery>({ query, fetchPolicy: 'no-cache' });
        this.applications = result.data.allApplicationsForListing;
        this._populateNavigation();
    }

    private async _populateNavigation() {
        const navigationItems = [{
            name: this.applications.tenant.name,
            items: this.applications.applications as NavigationItem[]
        } as NavigationGroup];
        this._navigation.set(navigationItems ?? []);
    }
}

type AllBackupsForListingQuery = {
    allBackupsForListing: BackupsForApplication;
};

type AllApplicationsForListingQuery = {
    allApplicationsForListing: ApplicationForListing;
};


type GetBackupLinkQuery = {
    getBackupLink: BackupLink;
};


