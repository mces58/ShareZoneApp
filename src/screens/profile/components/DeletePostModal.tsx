import React, { FC, useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { useI18n } from 'src/contexts';
import { scaleHeight, scaleProportionally, scaleWidth } from 'src/utils';

import { Button } from 'src/components/buttons';
import { Container } from 'src/components/containers';
import { Modal } from 'src/components/modals';
import { Text } from 'src/components/texts';
import { Theme } from 'src/constants/styles';
import {
  CustomFlexStyle,
  CustomShadowStyle,
  CustomTextStyle,
  CustomViewStyle,
} from 'src/constants/types';

interface DeletePostModalProps {
  onClose: () => void;
  onConfirm: () => void;
  showOptions: boolean;
  theme: Theme;
}

const DeletePostModal: FC<DeletePostModalProps> = ({
  onClose,
  onConfirm,
  showOptions,
  theme,
}) => {
  const { t } = useI18n();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <Modal isVisible={showOptions} onClose={onClose} componentStyle={styles.flex.modal}>
      <Container flexStyle={styles.flex.container}>
        <Text
          text={t('screens.profile.areYouSureDeletePost')}
          textStyle={styles.text.header}
        />
        <Container flexStyle={styles.flex.buttonContainer}>
          <Button
            text="Sil"
            onPress={onConfirm}
            flexStyle={styles.flex.button}
            viewStyle={[
              styles.view.button,
              { backgroundColor: theme.common.color.danger },
            ]}
            shadowStyle={styles.shadow.small}
            textStyle={styles.text.button}
          />
          <Button
            text="Vazgeç"
            onPress={onClose}
            flexStyle={styles.flex.button}
            viewStyle={[
              styles.view.button,
              { backgroundColor: theme.common.color.success },
            ]}
            shadowStyle={styles.shadow.small}
            textStyle={styles.text.button}
          />
        </Container>
      </Container>
    </Modal>
  );
};

export default DeletePostModal;

const enum FlexStyles {
  MODAL = 'modal',
  CONTAINER = 'container',
  BUTTON_CONTAINER = 'buttonContainer',
  BUTTON = 'button',
}

const enum ShadowStyles {
  SMALL = 'small',
}

const enum TextStyles {
  HEADER = 'header',
  BUTTON = 'button',
}

const enum ViewStyles {
  BUTTON = 'button',
}

const createStyles = (
  theme: Theme
): {
  flex: Record<FlexStyles, CustomFlexStyle>;
  shadow: Record<ShadowStyles, CustomShadowStyle>;
  text: Record<TextStyles, CustomTextStyle>;
  view: Record<ViewStyles, CustomViewStyle>;
} => {
  const flex = StyleSheet.create<Record<FlexStyles, CustomFlexStyle>>({
    [FlexStyles.MODAL]: {
      height: scaleHeight(160),
    },
    [FlexStyles.CONTAINER]: {
      flex: 1,
      gap: scaleProportionally(20),
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: scaleWidth(10),
    },
    [FlexStyles.BUTTON_CONTAINER]: {
      flexDirection: 'row-reverse',
      justifyContent: 'space-around',
      width: '100%',
      paddingHorizontal: scaleWidth(20),
    },
    [FlexStyles.BUTTON]: {
      flex: 0.4,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: scaleHeight(15),
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
    [TextStyles.HEADER]: {
      fontFamily: theme.common.font.families.semiBold,
      fontSize: theme.common.font.sizes._20,
      textAlign: 'center',
    },
    [TextStyles.BUTTON]: {
      fontFamily: theme.common.font.families.semiBold,
      fontSize: theme.common.font.sizes._16,
      letterSpacing: scaleProportionally(1),
      textDecorationLine: 'underline',
    },
  });

  const view = StyleSheet.create<Record<ViewStyles, CustomViewStyle>>({
    [ViewStyles.BUTTON]: {
      borderRadius: scaleProportionally(10),
    },
  });

  return { flex, shadow, text, view };
};
