import React, { FC, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import RenderHTML from 'react-native-render-html';

import moment from 'moment';
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
import { Video } from 'src/components/videos';
import { Theme } from 'src/constants/styles';
import {
  CustomFlexStyle,
  CustomImageStyle,
  CustomShadowStyle,
  CustomTextStyle,
  CustomViewStyle,
  PostData,
} from 'src/constants/types';

type DurationUnitType =
  | 'seconds'
  | 'minutes'
  | 'hours'
  | 'days'
  | 'weeks'
  | 'months'
  | 'years';

interface PostCardProps {
  isVideoVisible: boolean;
  post: PostData;
  theme: Theme;
}

const PostCard: FC<PostCardProps> = ({ isVideoVisible, post, theme }) => {
  const { t } = useI18n();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const timeAgo = moment(post.created_at);
  const now = moment();

  const timeIntervals: { limit: number; unit: DurationUnitType; singular?: string }[] = [
    { limit: 60, unit: 'seconds', singular: 'aFewSeconds' },
    { limit: 60 * 60, unit: 'minutes' },
    { limit: 24 * 60 * 60, unit: 'hours' },
    { limit: 7 * 24 * 60 * 60, unit: 'days' },
    { limit: 30 * 24 * 60 * 60, unit: 'weeks' },
    { limit: 12 * 30 * 24 * 60 * 60, unit: 'months' },
    { limit: Infinity, unit: 'years' },
  ];

  const elapsedSeconds = now.diff(timeAgo, 'seconds');
  let timeKey = '';
  let timeValue = 0;

  for (const interval of timeIntervals) {
    if (elapsedSeconds < interval.limit) {
      timeValue = moment.duration(elapsedSeconds, 'seconds').as(interval.unit);
      timeKey = interval.singular && timeValue < 10 ? interval.singular : interval.unit;
      break;
    }
  }

  const timeText = t(`screens.home.postCard.time.ago.${timeKey}`, {
    time: Math.floor(timeValue),
  });

  return (
    <Container
      flexStyle={styles.flex.card}
      viewStyle={styles.view.card}
      shadowStyle={styles.shadow.small}
    >
      <Container flexStyle={styles.flex.cardHeader}>
        <Container flexStyle={styles.flex.profile}>
          <Image uri={post.user?.image} imageStyle={styles.image.avatar} />
          {post.user?.user_name && (
            <Text text={post.user.user_name} textStyle={styles.text.headerUserName} />
          )}
        </Container>
        <Icon name="three-dot" />
      </Container>
      <Container flexStyle={styles.flex.cardBody}>
        {post.file.includes('image') ? (
          <Image uri={post.file} imageStyle={styles.image.post} />
        ) : (
          <Video
            uri={post.file}
            isLooping
            shouldPlay={isVideoVisible}
            useNativeControls={false}
            videoStyle={styles.image.post}
          />
        )}
      </Container>
      <Container flexStyle={styles.flex.cardFooter}>
        <Container flexStyle={styles.flex.icon}>
          <Icon name="heart" size={scaleByAspectRatio(20)} strokeWidth={1.8} />
          <Icon name="comment" size={scaleByAspectRatio(20)} strokeWidth={1.8} />
          <Icon name="share" size={scaleByAspectRatio(20)} strokeWidth={1.8} />
        </Container>
        <Text
          text={timeText}
          textStyle={styles.text.timeAgo}
          color={theme.color.textMuted}
        />
      </Container>
      {post.body && (
        <Container flexStyle={styles.flex.postText}>
          {post.user?.user_name && (
            <Text
              text={post.user.user_name + ':'}
              textStyle={styles.text.footerUserName}
            />
          )}
          <RenderHTML
            source={{ html: post.body }}
            contentWidth={300}
            baseStyle={{ color: theme.color.text }}
          />
        </Container>
      )}
    </Container>
  );
};

export default PostCard;

const enum FlexStyles {
  CARD = 'card',
  CARD_HEADER = 'cardHeader',
  PROFILE = 'profile',
  CARD_BODY = 'cardBody',
  CARD_FOOTER = 'cardFooter',
  ICON = 'icon',
  POST_TEXT = 'postText',
}

const enum ImageStyles {
  AVATAR = 'avatar',
  POST = 'post',
}

const enum ShadowStyles {
  SMALL = 'small',
}

const enum TextStyles {
  HEADER_USER_NAME = 'headerUserName',
  TIME_AGO = 'timeAgo',
  FOOTER_USER_NAME = 'footerUserName',
}

const enum ViewStyles {
  CARD = 'card',
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
    [FlexStyles.CARD]: {
      width: '95%',
      paddingVertical: scaleHeight(10),
      gap: scaleProportionally(10),
      alignSelf: 'center',
    },
    [FlexStyles.CARD_HEADER]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: scaleWidth(10),
    },
    [FlexStyles.PROFILE]: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: scaleProportionally(5),
    },
    [FlexStyles.CARD_BODY]: {
      gap: scaleProportionally(10),
    },
    [FlexStyles.CARD_FOOTER]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: scaleWidth(10),
      paddingVertical: scaleHeight(5),
    },
    [FlexStyles.ICON]: {
      flexDirection: 'row',
      gap: scaleProportionally(10),
    },
    [FlexStyles.POST_TEXT]: {
      paddingHorizontal: scaleWidth(10),
      flexDirection: 'row',
      alignItems: 'center',
      gap: scaleProportionally(5),
    },
  });

  const image = StyleSheet.create<Record<ImageStyles, CustomImageStyle>>({
    [ImageStyles.AVATAR]: {
      width: scaleByAspectRatio(40),
      height: scaleByAspectRatio(40),
      borderRadius: scaleByAspectRatio(20),
    },
    [ImageStyles.POST]: {
      width: '100%',
      height: scaleHeight(300),
    },
  });

  const shadow = StyleSheet.create<Record<ShadowStyles, CustomShadowStyle>>({
    [ShadowStyles.SMALL]: {
      elevation: 3,
      shadowColor: theme.color.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
  });

  const text = StyleSheet.create<Record<TextStyles, CustomTextStyle>>({
    [TextStyles.HEADER_USER_NAME]: {
      textTransform: 'capitalize',
      fontFamily: theme.common.font.families.bold,
      fontSize: theme.common.font.sizes._18,
    },
    [TextStyles.TIME_AGO]: {
      fontFamily: theme.common.font.families.medium,
      fontSize: theme.common.font.sizes._12,
    },
    [TextStyles.FOOTER_USER_NAME]: {
      textTransform: 'lowercase',
      textDecorationLine: 'underline',
      fontFamily: theme.common.font.families.bold,
    },
  });

  const view = StyleSheet.create<Record<ViewStyles, CustomViewStyle>>({
    [FlexStyles.CARD]: {
      backgroundColor: theme.color.card,
      borderRadius: scaleProportionally(10),
    },
  });

  return { flex, image, shadow, text, view };
};
