// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { injectable } from 'tsyringe';
import { DataSource, IMessenger, NavigationStructureChanged, NavigationGroup } from '@dolittle/vanir-web';
import gql from 'graphql-tag';
import { Guid } from '@dolittle/rudiments';
import { RouteInfo } from '@dolittle/vanir-react';
import { NavigationGroupClicked, ToolbarItem, ToolbarItems } from '@shared/portal';

export type Application = {
    id: string;
    name: string;
};

export type AllApplicationsResult = {
    applications: {
        allApplications: Application[];
    }
};


@injectable()
export class ApplicationsViewModel {

    createMicroserviceCallback!: () => void;

    constructor(
        private readonly _dataSource: DataSource,
        private readonly _messenger: IMessenger,
        private readonly _toolbarItems: ToolbarItems) {
        _messenger.subscribeTo(NavigationGroupClicked, (message) => {
            _toolbarItems.setItems([
                new ToolbarItem(
                    'Create Microservice',
                    'Add',
                    () => {
                        this.createMicroserviceCallback?.();
                    }
                )
            ]);
        });
    }

    attached(routeInfo: RouteInfo) {
        this.populateNavigation();
    }

    async createApplication(name: string) {
        const mutation = gql`
            mutation {
                applications {
                    createApplication(command: {
                        applicationId: "${Guid.create().toString()}"
                        name: "${name}"
                    })
                }
            }
        `;

        const result = await this._dataSource.mutate({ mutation });

        setTimeout(() => {
            this.populateNavigation();
        }, 500);
    }


    private async populateNavigation() {
        const query = gql`
            query {
                applications {
                    allApplications {
                        id,
                        name
                    }
                }
            }
        `;

        const result = await this._dataSource.query<AllApplicationsResult>({ query, fetchPolicy: 'no-cache' });
        const message = new NavigationStructureChanged();
        message.groups = result.data.applications.allApplications.map(_ => {
            return {
                name: _.name,
                items: []
            } as NavigationGroup;
        });
        this._messenger.publish(message);
    }
}
