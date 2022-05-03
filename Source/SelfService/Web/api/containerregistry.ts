// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Image } from '@fluentui/react';
import { getServerUrlPrefix } from './api';


export type HTTPResponseImages = {
    url: string,
    images: string[]
};

export type ContainerRegistryImages = {
    url: string,
    images: Image[]
};

export type Image = {
    name: string;
};

export async function getReposInContainerRegistry(): Promise<ContainerRegistryImages> {
    const url = `${getServerUrlPrefix()}/containerregistry/images`;

    const result = await fetch(
        url,
        {
            method: 'GET',
            mode: 'cors'
        });
    const jsonResult = await result.json() as HTTPResponseImages;
    const theResult = jsonResult.images.map(n => {
        return {
            name: n
        };
    });
    return {
        url: jsonResult.url,
        images: theResult
    };
}
