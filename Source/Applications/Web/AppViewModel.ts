// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Navigation, NavigationGroup } from '@shared/portal';
import { DataSource } from '@shared/web';
import { injectable } from 'tsyringe';
import { ApplicationModel } from './ApplicationModel';
import { ObservableQuery, NetworkStatus } from 'apollo-client';
import gql from 'graphql-tag';

type AllApplicationsQuery = {
    allApplications: ApplicationModel[];
};


@injectable()
export class AppViewModel {
    selectedApplication?: ApplicationModel;

    private _observableQuery?: ObservableQuery;
    applications: ApplicationModel[] = [];
    handleNavbarActionButtonTriggered?: () => void;

    constructor(
        private readonly _navigation: Navigation,
        private readonly _dataSource: DataSource) { }

    activate() {
        this._getApplicationList();
    }

    private async _getApplicationList() {
        const query = gql`
            query {
                allApplications {
                    id
                    name
                }
            }
        `;

        this._observableQuery = this._dataSource.watchQuery<AllApplicationsQuery>({
            query,
        });

        this._observableQuery.subscribe((next) => {
            if (next.networkStatus === NetworkStatus.ready && next.data) {
                this.applications = next.data.allApplications;
                this._populateNavigation();
            }
        });
    }

    private async _populateNavigation() {
        const navigationItems = this.applications?.map(
            (app) => ({ name: app.name, items: [{ name: 'Default' }] } as NavigationGroup)
        );

        this._navigation.set(navigationItems ?? []);
    }

}

