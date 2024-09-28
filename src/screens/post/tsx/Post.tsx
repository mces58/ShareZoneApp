import React, { useMemo, useRef } from 'react';
import { RichEditor } from 'react-native-pell-rich-editor';

import { useTheme } from 'styled-components/native';

import { useAuth, useI18n } from 'src/contexts';

import { Container } from 'src/components/containers';
import { BaseImage } from 'src/components/images';
import { RichText } from 'src/components/inputs';
import { BaseText } from 'src/components/texts';
import { Theme } from 'src/constants/styles';
import { PostScreenNavigation } from 'src/navigations/RootStackParamList';

import { Header } from '../components';
import { createPostStyles } from '../styles';

interface PostProps {
  navigation: PostScreenNavigation;
}

const Post: React.FC<PostProps> = ({ navigation }) => {
  const { user } = useAuth();
  const { t } = useI18n();
  const theme = useTheme() as Theme;
  const styles = useMemo(() => createPostStyles(theme), [theme]);
  const bodyRef = useRef('');
  const editorRef = useRef<RichEditor | null>(null);
  //const [loading, setLoading] = useState<boolean>(false);
  //const [file, setFile] = useState<File | null>(null);
  return (
    <Container flexStyle={styles.flex.container} viewStyle={styles.view.container}>
      <Header
        title={t('screens.post.title')}
        theme={theme}
        onPressHeaderIcon={() => navigation.goBack()}
      />
      <Container flexStyle={styles.flex.avatar}>
        <BaseImage
          uri={user?.image}
          imageStyle={styles.image.avatar}
          shadowStyle={styles.shadow.small}
        />
        <Container flexStyle={styles.flex.avatarText}>
          <BaseText text={user?.user_name || ''} textStyle={styles.text.userName} />
          <BaseText
            text={t('global.public')}
            textStyle={styles.text.public}
            color={theme.color.textMuted}
          />
        </Container>
      </Container>
      <Container>
        <RichText editorRef={editorRef} onChange={(text) => (bodyRef.current = text)} />
      </Container>
    </Container>
  );
};

export default Post;
