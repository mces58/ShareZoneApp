import React from 'react';
import { ColorValue, TouchableOpacity } from 'react-native';

import { useTheme } from 'styled-components/native';

import { Theme } from 'src/constants/styles/themes';
import { scaleByAspectRatio } from 'src/utils/dimensions';

import ArrowIcon from './arrow';
import ReactIcon from './react';
import ShortArrowIcon from './short-arrow';

interface IconColor {
  grads?: ColorValue[];
  isGradient?: boolean;
  mono?: ColorValue;
}

interface BaseIconProps {
  color?: IconColor;
  onPress?: () => void;
  size?: number;
  strokeWidth?: number;
}

interface ArrowIconProps extends BaseIconProps {
  direction:
    | 'up'
    | 'right'
    | 'down'
    | 'left'
    | 'up-right'
    | 'up-left'
    | 'down-right'
    | 'down-left';
  name: 'arrow';
  isFill?: boolean;
  isOutline?: boolean;
}

interface ShortArrowIconProps extends BaseIconProps {
  direction: 'up' | 'right' | 'down' | 'left';
  name: 'short-arrow';
}

interface ReactIconProps extends BaseIconProps {
  name: 'react';
}

type IconProps = ArrowIconProps | ShortArrowIconProps | ReactIconProps;

const Icon: React.FC<IconProps> = (props) => {
  const {
    color = {},
    name,
    onPress,
    size = scaleByAspectRatio(24),
    strokeWidth = 2,
  } = props;
  const theme = useTheme() as Theme;
  const { grads = [theme.textColor], isGradient = false, mono = theme.textColor } = color;

  const getIconComponent = (): React.ReactNode => {
    const iconProps = { color: { grads, isGradient, mono }, strokeWidth, size };

    switch (name) {
      case 'arrow': {
        const { direction, isFill = false, isOutline = false } = props as ArrowIconProps;
        return (
          <ArrowIcon
            {...iconProps}
            direction={direction}
            isFill={isFill}
            isOutline={isOutline}
          />
        );
      }
      case 'short-arrow': {
        const { direction } = props as ShortArrowIconProps;
        return <ShortArrowIcon {...iconProps} direction={direction} />;
      }
      case 'react': {
        return <ReactIcon {...iconProps} />;
      }
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity
      style={{ width: size, height: size }}
      onPress={onPress}
      disabled={typeof onPress !== 'function'}
    >
      {getIconComponent()}
    </TouchableOpacity>
  );
};

export default Icon;
