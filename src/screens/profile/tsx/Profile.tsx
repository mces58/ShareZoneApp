import React, { useCallback, useMemo } from 'react';

import { useAuth, useI18n } from 'src/contexts';
import { scaleByAspectRatio } from 'src/utils';
import { useTheme } from 'styled-components';

import Icon from 'src/assets/icons';
import { Container } from 'src/components/containers';
import { BaseImage } from 'src/components/images';
import { Theme } from 'src/constants/styles';
import {
  ProfileNavigations,
  ProfileScreenNavigation,
} from 'src/navigations/profile/ProfileStackParamList';

import { Header } from '../components';
import { SignoutFunction } from '../functions';
import { createProfileStyles } from '../styles';

interface ProfileProps {
  navigation: ProfileScreenNavigation;
}

const Profile: React.FC<ProfileProps> = ({ navigation }) => {
  const { setAuthData, user } = useAuth();
  const theme = useTheme() as Theme;
  const { t } = useI18n();
  const styles = useMemo(() => createProfileStyles(theme), [theme]);

  const handleSignOut = useCallback((): void => {
    SignoutFunction({ setAuthData, t });
  }, []);

  return (
    <Container flexStyle={styles.flex.container} viewStyle={styles.view.container}>
      <Header
        title={t('profile.title')}
        theme={theme}
        onPressHeaderIcon={() => navigation.goBack()}
        onPressExtraHeaderIcon={handleSignOut}
      />
      <BaseImage
        uri={user?.image}
        icon={
          <Icon
            name="edit"
            size={scaleByAspectRatio(30)}
            color={{ mono: theme.color.background }}
            fillColor={theme.color.text}
            onPress={() => navigation.navigate(ProfileNavigations.PROFILE_EDIT)}
          />
        }
        imageStyle={styles.image.avatar}
        shadowStyle={styles.shadow.small}
      />
    </Container>
  );
};

export default Profile;
