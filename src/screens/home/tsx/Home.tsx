import React, { useMemo } from 'react';

import { useTheme } from 'styled-components/native';

import createHomeStyles from '../styles/home';
import Icon from 'src/assets/icons';
import { Container } from 'src/components/containers';
import BaseHeader from 'src/components/headers/Base';
import BaseImage from 'src/components/images/Base';
import { Theme } from 'src/constants/styles/themes';
import { useAuth } from 'src/contexts/auth-context';
import { useI18n } from 'src/contexts/i18n-context';
import {
  HomeScreenNavigation,
  NavigationRoutes,
} from 'src/navigations/RootStackParamList';
import { scaleByAspectRatio } from 'src/utils/dimensions';

interface HomeProps {
  navigation: HomeScreenNavigation;
}

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const { user } = useAuth();
  const { t } = useI18n();
  const theme = useTheme() as Theme;
  const styles = useMemo(() => createHomeStyles(theme), [theme]);

  return (
    <Container flexStyle={styles.flex.container} viewStyle={styles.view.container}>
      <BaseHeader
        title={t('app.name')}
        icon={
          <Icon
            name="react"
            strokeWidth={0.75}
            size={scaleByAspectRatio(30)}
            animated={{ rotate: true }}
          />
        }
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
            onPress={() => navigation.navigate(NavigationRoutes.NOTIFICATION)}
            fillColor={theme.color.text}
          />,
          <Icon
            key="add-square"
            name="add-square"
            strokeWidth={0}
            size={scaleByAspectRatio(22)}
            onPress={() => navigation.navigate(NavigationRoutes.POST)}
            fillColor={theme.color.text}
          />,
          <BaseImage key="avatar" uri={user?.image} imageStyle={styles.image.avatar} />,
        ]}
      />
    </Container>
  );
};

export default Home;
