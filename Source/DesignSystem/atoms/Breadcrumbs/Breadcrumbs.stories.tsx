// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';

import { ComponentMeta } from '@storybook/react';

import { Breadcrumbs } from '../../index';

import { Content, Router } from '../../helpers/ReactRouter';
import { DummyBreadcrumbs, DummyListMenu } from './DummyBreadcrumbs';

export default {
    title: 'Breadcrumbs',
    component: Breadcrumbs,
} as ComponentMeta<typeof Breadcrumbs>;

export const Default = () =>
    <Router initialPath='/breadcrumb-1/breadcrumb-2/breadcrumb-3/breadcrumb-4'>
        <DummyBreadcrumbs />
        <Content />
        <DummyListMenu />
    </Router>;
