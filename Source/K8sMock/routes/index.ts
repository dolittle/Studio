// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import express from 'express';
import PingController from './Ping';

const router = express.Router();

router.get('/api/k8s/ping', async (req, res) => {
    const controller = new PingController();
    const response = await controller.getMessage();
    return res.send(response);
});

export default router;