// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { DataSource, Navigation, NavigationGroup } from '@dolittle/vanir-web';
import { injectable } from 'tsyringe';
import { ObservableQuery, NetworkStatus } from 'apollo-client';
import gql from 'graphql-tag';
import { ApplicationForListing } from './ApplicationForListing';
import { routes } from './routing';

@injectable()
export class AppViewModel {
    selectedApplication?: ApplicationForListing;

    private _observableQuery?: ObservableQuery<AllApplicationsForListingQuery>;
    applications: ApplicationForListing[] = [];
    handleNavbarActionButtonTriggered?: () => void;

    constructor(
        private readonly _navigation: Navigation,
        private readonly _dataSource: DataSource) {
    }

    attached() {
        this._getApplicationList();
    }

    private async _getApplicationList() {
        const query = gql`
            query {
                allApplicationsForListing {
                    id
                    name
                    microservices {
                        id
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
                this._populateNavigation();
            }
        });
    }

    private async _populateNavigation() {
        const navigationItems = this.applications?.map(
            (app) =>
            ({
                name: app.name,
                items: app.microservices.map((ms) => ({
                    name: ms.name,
                    path: `/applications${routes.microserviceDetails.generate({ applicationId: app.id.toString(), microserviceId: ms.id.toString() })}`
                })),

            } as NavigationGroup)
        );

        this._navigation.set(navigationItems ?? []);
    }
}

type AllApplicationsForListingQuery = {
    allApplicationsForListing: ApplicationForListing[];
};
