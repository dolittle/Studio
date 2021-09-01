// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Router } from 'express';
import { IControllers } from '../controllers';

/**
 * The API endpoint routes to register on an HTTP server.
 */
export class Routes {
    constructor(private readonly _controller: IControllers) { }

    /**
     * Registers the API routes on the provided router.
     * @param router The {@link Router} to register routes on.
     */
    registerRoutes(router: Router) {
        // router.get('/purchaseorders', this._controller.getAllBySupplierId.bind(this._controller));
        // router.get(
        //     '/purchaseorders/:orderNumber',
        //     this._controller.getPurchaseOrderByOrderNumberAndSupplierId.bind(this._controller)
        // );
    }
}
