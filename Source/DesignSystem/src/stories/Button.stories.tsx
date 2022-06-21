import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from '../components/Button/Button';

export default {
  title: 'Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Filled = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Filled.args = {
  variant: 'filled',
  label: 'Filled Button',
};

export const Text = Template.bind({});
Text.args = {
  variant: 'text',
  label: 'Text Button',
};

export const Outlined = Template.bind({});
Outlined.args = {
  variant: 'outlined',
  label: 'Outlined Button',
};

