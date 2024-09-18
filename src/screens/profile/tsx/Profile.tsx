import React, { useMemo } from 'react';
import { Alert } from 'react-native';

import { useTheme } from 'styled-components';

import Icon from 'src/assets/icons';
import { Container } from 'src/components/containers';
import BaseHeader from 'src/components/headers/Base';
import BaseImage from 'src/components/images/Base';
import { COLORS } from 'src/constants/styles/colors';
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
      <BaseHeader
        title={t('profile.title')}
        icon={
          <Icon
            name="short-arrow"
            direction="left"
            size={scaleByAspectRatio(30)}
            onPress={() => navigation.goBack()}
          />
        }
        flexStyle={styles.flex.header}
        viewStyle={styles.view.header}
        shadowStyle={styles.shadow.header}
        textStyle={styles.text.header}
        extraIcons={[
          <Icon
            key="signout"
            name="signout"
            strokeWidth={1}
            size={scaleByAspectRatio(24)}
            fillColor={COLORS.RED._600}
            color={{
              grads: [COLORS.RED._500, COLORS.RED._500],
              isGradient: true,
            }}
            onPress={handleSignOut}
          />,
        ]}
      />
      <BaseImage
        uri={user?.image}
        icon={
          <Icon
            name="edit"
            size={scaleByAspectRatio(28)}
            fillColor={theme.common.color.primary}
            onPress={() => navigation.navigate(ProfileNavigations.PROFILE_EDIT)}
          />
        }
        imageStyle={styles.image.avatar}
        shadowStyle={styles.shadow.avatar}
      />
    </Container>
  );
};

export default Profile;
