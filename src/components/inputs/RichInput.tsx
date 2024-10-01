import React, { FC, MutableRefObject } from 'react';
import { StyleSheet } from 'react-native';
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor';

import { useTheme } from 'styled-components/native';

import { useI18n } from 'src/contexts';
import { scaleHeight, scaleProportionally } from 'src/utils';

import { Theme } from 'src/constants/styles';

import { Container } from '../containers';
import { Text } from '../texts';

interface RichInputProps {
  editorRef: MutableRefObject<RichEditor | null>;
  onChange: (text: string) => void;
  height?: number;
}

const RichInput: FC<RichInputProps> = ({
  editorRef,
  onChange,
  height = scaleHeight(200),
}) => {
  const theme = useTheme() as Theme;
  const { t } = useI18n();

  return (
    <Container flexStyle={{ minHeight: height * 1.1 }}>
      <RichToolbar
        editor={editorRef}
        actions={[
          actions.keyboard,
          actions.undo,
          actions.redo,
          actions.setStrikethrough,
          actions.setBold,
          actions.setItalic,
          actions.insertOrderedList,
          actions.insertBulletsList,
          actions.checkboxList,
          actions.blockquote,
          actions.alignLeft,
          actions.alignCenter,
          actions.alignRight,
          actions.code,
          actions.line,
          actions.heading1,
          actions.heading4,
          actions.indent,
          actions.outdent,
          actions.insertLink,
        ]}
        iconMap={{
          [actions.heading1]: ({ tintColor }: { tintColor: string }) => (
            <Text color={tintColor} text="H1" />
          ),
          [actions.heading4]: ({ tintColor }: { tintColor: string }) => (
            <Text color={tintColor} text="H4" />
          ),
        }}
        selectedIconTint={theme.common.color.primary}
        style={[
          styles.toolbar,
          { backgroundColor: theme.color.background, borderColor: theme.color.border },
        ]}
        flatContainerStyle={styles.flatContainer}
        disabled={false}
      />
      <RichEditor
        ref={editorRef}
        onChange={(text) => onChange(text)}
        placeholder={t('form.input.richPlaceholder') + '...'}
        containerStyle={[
          styles.richEditor,
          {
            minHeight: height * 0.8,
            maxHeight: height,
            backgroundColor: theme.color.background,
            borderColor: theme.color.border,
          },
        ]}
        contentMode="mobile"
        editorStyle={{
          backgroundColor: theme.color.background,
          color: theme.color.text,
          placeholderColor: theme.color.border,
        }}
        scrollEnabled={true}
      />
    </Container>
  );
};

export default RichInput;

const styles = StyleSheet.create({
  toolbar: {
    alignSelf: 'center',
    width: '90%',
    borderTopRightRadius: scaleProportionally(10),
    borderTopLeftRadius: scaleProportionally(10),
    borderWidth: scaleProportionally(1),
    borderBottomWidth: 0,
  },
  flatContainer: {
    paddingHorizontal: scaleProportionally(5),
    gap: scaleProportionally(3),
  },
  richEditor: {
    flex: 1,
    alignSelf: 'center',
    width: '90%',
    paddingHorizontal: scaleProportionally(5),
    paddingVertical: scaleHeight(5),
    borderBottomLeftRadius: scaleProportionally(10),
    borderBottomRightRadius: scaleProportionally(10),
    borderWidth: scaleProportionally(1),
    borderBottomWidth: scaleProportionally(1.5),
  },
});
