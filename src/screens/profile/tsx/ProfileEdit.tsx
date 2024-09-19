import React, { useMemo } from 'react';

import { useTheme } from 'styled-components/native';

import Icon from 'src/assets/icons';
import { Container } from 'src/components/containers';
import BaseHeader from 'src/components/headers/Base';
import { Theme } from 'src/constants/styles/themes';
import { useI18n } from 'src/contexts/i18n-context';
import { ProfileEditScreenNavigation } from 'src/navigations/profile/ProfileStackParamList';
import { scaleByAspectRatio } from 'src/utils/dimensions';

import { createProfileEditStyles } from '../styles';

interface ProfileEditProps {
  navigation: ProfileEditScreenNavigation;
}

const ProfileEdit: React.FC<ProfileEditProps> = ({ navigation }) => {
  const theme = useTheme() as Theme;
  const { t } = useI18n();
  const styles = useMemo(() => createProfileEditStyles(theme), [theme]);

  return (
    <Container flexStyle={styles.flex.container} viewStyle={styles.view.container}>
      <BaseHeader
        title={t('profileEdit.title')}
        icon={
          <Icon
            name="short-arrow"
            direction="left"
            size={scaleByAspectRatio(26)}
            onPress={() => navigation.goBack()}
          />
        }
        flexStyle={styles.flex.header}
        viewStyle={styles.view.header}
        shadowStyle={styles.shadow.header}
        textStyle={styles.text.header}
      />
    </Container>
  );
};

export default ProfileEdit;
