// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { createElement, ComponentProps, JSXElementConstructor } from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

type Component = JSXElementConstructor<any>;
type StoryArgs<TComponent extends Component> = Partial<ComponentProps<TComponent>>;

/**
 * Defines a factory for creating Storybook Stories from a React Component.
 */
export type ComponentStories<TComponent extends Component> = {
    /**
     * The Storybook metadata that should be used as the 'default' export of a '*.stories.tsx' file.
     */
    metadata: ComponentMeta<TComponent>;

    /**
     * The factory to be used to create a Storybook Story instances for the component.
     */
    createStory: (args?: StoryArgs<TComponent>) => ComponentStory<TComponent>;
};

/**
 * Creates a new {@link ComponentStories} factory for creating stories from the provided component.
 * @param component The React Component to create a factory for.
 * @returns A {@link ComponentStories} factory that can be used to creat stories from the component.
 */
export const componentStories = <TComponent extends Component>(component: TComponent): ComponentStories<TComponent> => {
    const metadata: ComponentMeta<TComponent> = {
        component,
    };

    const template: ComponentStory<TComponent> = (props) => createElement(component, props);

    const createStory = (args?: StoryArgs<TComponent>) => {
        const story = template.bind({});
        story.args = args;
        return story;
    };

    return { metadata, createStory };
};

export default componentStories;
