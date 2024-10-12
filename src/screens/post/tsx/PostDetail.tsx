import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useTheme } from 'styled-components/native';

import { useAuth, useI18n } from 'src/contexts';

import { Button } from 'src/components/buttons';
import { Container, Scroll } from 'src/components/containers';
import { Input } from 'src/components/inputs';
import { Text } from 'src/components/texts';
import { Theme } from 'src/constants/styles';
import { Comment, PostData } from 'src/constants/types';

import { CommentBubble, PostCommentCard } from '../components';
import {
  CommentChannelFunction,
  DeleteCommentFunction,
  FetchPostFunction,
  NewCommentFunction,
} from '../functions';
import { createPostDetailStyles } from '../styles';

interface PostDetailProps {
  postData: PostData;
}

const PostDetail: FC<PostDetailProps> = ({ postData }) => {
  const { user } = useAuth();
  const { t } = useI18n();
  const theme = useTheme() as Theme;
  const styles = useMemo(() => createPostDetailStyles(theme), [theme]);
  const [text, setText] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [post, setPost] = useState<PostData | null>(postData);

  useEffect(() => {
    FetchPostFunction({ postId: postData.id, setPost });
    CommentChannelFunction({ setPost });
  }, [postData]);

  const handleNewComment = useCallback(async (): Promise<void> => {
    if (user) await NewCommentFunction({ post, setLoading, setText, text, user });
  }, [post, text]);

  const handleDeleteComment = useCallback(
    async (comment: Comment): Promise<void> => {
      await DeleteCommentFunction({ comment, setPost });
    },
    [post]
  );

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.flex.screen}
      extraHeight={Platform.select({ android: 100, ios: 200 })}
    >
      <Scroll>
        <Container flexStyle={styles.flex.container} viewStyle={styles.view.container}>
          {post && <PostCommentCard post={post} theme={theme} />}
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
                  <CommentBubble
                    key={comment.id}
                    comment={comment}
                    canDelete={user?.id === comment.user_id}
                    onDelete={() => handleDeleteComment(comment)}
                  />
                ))
            )}
          </Container>
        </Container>
      </Scroll>
      <Container flexStyle={styles.flex.commentInput}>
        <Input
          text={text}
          onChangeText={setText}
          placeholder={t('form.input.placeholder')}
          flexStyle={styles.flex.input}
          viewStyle={styles.view.input}
          shadowStyle={styles.shadow.small}
          textStyle={styles.text.input}
        />
        <Button
          text={t('global.send')}
          onPress={handleNewComment}
          loading={loading}
          flexStyle={styles.flex.button}
          shadowStyle={styles.shadow.small}
          viewStyle={styles.view.button}
          textStyle={styles.text.button}
        />
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default PostDetail;
