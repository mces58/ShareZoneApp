import React, { FC, useMemo } from 'react';

import { useTheme } from 'styled-components/native';

import { useAuth, useI18n } from 'src/contexts';
import { scaleByAspectRatio } from 'src/utils';

import Icon from 'src/assets/icons';
import { Container } from 'src/components/containers';
import { BaseHeader } from 'src/components/headers';
import { BaseImage } from 'src/components/images';
import { Theme } from 'src/constants/styles';
import { ProfileNavigations } from 'src/navigations/profile/ProfileStackParamList';
import {
  HomeScreenNavigation,
  RootNavigations,
} from 'src/navigations/RootStackParamList';

import { createHomeStyles } from '../styles';

interface HomeProps {
  navigation: HomeScreenNavigation;
}

const Home: FC<HomeProps> = ({ navigation }) => {
  const { user } = useAuth();
  const { t } = useI18n();
  const theme = useTheme() as Theme;
  const styles = useMemo(() => createHomeStyles(theme), [theme]);

  return (
    <Container flexStyle={styles.flex.container} viewStyle={styles.view.container}>
      <BaseHeader
        title={t('app.name')}
        icon={<Icon name="react" strokeWidth={0.75} size={scaleByAspectRatio(30)} />}
        flexStyle={styles.flex.header}
        viewStyle={styles.view.header}
        shadowStyle={styles.shadow.header}
        textStyle={styles.text.header}
        extraIcons={[
          <Icon
            key="heart"
            name="heart"
            strokeWidth={0}
            size={scaleByAspectRatio(22)}
            onPress={() => navigation.navigate(RootNavigations.NOTIFICATION)}
            fillColor={theme.color.text}
          />,
          <Icon
            key="add-square"
            name="add-square"
            strokeWidth={0}
            size={scaleByAspectRatio(22)}
            onPress={() => navigation.navigate(RootNavigations.POST)}
            fillColor={theme.color.text}
          />,
          <BaseImage
            key="avatar"
            uri={user?.image}
            imageStyle={styles.image.avatar}
            onPress={() =>
              navigation.navigate(RootNavigations.PROFILE_STACK, {
                screen: ProfileNavigations.PROFILE,
              })
            }
          />,
        ]}
      />
    </Container>
  );
};

export default Home;
