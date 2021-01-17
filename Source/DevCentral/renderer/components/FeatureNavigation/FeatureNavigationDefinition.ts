// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { BehaviorSubject } from 'rxjs';
import { Link } from './Link';
import { singleton, injectable } from 'tsyringe';

@singleton()
@injectable()
export class FeatureNavigationDefinition {
    readonly current: BehaviorSubject<Link[]> = new BehaviorSubject<Link[]>([]);

    setLinks(links: Link[]) {
        this.current.next(links);
    }
}
