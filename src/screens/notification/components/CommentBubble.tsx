import React, { FC, useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { useTheme } from 'styled-components/native';

import { useAuth, useI18n } from 'src/contexts';
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
  Comment,
  CustomFlexStyle,
  CustomImageStyle,
  CustomShadowStyle,
  CustomTextStyle,
  CustomViewStyle,
} from 'src/constants/types';

interface CommentProps {
  comment: Comment;
  commentId: string;
}

const CommentBubble: FC<CommentProps> = ({ comment, commentId }) => {
  const { user } = useAuth();
  const theme = useTheme() as Theme;
  const { t } = useI18n();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const timeText = getTimeText(comment.created_at, t);

  return (
    <Container flexStyle={styles.flex.comment}>
      <Image
        uri={comment.user.image}
        imageStyle={styles.image.avatar}
        shadowStyle={styles.shadow.small}
      />
      <Container
        flexStyle={styles.flex.commentBodyOuter}
        viewStyle={[
          styles.view.commentBody,
          comment.id === commentId && styles.view.focusComment,
        ]}
        shadowStyle={styles.shadow.small}
      >
        <Container flexStyle={styles.flex.commentBodyInner}>
          <Text
            text={
              comment.user.user_name === user?.user_name
                ? t('global.you')
                : comment.user.user_name + ':'
            }
            textStyle={styles.text.userName}
          />
          <Text
            text={timeText}
            textStyle={styles.text.commentDate}
            color={theme.color.textMuted}
          />
        </Container>
        <Container flexStyle={styles.flex.commentBodyInner}>
          <Text
            text={
              comment.text.length > 50 ? comment.text.slice(0, 50) + '...' : comment.text
            }
            textStyle={styles.text.comment}
          />
        </Container>
      </Container>
    </Container>
  );
};

export default CommentBubble;

const enum FlexStyles {
  COMMENT = 'comment',
  COMMENT_BODY_OUTER = 'commentBodyOuter',
  COMMENT_BODY_INNER = 'commentBodyInner',
}

const enum ImageStyles {
  AVATAR = 'avatar',
}

const enum ShadowStyles {
  SMALL = 'small',
}

const enum TextStyles {
  USER_NAME = 'userName',
  COMMENT_DATE = 'commentDate',
  COMMENT = 'comment',
}

const enum ViewStyles {
  COMMENT_BODY = 'commentBody',
  FOCUS_COMMENT = 'focusComment',
}

const createStyles = (
  theme: Theme
): {
  flex: Record<FlexStyles, CustomFlexStyle>;
  image: Record<ImageStyles, CustomImageStyle>;
  shadow: Record<ShadowStyles, CustomShadowStyle>;
  text: Record<TextStyles, CustomTextStyle>;
  view: Record<ViewStyles, CustomViewStyle>;
} => {
  const flex = StyleSheet.create<Record<FlexStyles, CustomFlexStyle>>({
    [FlexStyles.COMMENT]: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: scaleProportionally(5),
    },
    [FlexStyles.COMMENT_BODY_OUTER]: {
      flex: 1,
      paddingHorizontal: scaleWidth(10),
      paddingVertical: scaleHeight(10),
      gap: scaleProportionally(5),
    },
    [FlexStyles.COMMENT_BODY_INNER]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });

  const image = StyleSheet.create<Record<ImageStyles, CustomImageStyle>>({
    [ImageStyles.AVATAR]: {
      width: scaleByAspectRatio(45),
      height: scaleByAspectRatio(45),
      borderRadius: scaleByAspectRatio(45 / 2),
    },
  });

  const shadow = StyleSheet.create<Record<ShadowStyles, CustomShadowStyle>>({
    [ShadowStyles.SMALL]: {
      shadowColor: theme.color.shadow,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },
  });

  const text = StyleSheet.create<Record<TextStyles, CustomTextStyle>>({
    [TextStyles.USER_NAME]: {
      fontSize: theme.common.font.sizes._14,
      fontFamily: theme.common.font.families.bold,
      textTransform: 'capitalize',
      letterSpacing: scaleProportionally(0.5),
    },
    [TextStyles.COMMENT_DATE]: {
      fontSize: theme.common.font.sizes._12,
      fontFamily: theme.common.font.families.regular,
    },
    [TextStyles.COMMENT]: {
      fontSize: theme.common.font.sizes._14,
      fontFamily: theme.common.font.families.regular,
    },
  });

  const view = StyleSheet.create<Record<ViewStyles, CustomViewStyle>>({
    [ViewStyles.COMMENT_BODY]: {
      backgroundColor: theme.color.card,
      borderRadius: scaleProportionally(10),
    },
    [ViewStyles.FOCUS_COMMENT]: {
      backgroundColor: theme.common.color.warning,
    },
  });

  return { flex, image, shadow, text, view };
};
