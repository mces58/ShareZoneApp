import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { useTheme } from 'styled-components/native';

import { useI18n } from 'src/contexts';
import {
  getTimeText,
  scaleByAspectRatio,
  scaleHeight,
  scaleProportionally,
  scaleWidth,
} from 'src/utils';

import { Container } from 'src/components/containers';
import { Image } from 'src/components/images';
import { Text } from 'src/components/texts';
import { Theme } from 'src/constants/styles';
import {
  CustomFlexStyle,
  CustomImageStyle,
  CustomTextStyle,
  CustomViewStyle,
  NotificationData,
  PostData,
} from 'src/constants/types';

import { DeleteNotificationFunction, FetchPostsFunction } from '../functions';
import NotificationDetail from './NotificationDetail';

interface NotificationItemProps {
  notification: NotificationData;
}

const NotificationItem: FC<NotificationItemProps> = ({ notification }) => {
  const { t } = useI18n();
  const theme = useTheme() as Theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const timeText = getTimeText(notification.created_at, t);
  const [post, setPost] = useState<PostData | null>(null);
  const [commentId, setCommentId] = useState<string>('');
  const [isPostDetailBottomSheetVisible, setPostDetailBottomSheetVisible] =
    useState<boolean>(false);

  useEffect(() => {
    FetchPostsFunction({ notification, setCommentId, setPost });
  }, []);

  const handleDeleteNotification = useCallback(async (): Promise<void> => {
    setPostDetailBottomSheetVisible(true);
    await DeleteNotificationFunction(notification.id, setPostDetailBottomSheetVisible);
  }, []);

  return (
    <>
      <TouchableOpacity onPress={handleDeleteNotification}>
        <Container flexStyle={styles.flex.card} viewStyle={styles.view.card}>
          <Image uri={notification.sender.image} imageStyle={styles.image.avatar} />
          <Container flexStyle={styles.flex.text}>
            <Text
              text={notification.sender.user_name || 'Unknown User'}
              textStyle={styles.text.userName}
            />
            <Text
              text={t(notification.title, { userName: notification.sender.user_name })}
              textStyle={styles.text.title}
              color={theme.color.textMuted}
            />
          </Container>
          <Container flexStyle={styles.flex.date}>
            <Text
              text={timeText}
              textStyle={styles.text.date}
              color={theme.color.textMuted}
            />
          </Container>
        </Container>
      </TouchableOpacity>
      <NotificationDetail
        commentId={commentId}
        isVisible={isPostDetailBottomSheetVisible}
        onSwipeDown={() => setPostDetailBottomSheetVisible(false)}
        post={post}
        sender={notification.sender}
      />
    </>
  );
};

export default NotificationItem;

const enum FlexStyles {
  CARD = 'card',
  TEXT = 'text',
  DATE = 'date',
}

const enum ImageStyles {
  AVATAR = 'avatar',
}

const enum TextStyles {
  USER_NAME = 'userName',
  TITLE = 'title',
  DATE = 'date',
}

const enum ViewStyles {
  CARD = 'card',
}

const createStyles = (
  theme: Theme
): {
  flex: Record<FlexStyles, CustomFlexStyle>;
  image: Record<ImageStyles, CustomImageStyle>;
  text: Record<TextStyles, CustomTextStyle>;
  view: Record<ViewStyles, CustomViewStyle>;
} => {
  const flex = StyleSheet.create<Record<FlexStyles, CustomFlexStyle>>({
    [FlexStyles.CARD]: {
      width: '95%',
      paddingRight: scaleWidth(20),
      paddingLeft: scaleWidth(10),
      paddingVertical: scaleHeight(15),
      alignSelf: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      gap: scaleProportionally(10),
      borderWidth: 1,
    },
    [FlexStyles.TEXT]: {
      width: '60%',
      justifyContent: 'center',
      gap: scaleProportionally(2),
    },
    [FlexStyles.DATE]: {
      width: '20%',
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
  });

  const image = StyleSheet.create<Record<ImageStyles, CustomImageStyle>>({
    [ImageStyles.AVATAR]: {
      width: scaleByAspectRatio(50),
      height: scaleByAspectRatio(50),
      borderRadius: scaleByAspectRatio(25),
    },
  });

  const text = StyleSheet.create<Record<TextStyles, CustomTextStyle>>({
    [TextStyles.USER_NAME]: {
      fontSize: theme.common.font.sizes._18,
      fontFamily: theme.common.font.families.bold,
    },
    [TextStyles.TITLE]: {
      fontSize: theme.common.font.sizes._14,
      fontFamily: theme.common.font.families.regular,
      fontStyle: 'italic',
    },
    [TextStyles.DATE]: {
      fontSize: theme.common.font.sizes._12,
      fontFamily: theme.common.font.families.medium,
      textAlign: 'right',
    },
  });

  const view = StyleSheet.create<Record<ViewStyles, CustomViewStyle>>({
    [ViewStyles.CARD]: {
      backgroundColor: theme.color.card,
      borderRadius: scaleProportionally(15),
      borderColor: theme.color.border,
    },
  });

  return { flex, image, text, view };
};
