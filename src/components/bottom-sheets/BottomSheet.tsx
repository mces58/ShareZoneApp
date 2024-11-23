/* eslint-disable react-native/use-touchable-opacity */
import React, { FC, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { useTheme } from 'styled-components/native';

import {
  scaleHeight,
  scaleProportionally,
  scaleWidth,
  useSwipeVertical,
} from 'src/utils';

import { Theme } from 'src/constants/styles';

interface BottomSheetProps {
  content: React.ReactNode;
  height: number;
  isVisible: boolean;
  onSwipeDown: () => void;
  animationType?: 'none' | 'slide' | 'fade';
  isTransparent?: boolean;
}

const BottomSheet: FC<BottomSheetProps> = ({
  content,
  height,
  isVisible,
  onSwipeDown,
  animationType = 'slide',
  isTransparent = true,
}) => {
  const theme = useTheme() as Theme;
  const [showModal, setShowModal] = useState<boolean>(isVisible);
  const { onTouchStart, onTouchEnd } = useSwipeVertical(undefined, onSwipeDown, 6);
  const slideAnim = useRef(new Animated.Value(height)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateSheet = (
      toValue: number,
      fadeValue?: number,
      onAnimationEnd?: () => void
    ): void => {
      const animations = [];
      if (animationType === 'slide') {
        animations.push(
          Animated.timing(slideAnim, {
            toValue,
            duration: 300,
            useNativeDriver: true,
          })
        );
      }
      if (animationType === 'fade' && fadeValue !== undefined) {
        animations.push(
          Animated.timing(fadeAnim, {
            toValue: fadeValue,
            duration: 300,
            useNativeDriver: true,
          })
        );
      }
      Animated.parallel(animations).start(() => {
        if (onAnimationEnd) {
          onAnimationEnd();
        }
      });
    };

    if (isVisible) {
      setShowModal(true);
      animateSheet(0, 1);
    } else {
      animateSheet(height, 0, () => {
        setShowModal(false);
      });
    }
  }, [isVisible, animationType, height]);

  return (
    <Modal visible={showModal} transparent={isTransparent} animationType="none">
      <TouchableWithoutFeedback onPress={onSwipeDown}>
        <ScrollView contentContainerStyle={styles.overlay}>
          <Animated.View
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            style={[
              styles.modalContainer,
              { height, backgroundColor: theme.color.overlay },
              styles.shadow,
              { shadowColor: theme.color.shadow },
              animationType === 'slide' && { transform: [{ translateY: slideAnim }] },
              animationType === 'fade' && { opacity: fadeAnim },
            ]}
          >
            <View
              style={[styles.swipeIndicator, { backgroundColor: theme.color.textMuted }]}
            />
            {content}
          </Animated.View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    width: '100%',
    borderTopLeftRadius: scaleProportionally(20),
    borderTopRightRadius: scaleProportionally(20),
    paddingHorizontal: scaleWidth(10),
    paddingVertical: scaleHeight(10),
  },
  swipeIndicator: {
    width: scaleWidth(75),
    height: scaleHeight(3),
    alignSelf: 'center',
    marginVertical: scaleHeight(10),
    borderRadius: scaleProportionally(10),
  },
  shadow: {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
  },
});
