import React from 'react';
import { View } from 'react-native';

import type { Meta, StoryObj } from '@storybook/react';

import Card from '../../src/components/Card';

const CardMeta: Meta<typeof Card> = {
  title: 'Card',
  component: Card,
  args: {
    title: 'Default Title',
    description: 'This is a default description.',
    imageUrl: 'https://placehold.it/300',
  },
  decorators: [
    (Story) => (
      <View
        style={{ padding: 20, alignItems: 'center', justifyContent: 'center', flex: 1 }}
      >
        <Story />
      </View>
    ),
  ],
};

export default CardMeta;

export const Basic: StoryObj<typeof Card> = {};

export const WithCustomContent: StoryObj<typeof Card> = {
  args: {
    title: 'Custom Title',
    description: 'This is a custom description for the Card component.',
    imageUrl:
      'https://i0.wp.com/picjumbo.com/wp-content/uploads/pure-nature-landscape-single-tree-in-green-field-free-photo.jpg?w=600&quality=80',
  },
};
