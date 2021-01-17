// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import React from 'react';
import { FeatureNavigationLinkProps } from './FeatureNavigationLink';
import { FeatureNavigationLinksViewModel } from './FeatureNavigationLinksViewModel';
import { withViewModel } from '@dolittle/vanir-react';
import { Link } from './Link';

export interface FeatureNavigationLinksProps {
    children?: React.ReactElement<FeatureNavigationLinkProps>[] | React.ReactElement<FeatureNavigationLinkProps>;
}

export const FeatureNavigationLinks = withViewModel<FeatureNavigationLinksViewModel, FeatureNavigationLinksProps>(FeatureNavigationLinksViewModel, ({ viewModel, props }) => {
    if (props.children) {
        let links: Link[];
        if (Array.isArray(props.children)) {
            links = props.children.map(_ => _.props as Link);
        } else {
            links = [props.children.props as Link];
        }
        console.log(links);
        viewModel.definition.setLinks(links);
    }

    return (<></>);
});
