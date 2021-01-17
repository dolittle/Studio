// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Subscription } from 'rxjs';
import { Application } from '@dolittle/vanir-common';
import { injectable, inject } from 'tsyringe';
import { IApplications, IApplicationsToken } from '../../../common/applications/IApplications';
import { Workspace } from '../../../common/workspaces/Workspace';
import { FeatureNavigationDefinition, Link, ToolbarItem, ToolbarItems } from '../../components';
import { Globals } from '../../Globals';
import { ApplicationState, RunState } from '../../../common/applications';
import { ApplicationProps } from './ApplicationProps';
import { RouteInfo } from '@dolittle/vanir-react';

/* eslint-disable no-restricted-globals */
@injectable()
export class ApplicationViewModel {
    private _baseUrl: string = '';
    private _workspace?: Workspace;
    private _application?: Application;

    private _applicationStateSubscription?: Subscription;
    private _applicationState: ApplicationState = { id: '', state: RunState.unknown };

    constructor(
        @inject(IApplicationsToken) private readonly _applications: IApplications,
        private readonly _navigation: FeatureNavigationDefinition,
        private readonly _toolbarItems: ToolbarItems,
        private readonly _globals: Globals) {
    }

    attached(routeInfo: RouteInfo) {
        this._baseUrl = routeInfo.matchedUrl;
    }

    detached() {
        this.cleanupSubscriptions();
    }

    routeChanged(routeInfo: RouteInfo) {
        if (routeInfo.isExactMatch) {
            this.setTitle();
            this.setToolbarAndLinks();
        }
    }

    propsChanged(props: ApplicationProps) {
        if (this._workspace?.id !== props.workspace.id) {
            this._workspace = props.workspace;
            this._application = props.workspace.application;

            this.setTitle();

            this.cleanupSubscriptions();

            this._applicationStateSubscription = this._globals.applicationStateFor(this._application).subscribe(_ => {
                this._applicationState = _;
                this.setToolbarAndLinks();
            });
        }
    }

    private setTitle() {
        this._globals.setTitle(`${this._application.name}`);
    }

    async start() {
        this._applications.start(this._workspace!.path, this._application!);
    }

    async stop() {
        this._applications.stop(this._workspace!.path, this._application!);
    }

    private setToolbarAndLinks() {
        const items: ToolbarItem[] = [];
        const links: Link[] = [];
        const startItem: ToolbarItem = { name: 'Start', icon: 'MSNVideosSolid', onClick: () => this.start() };
        const stopItem: ToolbarItem = { name: 'Stop', icon: 'CircleStopSolid', onClick: () => this.stop() };

        links.push({ name: 'Overview', link: `${this._baseUrl}/overview` });

        switch (this._applicationState.state) {
            case RunState.unknown:
            case RunState.stopped:
            case RunState.stopping: {
                items.push(startItem);
            } break;

            case RunState.partial: {
                items.push(startItem);
                items.push(stopItem);
            } break;

            case RunState.starting:
            case RunState.running: {
                items.push(stopItem);
                links.push({ name: 'Mongo', link: `${this._baseUrl}/mongo` });
                links.push({ name: 'Ingress', link: `${this._baseUrl}/ingress` });
            } break;
        }

        this._toolbarItems.setItems(items);
        this._navigation.setLinks(links);
    }

    private cleanupSubscriptions() {
        if (this._applicationStateSubscription) {
            this._applicationStateSubscription.unsubscribe();
        }
    }
}
