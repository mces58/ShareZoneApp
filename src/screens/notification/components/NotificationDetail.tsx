import React, { FC, useMemo } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';

import { useTheme } from 'styled-components/native';

import { useAuth, useI18n } from 'src/contexts';
import { scaleHeight, scaleProportionally } from 'src/utils';

import { BottomSheet } from 'src/components/bottom-sheets';
import { Container, Scroll } from 'src/components/containers';
import { Text } from 'src/components/texts';
import { Theme } from 'src/constants/styles';
import {
  CustomFlexStyle,
  CustomTextStyle,
  CustomViewStyle,
  PostData,
  User,
} from 'src/constants/types';

import CommentBubble from './CommentBubble';
import PostCard from './PostCard';

interface NotificationDetailProps {
  commentId: string;
  isVisible: boolean;
  onSwipeDown: () => void;
  post: PostData | null;
  sender: User;
}

const NotificationDetail: FC<NotificationDetailProps> = ({
  commentId,
  isVisible,
  onSwipeDown,
  post,
  sender,
}) => {
  const { user } = useAuth();
  const { t } = useI18n();
  const { height } = useWindowDimensions();
  const theme = useTheme() as Theme;
  const styles = useMemo(() => createStyles(theme), [theme]);

  const content = (
    <Scroll>
      <Container flexStyle={styles.flex.container} viewStyle={styles.view.container}>
        {post && user && (
          <PostCard post={post} theme={theme} user={user} sender={sender} />
        )}
        <Container flexStyle={styles.flex.comments}>
          {post?.comments?.length === 0 ? (
            <Text
              text={t('screens.postDetail.noComments')}
              textStyle={styles.text.noComments}
              color={theme.color.textMuted}
            />
          ) : (
            (post?.comments ?? [])
              .sort(
                (a, b) =>
                  new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
              )
              .map((comment) => (
                <CommentBubble key={comment.id} comment={comment} commentId={commentId} />
              ))
          )}
        </Container>
      </Container>
    </Scroll>
  );

  return (
    <BottomSheet
      content={content}
      height={height * 0.85}
      isVisible={isVisible}
      onSwipeDown={onSwipeDown}
    />
  );
};

export default NotificationDetail;

const enum FlexStyles {
  CONTAINER = 'container',
  COMMENTS = 'comments',
}

const enum TextStyles {
  NO_COMMENTS = 'noComments',
}

const enum ViewStyles {
  CONTAINER = 'container',
}

const createStyles = (
  theme: Theme
): {
  flex: Record<FlexStyles, CustomFlexStyle>;
  text: Record<TextStyles, CustomTextStyle>;
  view: Record<ViewStyles, CustomViewStyle>;
} => {
  const flex = StyleSheet.create<Record<FlexStyles, CustomFlexStyle>>({
    [FlexStyles.CONTAINER]: {
      flex: 1,
      paddingVertical: scaleHeight(10),
      gap: scaleProportionally(15),
    },
    [FlexStyles.COMMENTS]: {
      width: '97%',
      alignSelf: 'center',
      alignItems: 'center',
      gap: scaleProportionally(15),
    },
  });

  const text = StyleSheet.create<Record<TextStyles, CustomTextStyle>>({
    [TextStyles.NO_COMMENTS]: {
      fontFamily: theme.common.font.families.regular,
      fontSize: theme.common.font.sizes._14,
    },
  });

  const view = StyleSheet.create<Record<ViewStyles, CustomViewStyle>>({
    [ViewStyles.CONTAINER]: {
      backgroundColor: theme.color.overlay,
    },
  });

  return { flex, text, view };
};
