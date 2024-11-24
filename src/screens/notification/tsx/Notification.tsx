import React, { FC, useEffect, useMemo, useState } from 'react';

import { useTheme } from 'styled-components/native';

import { useAuth, useI18n } from 'src/contexts';

import { Container, Scroll } from 'src/components/containers';
import { Text } from 'src/components/texts';
import { Theme } from 'src/constants/styles';
import { NotificationData } from 'src/constants/types';
import { NotificationScreenNavigation } from 'src/navigations/RootStackParamList';

import { NotificationItem, SubHeader } from '../components';
import { FetchNotificationsFunction } from '../functions';
import { createNotificationStyles } from '../styles';

interface NotificationProps {
  navigation: NotificationScreenNavigation;
}

const Notification: FC<NotificationProps> = ({ navigation }) => {
  const { user } = useAuth();
  const { t } = useI18n();
  const theme = useTheme() as Theme;
  const styles = useMemo(() => createNotificationStyles(theme), [theme]);
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  useEffect(() => {
    if (user?.id) FetchNotificationsFunction({ setNotifications, user: { id: user.id } });
  }, []);

  return (
    <Scroll>
      <Container flexStyle={styles.flex.container} viewStyle={styles.view.container}>
        <SubHeader
          title={t('screens.notifications.title')}
          theme={theme}
          onPressHeaderIcon={() => navigation.goBack()}
        />
        {notifications.length === 0 ? (
          <Text
            text={t('screens.notifications.noNotifications')}
            textStyle={styles.text.notFound}
          />
        ) : (
          notifications.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} />
          ))
        )}
      </Container>
    </Scroll>
  );
};

export default Notification;
