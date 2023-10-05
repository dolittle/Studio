// Copyright (c) Aigonix. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { createElement, useRef, ComponentProps, JSXElementConstructor } from 'react';

import { ArgTypes, ComponentMeta, ComponentStory, DecoratorFn } from '@storybook/react';

type Component = JSXElementConstructor<any>;

type StoryArgs<TComponent extends Component> = Partial<ComponentProps<TComponent>>;

type ComponentStoryActions<TComponent extends Component> = Partial<{
    [prop in keyof ComponentProps<TComponent>]: string;
}>;

type Decorator = DecoratorFn;

type ComponentStoryConfig<TComponent extends Component> = {
    /**
     * Optional callbacks to capture in Storybook Actions addons.
     * Set props to event name strings to make them appear in the Actions tab in Storybook.
     */
    actions?: ComponentStoryActions<TComponent>;

    /**
     * An optional decorator to wrap the story in.
     * This is useful if the component requires e.g. a React context to work properly.
     */
    decorator?: Decorator;

    /**
     * An optional factory to create props that will override the args on a component.
     * This factory will be called once - every time the Story is created.
     * This is useful if some props require special types that cannot be provided through the Storybook UI.
     */
    overridePropsWith?: () => StoryArgs<TComponent>;
};

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
export const componentStories = <TComponent extends Component>(component: TComponent, config?: ComponentStoryConfig<TComponent>): ComponentStories<TComponent> => {
    const argTypes: Partial<ArgTypes<ComponentProps<TComponent>>> = {};

    addActionsToArgTypes(argTypes, config?.actions);

    const decorators = config?.decorator !== undefined ? [config.decorator] : [];

    const metadata: ComponentMeta<TComponent> = {
        component,
        argTypes,
        decorators,
    };

    const template: ComponentStory<TComponent> = (props) => {
        const overrides = useRef<StoryArgs<TComponent>>();
        if (overrides.current === undefined) {
            overrides.current = config?.overridePropsWith?.() || {};
        }

        const propsWithOverrides = { ...props, ...overrides.current };

        return createElement(
            component,
            propsWithOverrides,
        );
    };

    const createStory = (args?: StoryArgs<TComponent>) => {
        const story = template.bind({});
        story.args = args;
        return story;
    };

    return { metadata, createStory };
};

export default componentStories;

const addActionsToArgTypes = <TComponent extends Component>(argTypes: Partial<ArgTypes<ComponentProps<TComponent>>>, actions?: ComponentStoryActions<TComponent>) => {
    for (const prop in actions) {
        argTypes[prop] = { action: actions[prop] };
    }
};
