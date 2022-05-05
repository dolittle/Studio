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

export type Tag = {
    name: string;
};

export type ContainerRegistryTags = {
    name: string,
    tags: Tag[]
};

export type HTTPResponseTags = {
    name: string,
    tags: string[]
};

export async function getTagsInContainerRegistry(applicationId: string, image: string): Promise<ContainerRegistryTags> {
    const url = `${getServerUrlPrefix()}/application/${applicationId}/containerregistry/tags/${image}`;

    const result = await fetch(
        url,
        {
            method: 'GET',
            mode: 'cors'
        });
    const jsonResult = await result.json() as HTTPResponseTags;
    const items = jsonResult.tags.map(n => {
        return {
            name: n
        };
    });

    return {
        name: image,
        tags: items,
    };
}

export async function getReposInContainerRegistry(applicationId: string): Promise<ContainerRegistryImages> {
    const url = `${getServerUrlPrefix()}/application/${applicationId}/containerregistry/images`;

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
