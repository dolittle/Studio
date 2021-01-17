// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { container } from 'tsyringe';
import { IFileSystem } from './IFileSystem';
import { FileSystem } from './FileSystem';
import { constructor } from '@dolittle/vanir-dependency-inversion';


const toPascalCase = function (input: string): string {
    return input.replace(/(\w)(\w*)/g,
        function (g0, g1, g2) { return g1.toUpperCase() + g2.toLowerCase(); });
};

export class Configuration {
    static configure() {
        container.registerSingleton(IFileSystem as constructor<IFileSystem>, FileSystem);
    }

    private static configureHandlebars() {
        Handlebars.registerHelper('lowerCase', (value: string) => value.toLowerCase());
        Handlebars.registerHelper('upperCase', (value: string) => value.toUpperCase());
        Handlebars.registerHelper('pascalCase', (value: string) => toPascalCase(value));
        Handlebars.registerHelper('inc', (value: string) => parseInt(value) + 1);
    }
}
