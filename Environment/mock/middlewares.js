// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

exports.logging = (req, res, next) => {
    console.log('Recevied requst for endpoint', req.path);
    next();
};

exports.notImplemented = (req, res) => {
    console.error('Endpoint', req.path, 'is not implemented.');
    res.status(404).end('Not implemented!');
};
