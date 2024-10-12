import React, { FC, useMemo } from 'react';
import { Alert, StyleSheet } from 'react-native';

import { useTheme } from 'styled-components/native';

import { useI18n } from 'src/contexts';
import {
  scaleByAspectRatio,
  scaleHeight,
  scaleProportionally,
  scaleWidth,
} from 'src/utils';

import Icon from 'src/assets/icons';
import { Container } from 'src/components/containers';
import { Image } from 'src/components/images';
import { Text } from 'src/components/texts';
import { LOCAL_UNITS } from 'src/constants/localization';
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
  canDelete: boolean;
  comment: Comment;
  onDelete: () => void;
}

const CommentBubble: FC<CommentProps> = ({ canDelete, comment, onDelete }) => {
  const theme = useTheme() as Theme;
  const { t } = useI18n();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const handleDelete = (): void => {
    Alert.alert(
      t('screens.postDetail.deleteComment'),
      t('screens.postDetail.areYouSureDeleteComment'),
      [
        {
          text: t('global.cancel'),
          style: 'cancel',
        },
        {
          text: t('global.delete'),
          onPress: onDelete,
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <Container flexStyle={styles.flex.comment}>
      <Image
        uri={comment.user.image}
        imageStyle={styles.image.avatar}
        shadowStyle={styles.shadow.small}
      />
      <Container
        flexStyle={styles.flex.commentBodyOuter}
        viewStyle={styles.view.commentBody}
        shadowStyle={styles.shadow.small}
      >
        <Container flexStyle={styles.flex.commentBodyInner}>
          <Text text={comment.user.user_name + ':'} textStyle={styles.text.userName} />
          <Text
            text={new Date(comment.created_at).toLocaleDateString(
              LOCAL_UNITS.languageTag,
              {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              }
            )}
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
          {canDelete && (
            <Icon
              name="trash"
              color={{ mono: theme.common.color.danger }}
              onPress={handleDelete}
            />
          )}
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
      letterSpacing: 0.5,
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
  });

  return { flex, image, shadow, text, view };
};
