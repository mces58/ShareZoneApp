import React, { FC, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, ViewToken } from 'react-native';
import RenderHTML from 'react-native-render-html';

import moment from 'moment';
import { scaleByAspectRatio, scaleHeight } from 'src/utils';

import Icon from 'src/assets/icons';
import { Container } from 'src/components/containers';
import { Image } from 'src/components/images';
import { Text } from 'src/components/texts';
import { Video } from 'src/components/videos';
import { Theme } from 'src/constants/styles';
import { PostData } from 'src/constants/types';

interface PostCardsProps {
  posts: PostData[];
  theme: Theme;
}

const PostCards: FC<PostCardsProps> = ({ posts, theme }) => {
  const { height: deviceHeight } = Dimensions.get('window');
  const [viewableItems, setViewableItems] = useState<string[]>([]);
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50, // Yüzde 50 görünürse tetiklenir
  });

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      const visibleIds = viewableItems.map((item) => String(item.item.id));
      setViewableItems(visibleIds);
    }
  );

  const renderPosts = (post: PostData): JSX.Element => {
    const createAt = moment(post.created_at).fromNow();
    const isVideoVisible = viewableItems.includes(post.id);

    return (
      <Container
        flexStyle={{ width: '95%', paddingVertical: 10, gap: 10, alignSelf: 'center' }}
        viewStyle={{ backgroundColor: '#ddd', borderRadius: 10 }}
        shadowStyle={{
          elevation: 5,
          shadowColor: 'black',
          shadowOpacity: 0.5,
          shadowRadius: 5,
          shadowOffset: { width: 0, height: 2 },
        }}
      >
        <Container
          flexStyle={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
          }}
        >
          <Container flexStyle={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <Image
              uri={post.user?.image}
              imageStyle={{
                width: 40,
                height: 40,
                borderRadius: 50,
              }}
            />
            <Text text={post.user?.user_name || ''} />
          </Container>
          <Icon name="three-dot" />
        </Container>
        <Container flexStyle={{ gap: 10 }}>
          {post.file.includes('image') ? (
            <Image
              uri={post.file}
              imageStyle={{ width: '100%', height: scaleHeight(300) }}
            />
          ) : (
            <Video
              uri={post.file}
              isLooping
              shouldPlay={isVideoVisible}
              useNativeControls={false}
              videoStyle={{ width: '100%', height: scaleHeight(300) }}
            />
          )}
        </Container>
        <Container>
          <Container
            flexStyle={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 10,
            }}
          >
            <Container flexStyle={{ flexDirection: 'row', gap: 15 }}>
              <Icon name="heart" size={scaleByAspectRatio(20)} />
              <Icon name="comment" size={scaleByAspectRatio(20)} />
              <Icon name="share" size={scaleByAspectRatio(20)} />
            </Container>
            <Text text={createAt} />
          </Container>
        </Container>
        {post.body && (
          <Container
            flexStyle={{
              paddingHorizontal: 10,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
            }}
          >
            <Text
              text={(post.user?.user_name || '') + ':'}
              textStyle={{
                textTransform: 'lowercase',
                textDecorationLine: 'underline',
                fontFamily: theme.common.font.families.bold,
              }}
            />
            <RenderHTML source={{ html: post.body }} contentWidth={300} />
          </Container>
        )}
      </Container>
    );
  };

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => renderPosts(item)}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ gap: 20, paddingBottom: 10 }}
      onViewableItemsChanged={onViewableItemsChanged.current}
      viewabilityConfig={viewabilityConfig.current}
      initialNumToRender={10}
      ListFooterComponent={
        <Container
          flexStyle={
            posts.length === 0 ? { marginTop: deviceHeight * 0.4 } : { marginTop: 30 }
          }
        >
          <ActivityIndicator size="large" color={theme.color.text} />
        </Container>
      }
    />
  );
};

export default PostCards;
