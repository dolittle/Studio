// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { Config } from '@svgr/core';
import SvgrLoader from '@svgr/webpack';
import path from 'path';
import type { LoaderDefinitionFunction, LoaderContext } from 'webpack';

import { template } from './template';

export const loader: LoaderDefinitionFunction<Config> = function (contents) {
    const that = Object.create(this) as LoaderContext<Config>;

    that.getOptions = (schema?) => {
        const options = this.getOptions.call(this, schema);

        options.template = options.template ?? template;

        const jsx = options.jsx = options.jsx ?? {};
        const babel = jsx.babelConfig = jsx.babelConfig ?? {};
        const plugins = babel.plugins = babel.plugins ?? [];
        plugins.unshift(path.resolve(__dirname, '..', 'svgr', 'convert-svg-to-box-plugin.js'));

        return options;
    };

    return SvgrLoader.call(that, contents);
};

export default loader;
