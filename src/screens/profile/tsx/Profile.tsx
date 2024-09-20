import React, { useMemo } from 'react';
import { Alert } from 'react-native';

import { useTheme } from 'styled-components';

import Header from './components/Header';
import Icon from 'src/assets/icons';
import { Container } from 'src/components/containers';
import BaseImage from 'src/components/images/Base';
import { Theme } from 'src/constants/styles/themes';
import { useAuth } from 'src/contexts/auth-context';
import { useI18n } from 'src/contexts/i18n-context';
import {
  ProfileNavigations,
  ProfileScreenNavigation,
} from 'src/navigations/profile/ProfileStackParamList';
import { supabase } from 'src/supabase/supabase';
import { scaleByAspectRatio } from 'src/utils/dimensions';

import { createProfileStyles } from '../styles';

interface ProfileProps {
  navigation: ProfileScreenNavigation;
}

const Profile: React.FC<ProfileProps> = ({ navigation }) => {
  const { setAuthData, user } = useAuth();
  const theme = useTheme() as Theme;
  const { t } = useI18n();
  const styles = useMemo(() => createProfileStyles(theme), [theme]);

  const onSignOut = async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert(t('error.default'), error.message);
    } else {
      setAuthData(null);
    }
  };

  const handleSignOut = (): void => {
    Alert.alert(t('global.confirm'), t('profile.signout?'), [
      {
        text: t('global.cancel'),
        style: 'cancel',
      },
      {
        text: t('global.ok'),
        onPress: onSignOut,
        style: 'destructive',
      },
    ]);
  };

  return (
    <Container flexStyle={styles.flex.container} viewStyle={styles.view.container}>
      <Header
        title={t('profile.title')}
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
