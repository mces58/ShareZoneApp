import React from 'react';
import { LogBox, StyleSheet, View } from 'react-native';

import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';

import Button from './Button';

LogBox.ignoreLogs(['TextType']);

interface ButtonProps {
  onPress?: () => void;
  title?: string;
}

const meta: Meta<ButtonProps> = {
  title: 'components/Button',
  component: Button,
  argTypes: {
    onPress: { action: 'pressed' },
    title: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<ButtonProps>;

export const Basic: Story = {
  render: (args) => (
    <View style={styles.centeredContainer}>
      <Button {...args} />
    </View>
  ),
  args: {
    onPress: action('Button Pressed'),
    title: 'Click Me',
  },
};

export const WithCustomAction: Story = {
  render: (args) => (
    <View style={styles.centeredContainer}>
      <Button {...args} />
    </View>
  ),
  args: {
    onPress: () => alert('Custom action!'),
    title: 'Press Here',
  },
};

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
