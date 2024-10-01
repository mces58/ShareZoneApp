import React, { FC, useCallback, useMemo, useRef, useState } from 'react';
import { Animated } from 'react-native';
import { RichEditor } from 'react-native-pell-rich-editor';

import { useTheme } from 'styled-components/native';

import { useAuth, useI18n } from 'src/contexts';
import { scaleByAspectRatio } from 'src/utils';

import Icon from 'src/assets/icons';
import { Button } from 'src/components/buttons';
import { Container, Scroll } from 'src/components/containers';
import { Image } from 'src/components/images';
import { RichInput } from 'src/components/inputs';
import { GradientText, Text } from 'src/components/texts';
import { Toast, ToastTypes } from 'src/components/toasts';
import { Video } from 'src/components/videos';
import { Theme } from 'src/constants/styles';
import { PostScreenNavigation } from 'src/navigations/RootStackParamList';

import { SubHeader } from '../components';
import { ImagePickerFunction, PostFunctions, VideoPickerFunction } from '../functions';
import { createPostStyles } from '../styles';

interface PostProps {
  navigation: PostScreenNavigation;
}

const Post: FC<PostProps> = ({ navigation }) => {
  const { user } = useAuth();
  const { t } = useI18n();
  const theme = useTheme() as Theme;
  const styles = useMemo(() => createPostStyles(theme), [theme]);
  const bodyRef = useRef<string>('');
  const editorRef = useRef<RichEditor | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<{
    mimeType: string;
    type: string;
    uri: string;
  } | null>(null);
  const [toast, setToast] = useState<{ message: string; type: ToastTypes } | null>(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleImagePicker = useCallback(async (): Promise<void> => {
    await ImagePickerFunction({ setFile });
    fadeIn();
  }, [file]);

  const handleVideoPicker = useCallback(async (): Promise<void> => {
    await VideoPickerFunction({ setFile });
    fadeIn();
  }, [file]);

  const handlePost = useCallback(async (): Promise<void> => {
    if (user)
      await PostFunctions({
        bodyRef,
        editorRef,
        file,
        setFile,
        setLoading,
        setToast,
        t,
        user,
      });
  }, [bodyRef, file, user]);

  const fadeIn = (): void => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = (): void => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setFile(null));
  };

  return (
    <Scroll>
      <Container flexStyle={styles.flex.container} viewStyle={styles.view.container}>
        <SubHeader
          title={t('screens.post.title')}
          theme={theme}
          onPressHeaderIcon={() => navigation.goBack()}
        />
        <Container flexStyle={styles.flex.avatar}>
          <Image
            uri={user?.image}
            imageStyle={styles.image.avatar}
            shadowStyle={styles.shadow.small}
          />
          <Container flexStyle={styles.flex.avatarText}>
            <Text text={user?.user_name || ''} textStyle={styles.text.userName} />
            <Text
              text={t('global.public')}
              textStyle={styles.text.public}
              color={theme.color.textMuted}
            />
          </Container>
        </Container>
        <GradientText
          colors={theme.common.color.defaultGradient2}
          text={t('screens.post.description')}
          textStyle={styles.text.description}
        />
        <Container flexStyle={styles.flex.post} viewStyle={styles.view.post}>
          <Text
            text={t('screens.post.addToPost')}
            textStyle={styles.text.addToPost}
            color={theme.color.textMuted}
          />
          <Container flexStyle={styles.flex.icon}>
            <Icon
              name="gallery"
              size={scaleByAspectRatio(25)}
              strokeWidth={1.3}
              onPress={handleImagePicker}
              color={{ mono: theme.color.textMuted }}
            />
            <Icon
              name="video"
              size={scaleByAspectRatio(35)}
              onPress={handleVideoPicker}
              color={{ mono: theme.color.textMuted }}
            />
          </Container>
        </Container>
        {file && (
          <Animated.View style={{ opacity: fadeAnim }}>
            {file.type === 'image' ? (
              <Image
                uri={file.uri}
                imageStyle={styles.image.post}
                shadowStyle={styles.shadow.small}
              />
            ) : (
              <Video
                uri={file.uri}
                isLooping
                shouldPlay
                videoStyle={styles.image.post}
                shadowStyle={styles.shadow.small}
              />
            )}
            <Container flexStyle={styles.flex.trashIcon}>
              <Icon
                name="trash"
                size={scaleByAspectRatio(30)}
                onPress={fadeOut}
                strokeWidth={1.1}
                fillColor={theme.common.color.danger}
              />
            </Container>
          </Animated.View>
        )}
        <RichInput editorRef={editorRef} onChange={(text) => (bodyRef.current = text)} />
        <Container flexStyle={styles.flex.buttonWrapper}>
          <Button
            text={t('global.post')}
            onPress={handlePost}
            loading={loading}
            disabled={loading}
            flexStyle={styles.flex.button}
            viewStyle={styles.view.button}
            textStyle={styles.text.button}
            shadowStyle={styles.shadow.small}
          />
          {toast && (
            <Toast
              downHeight={325}
              message={toast.message}
              type={toast.type}
              icon={
                toast.type === ToastTypes.Error ? (
                  <Icon name="error" fillColor={theme.color.text} strokeWidth={0} />
                ) : (
                  <Icon name="check" fillColor={theme.color.text} strokeWidth={0} />
                )
              }
            />
          )}
        </Container>
      </Container>
    </Scroll>
  );
};

export default Post;
