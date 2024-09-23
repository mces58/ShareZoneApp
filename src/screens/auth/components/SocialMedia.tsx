import React, { useMemo } from 'react';
import { Linking, StyleSheet } from 'react-native';

import { scaleByAspectRatio, scaleProportionally } from 'src/utils';

import Icon from 'src/assets/icons';
import { Container } from 'src/components/containers';
import { BaseText } from 'src/components/texts';
import { Theme } from 'src/constants/styles';
import { CustomFlexStyle, CustomTextStyle } from 'src/constants/types';

interface SocialMediaProps {
  text: string;
  theme: Theme;
}

const SocialMedia: React.FC<SocialMediaProps> = ({ text, theme }) => {
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <Container flexStyle={styles.flex.follow}>
      <BaseText text={text + ':'} textStyle={styles.text.follow} />
      <Icon
        name="github"
        size={scaleByAspectRatio(18)}
        color={{ isGradient: true, grads: theme.common.color.defaultGradient1 }}
        onPress={() => Linking.openURL('https://github.com/mces58')}
      />
      <Icon
        name="instagram"
        size={scaleByAspectRatio(18)}
        color={{
          isGradient: true,
          grads: theme.common.color.defaultGradient1,
        }}
        onPress={() => Linking.openURL('https://www.instagram.com/mces58')}
      />
      <Icon
        name="linkedin"
        size={scaleByAspectRatio(18)}
        color={{ isGradient: true, grads: theme.common.color.defaultGradient1 }}
        onPress={() => Linking.openURL('https://www.linkedin.com/in/mces58')}
      />
    </Container>
  );
};

export default SocialMedia;

const enum StyleNames {
  FOLLOW = 'follow',
}

const createStyles = (
  theme: Theme
): {
  flex: Record<StyleNames, CustomFlexStyle>;
  text: Record<StyleNames, CustomTextStyle>;
} => {
  const flex = StyleSheet.create<Record<StyleNames, CustomFlexStyle>>({
    [StyleNames.FOLLOW]: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: scaleProportionally(5),
    },
  });

  const text = StyleSheet.create<Record<StyleNames, CustomTextStyle>>({
    [StyleNames.FOLLOW]: {
      fontFamily: theme.common.font.families.bold,
      fontSize: theme.common.font.sizes._16,
    },
  });

  return { flex, text };
};
